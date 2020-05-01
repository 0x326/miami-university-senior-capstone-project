// TODO (wimmeldj) [2020-05-01] don't use unix timestamps. Use human readable and in locale

import assert from 'assert'

import * as XLSX from 'xlsx'

import dayjs from 'dayjs'

import {
  List,
  Map,
} from 'immutable'

import {
  ExperimentData,
  CageDisplayOrder,
  CageId,
  RackId,
  RackDisplayOrder,
} from './routes/experiment-dashboard/ExperimentDashboard'

import {
  CageData,
} from './routes/experiment-dashboard/CageSessions'

import { ExperimentId } from './App'

import {
  experimentId,
} from './types'

import { ExperimentMetaData } from './routes/experiments/new/NewExperimentView'

// for simpler parsing
interface Metadata {
  [key: string]: string | number | string[] | null;
}

export interface Comments {
  [key: string]: XLSX.Comment;
}

export interface DummyMap extends Map<List<number>, boolean> { }

// RackId, CageId, and isDummy do not vary across sessions
const staticColCount = 3

// rows and columns are 0 indexed
enum rows {
  sessions = 0,
  labels = 1,
  dataBegin = 2,
}
enum cols {
  rackid = 0,
  cageid = 1,
  isDummy = 2,
  sessColStart = 3,
}

// keys that should have a value of type number
const numbers = [
  'date initialized',
  'last updated',
  'num treatments',
  'total sessions',
]

// keys that have comma separated values
const lists = [
  'treatments',
]

function parseMeta(sheet: XLSX.WorkSheet): ExperimentMetaData {
  const kv: Metadata = {
    'date initialized': null, // startDate: Dayjs
    'experiment title': null, // experimentName
    'last updated': null, // lastUpdated Dayjs
    'num treatments': null, // bottlesPerCage
    'primary experimenter': null, // experimentLeadname
    'total sessions': null, // sessionCount
    treatments: null,
  }

  const keys: XLSX.CellObject[] = []
  const vals: XLSX.CellObject[] = []

  for (const cellid of Object.keys(sheet)) {
    let match
    // eslint-disable-next-line no-cond-assign
    if (match = /^A(\d+)$/.exec(cellid)) { // A column has keys
      const col = parseInt(match[1], 10)
      keys[col] = sheet[cellid]
      // eslint-disable-next-line no-cond-assign
    } else if (match = /^B(\d+)$/.exec(cellid)) { // B column has vals
      const col = parseInt(match[1], 10)
      vals[col] = sheet[cellid]
    }
  }

  for (let i = 1; i < keys.length; ++i) {
    if (!keys[i]) { continue }

    const keyobj = keys[i]
    assert(keyobj.t === 's') // keys must be strings
    const key = keyobj.v as string

    // when key is valid, update its corresponding value
    if (key in kv) {
      const valobj = vals[i]

      if (numbers.includes(key)) {
        assert(valobj.t === 'n')
        kv[key] = valobj.v as number
      } else if (lists.includes(key)) {
        assert(valobj.t === 's')
        kv[key] = (valobj.v as string).split(',').map((x) => x.trim())
      } else {
        // must be string
        assert(valobj.t === 's')
        kv[key] = valobj.v as string
      }
    }
  }

  // ensure all keys were included
  Object.keys(kv).map((x) => assert(kv[x] !== null))

  // translate to ExperimentMetaData type
  return {
    experimentName: kv['experiment title'] as string,
    experimentLeadName: kv['primary experimenter'] as string,
    startDate: dayjs.unix(kv['date initialized'] as number),
    lastUpdated: dayjs.unix(kv['last updated'] as number),
    sessionCount: kv['total sessions'] as number,
    bottlesPerCage: kv['num treatments'] as number,
    treatments: kv.treatments as string[],
  }
}

function treatmentPair(datPair: [XLSX.CellObject, XLSX.CellObject]): [string, number] {
  assert(datPair[0].t === 'n') // weights should be numbers
  assert(datPair[1].t === 's') // labels should be strings

  const regRes = /\((.*?)\)/.exec(datPair[1].v as string)
  assert(regRes && regRes[1].length > 0) // no empty treatments
  const treatment = (regRes as RegExpExecArray)[1]
  const weight = datPair[0].v as number
  return [treatment, weight]
}

// avert your eyes
function parseData(ds: XLSX.WorkSheet, md: ExperimentMetaData): [Map<ExperimentId, ExperimentData>, DummyMap] {
  const colsPerSess = md.bottlesPerCage * 2 // pre and post weights for each treatment

  // const eid = `${md.experimentName}_${
  //   md.experimentLeadName}_${
  //   String(md.startDate)}`
  const eid = experimentId

  const dummyMap = Map<List<number>, boolean>().asMutable()

  const data = Map<ExperimentId, ExperimentData>().withMutations((experiment) => experiment
    .set(eid, Map<RackId, Map<CageId, CageData>>().withMutations((racks) => {
      // parse row by row
      for (let i = rows.dataBegin; ds[XLSX.utils.encode_cell({ c: 0, r: i })]; ++i) {
        // parse row constants
        const rackid = ds[XLSX.utils.encode_cell({ c: cols.rackid, r: i })].v as number
        const cageid = ds[XLSX.utils.encode_cell({ c: cols.cageid, r: i })].v as number
        const isDummy = ds[XLSX.utils.encode_cell({ c: cols.isDummy, r: i })]

        const sessions = List().asMutable()
        for (let j = cols.sessColStart, sessNumber = 1;
          ds[XLSX.utils.encode_cell({ r: i, c: j })];
          j += colsPerSess, ++sessNumber) {
          const dataPairs = Array.from(Array(colsPerSess).keys()) // => range(0, 2 * numTreatments)
            .map((x) => [
              ds[XLSX.utils.encode_cell({ r: i, c: j + x })], // weight cell
              ds[XLSX.utils.encode_cell({ r: rows.labels, c: j + x })], // label cell
            ] as [XLSX.CellObject, XLSX.CellObject])

          // pre weights are in first half, post in other half
          const preWeights = {
            rowLabel: 'pre',
            rowData: Map().withMutations((rowDat) => {
              for (const cellPair of dataPairs.slice(0, Math.floor(dataPairs.length / 2))) {
                const datPair = treatmentPair(cellPair)
                rowDat.set(datPair[0], datPair[1])
              }
            }),
          }
          const postWeights = {
            rowLabel: 'post',
            rowData: Map().withMutations((rowDat) => {
              for (const cellPair of dataPairs.slice(Math.floor(dataPairs.length / 2))) {
                const datPair = treatmentPair(cellPair)
                rowDat.set(datPair[0], datPair[1])
              }
            }),
          }
          const session = {
            sessionNumber: sessNumber,
            cageSessionData: List([preWeights, postWeights]),
          }
          sessions.push(session)
        }

        const ret: Map<CageId, CageData> = Map<CageId, CageData>()
          .set(cageid, sessions.asImmutable())

        assert(isDummy.t === 'n' || isDummy.t === 'b')

        if (isDummy.t === 'n') { dummyMap.set(List.of(rackid, cageid), isDummy.v === 1) } else { dummyMap.set(List.of(rackid, cageid), isDummy.v) }

        if (racks.get(rackid) === undefined) {
          racks.set(rackid, ret)
        } else {
          racks.set(rackid, (racks.get(rackid) as Map<CageId, CageData>).merge(ret))
        }
      }
    })))

  return [data, dummyMap.asImmutable()]
}

function binToDisplay(dat: Uint8Array):
  [ExperimentMetaData,
    Map<string, ExperimentData>,
    RackDisplayOrder,
    CageDisplayOrder,
    DummyMap,
    Comments,
  ] {
  const wb = XLSX.read(dat, { type: 'array' })
  const metadat = parseMeta(wb.Sheets.Metadata)
  const [experimentData, dummies] = parseData(wb.Sheets.Data, metadat)
  const comments: Comments = {}
  /* eslint-disable no-shadow */
  for (const k of Object.keys(wb.Sheets.Data).filter((k) => k !== '!ref' && wb.Sheets.Data[k].c)) { comments[k] = wb.Sheets.Data[k].c }

  // bleh
  const onlyKey = experimentData.keySeq().toArray()[0]
  const rackOrder = List(experimentData.getIn([onlyKey]).keySeq().toArray().sort() as [RackId])

  const cageOrder = Map().asMutable() as CageDisplayOrder
  rackOrder.map((rackid) => cageOrder.set(rackid, experimentData.getIn([onlyKey, rackid]).keySeq().toArray().sort()))

  return [metadat, experimentData, rackOrder, cageOrder.asImmutable(), dummies, comments]
}

// Metadata sheet should be sorted
function metadataToWS(md: Metadata): XLSX.WorkSheet {
  const sortedKeys = Object.keys(md).sort()
  const aoa = sortedKeys.map((k) => {
    if (lists.includes(k)) { return [k, (md[k] as string[]).join(',')] }
    return [k, md[k]]
  })
  return XLSX.utils.aoa_to_sheet(aoa)
}

function experimentToWS(
  md: Metadata,
  ex: ExperimentData,
  rdo: RackDisplayOrder,
  cdo: CageDisplayOrder,
  dm: DummyMap,
): XLSX.WorkSheet {
  const aoa = []
  const treatmentCnt = md['num treatments'] as number
  const colsPerSession = treatmentCnt * 2
  const sessCnt = md['total sessions'] as number
  const treatments = md.treatments as string[]

  // first row. session headers
  aoa[rows.sessions] = Array(staticColCount)
  for (let i = 1, x = staticColCount; i <= sessCnt; x += colsPerSession, ++i) { aoa[rows.sessions][x] = `Session ${i}` }

  // second row. all other labels
  aoa[rows.labels] = []
  aoa[rows.labels][0] = 'RackID'
  aoa[rows.labels][1] = 'CageID'
  aoa[rows.labels][2] = 'is Dummy'
  /* eslint-disable no-mixed-operators */
  for (let j = 3; j < colsPerSession * sessCnt + 3;) {
    const preCol = j
    for (; j < preCol + treatmentCnt; ++j) { aoa[rows.labels][j] = `pre (${treatments[j % preCol]})` }
    const postCol = j
    for (; j < postCol + treatmentCnt; ++j) { aoa[rows.labels][j] = `post (${treatments[j % postCol]})` }
  }

  // data rows
  let i = rows.dataBegin
  for (const [rid, cages] of rdo.map((x) => [x, cdo.get(x)]).toArray() as [number, number[]][]) {
    for (const cid of cages) {
      // const cage = ex.getIn([rid, cid]) as Cage

      aoa[i] = []
      aoa[i][cols.rackid] = rid
      aoa[i][cols.cageid] = cid
      aoa[i][cols.isDummy] = dm.get(List.of(rid, cid))

      const sessionData = (ex.getIn([rid, cid]) as CageData)
        .sort((a, b) => (a.sessionNumber >= b.sessionNumber ? 1 : -1))
        .map((session) => session.cageSessionData)

      let j = 3
      for (const session of sessionData.toArray()) {
        const pre = session.get(0)
        const post = session.get(1)
        if (pre) { for (const t of treatments) { aoa[i][j++] = pre.rowData.get(t) } }
        if (pre && post) { for (const t of treatments) { aoa[i][j++] = post.rowData.get(t) } }
      }
      ++i
    }
  }
  return XLSX.utils.aoa_to_sheet(aoa)
}

function displayToWB(
  metadata: ExperimentMetaData,
  ex: ExperimentData,
  rdo: RackDisplayOrder,
  cdo: CageDisplayOrder,
  dm: DummyMap,
  co: Comments,
): XLSX.WorkBook {
  const ret = XLSX.utils.book_new()
  // for simpler parsing
  const md: Metadata = {
    'date initialized': metadata.startDate.unix(),
    'experiment title': metadata.experimentName,
    'last updated': metadata.lastUpdated.unix(),
    'num treatments': metadata.bottlesPerCage,
    'primary experimenter': metadata.experimentLeadName,
    'total sessions': metadata.sessionCount,
    treatments: metadata.treatments,
  }
  XLSX.utils.book_append_sheet(ret, metadataToWS(md), 'Metadata')
  const data = experimentToWS(md, ex, rdo, cdo, dm)
  // apply comments
  for (const k of Object.keys(data).filter((k) => k !== '!ref' && co[k])) { data[k].c = co[k] }
  XLSX.utils.book_append_sheet(ret, data, 'Data')
  return ret
}

export {
  binToDisplay,
  displayToWB,
}

// // test functionality

// import * as fs from 'fs'
// let dat = new Uint8Array(fs.readFileSync('./test.xlsx'))
// const [metadat, experiment, rdo, cdo, dm, co] = binToDisplay(dat)

// console.log("====\n metadat \n====")
// console.log(metadat)

// // print entire experiment
// console.log('====\nParsed Experiment:\n====')
// console.log(experiment.toJS())
// console.log('====\nMetadat:\n====')
// console.log(metadat)
// console.log('====\ncdo:\n====')
// console.log(cdo.toJS())
// console.log('====\ndummy map:\n====')
// console.log(dm.toJS())
// console.log('====\ncomments: \n====')
// console.log(co)
// console.log('====\ndisplayToWb:\n====')
// let wb = displayToWB(metadat,
//   (experiment as any).get('Addiction Study 12_Quinn_Mon, 19 Jan 1970 04:32:24 GMT'),
//   rdo, cdo, dm, co)
// XLSX.writeFile(wb, 'from-test.xlsx')

// // do it again, but use output from-test as input
// dat = new Uint8Array(fs.readFileSync('./from-test.xlsx'))
// const again = binToDisplay(dat)
// wb = displayToWB(again[0],
//   (again[1] as any).get('Addiction Study 12_Quinn_Mon, 19 Jan 1970 04:32:24 GMT'),
//   again[2], again[3], again[4], again[5])
// XLSX.writeFile(wb, 'from-from-test.xlsx')

/*
THIS!
{
    'Addiction study 12_Quinn_10/20/2019, 12:00:00 AM':
    {
        // rackids
        1: {
            // cageids
            1: {
                isDummy: true,
                cageData: [{
                    sessionNumber: 1,
                    cageSessionData: [
                        {
                            rowLabel: "Pre",
                            rowData: {
                                "etoh": 10,
                                "h2o": 12
                            }
                        },
                        {
                            rowLabel: "Post",
                            rowData: {
                                "etoh", 10,
                                "h2o", 12
                            }
                        }
                    ]
                }]
            }

        }
    }
}
*/
