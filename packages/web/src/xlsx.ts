/* eslint-disable security/detect-object-injection */
import assert from 'assert'

import * as XLSX from 'xlsx'

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

// import {
//	 BottleType,
//	 RouteId,
//	 DisplayName,
//	 RouteMap,
// } from './types'

import { ExperimentId } from './App'

// import { ExperimentMetaData } from './routes/experiments/new/NewExperimentView'
// import { CageSessionData } from './routes/experiment-dashboard/CageSessionTable'

export interface ExperimentKVPairs {
    a: string;
}


// 0 indexed cell sheet rows
const SessRow = 0
const labRow = 1
const datRowBegin = 2



// TODO raise helpful errors instead of assert
function parseMeta(sheet: XLSX.WorkSheet): { [key: string]: string | number | null } {
    const kv: {
        [index: string]: string | number | null;
    } = {
        'experiment title': null,
        'primary experimenter': null,
        'last updated': null,
        'total sessions': null,
        'cols/session': null,
        'date initialized': null,
        'num treatments': null,
    }

    // keys that should have a value of type number
    const numbers = [
        'last updated',
        'total sessions',
        'cols/session',
        'date initialized',
        'num treatments']

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
            // eslint-disable-next-line security/detect-object-injection
            vals[col] = sheet[cellid]
        }
    }

    for (let i = 1; i < keys.length; ++i) {
        if (!keys[i]) continue

        const keyobj = keys[i]
        assert(keyobj.t === 's') // keys must be strings
        const key = keyobj.v as string

        // when key is valid, update its corresponding value
        if (key in kv) {
            const valobj = vals[i]

            if (numbers.includes(key)) {
                assert(valobj.t === 'n')
                kv[key] = valobj.v as number
            } else {
                // only other acceptable type is string
                assert(valobj.t === 's')
                kv[key] = valobj.v as string
            }
        }
    }

    // ensure all keys were included
    Object.keys(kv).map(x => assert(kv[x] !== null))

    return kv
}


/*
Expects this column layout where ratid, experimental condition, rackid, and cageid are always present

session labels like:
s1 H2O (before)
s1 H2O (after)
s1 EtOH (before)
s1 EtOH (after)
s2 ...

1 ratid	 | experimental condition  | rackid | cageid |	s1 measure 1 |... s1 measure n | 2 measure 1 ...
2		 |						   |		|		 |				 |				   |
3		 |						   |		|		 |				 |				   |
4		 |						   |		|		 |				 |				   |

Have we confirmed id fields will be numbers?

These functions would be simpler if our data structure(s) for representing
experiment data was simpler. Is there a reason we're using maps and then
providing order to them with lists as opposed to just using lists?

*/

// interface Experiment {
//	 eid: number;
//	 racks: {
//	   cageid: number;
//	   cageData: [{
//		 sessionNum: number;
//		 sessionData: [{
//		   rowLabel: string;	 // before/after
//		   rowData: {
//			 bottleType: string;
//			 weight: number;
//		   }
//		 }]
//	   }]
//	 }
// }

// avert your eyes
function parseData(ds: XLSX.WorkSheet,
    pairs: { [key: string]: string | number | null }): Map<ExperimentId, ExperimentData> {
    enum labs {
        ratid = 0,
        eCondition = 1,
        rackid = 2,
        cageid = 3
    }

    function treatmentPair(datPair: [XLSX.CellObject, XLSX.CellObject]): Map<string, number> {
        assert(datPair[0].t === 'n') // weights should be numbers
        assert(datPair[1].t === 's') // labels should be strings

        let regRes = /\((.*?)\)/.exec(datPair[1].v as string)
        assert(regRes && regRes[1].length > 0) // no empty treatments
        let treatment = (regRes as RegExpExecArray)[1]
        let weight = datPair[0].v as number
        let ret: Map<string, number> = Map()
        ret = ret.set(treatment, weight)
        return ret
    }

    const enc_cell = XLSX.utils.encode_cell // alias for readability
    const sessColStart = 5 // TODO serialize in Metadata
    const colsPerSess = pairs["cols/session"] as number
    const numTreatments = pairs["num treatments"] as number

    const eid = String(pairs['experiment title']) + "_"
        + String(pairs['primary experimenter']) + "_"
        + String(new Date(pairs['date initialized'] as number).toLocaleString())

    return Map<ExperimentId, ExperimentData>().withMutations((experiment) => experiment
        .set(eid, Map<RackId, Map<CageId, CageData>>().withMutations((racks) => {
            // parse row by row
            for (let i = datRowBegin; ds[enc_cell({ c: 0, r: i })]; ++i) {
                // parse row constants
                let rackid = ds[enc_cell({ c: labs.rackid, r: i })].v
                // let ratid = ds[enc_cell({ c: labs.ratid, r: i })].v
                // let eCondtion = ds[enc_cell({ c: labs.eCondition, r: i })].v
                let cageid = ds[enc_cell({ c: labs.cageid, r: i })].v

                // assoc a cage map if one doesn't exist
                if (racks.get(rackid) === undefined) {
                    racks.set(rackid, Map<CageId, CageData>())
                }

                let sessions = List().asMutable()
                for (let j = sessColStart, sessNum = 1; ds[enc_cell({ r: i, c: j })]; j += colsPerSess, ++sessNum) {
                    // each session has numTreatments * 2 datapoints because only pre and post weights
                    let dataPairs = Array.from(Array(2 * numTreatments).keys()) // => range(0, 2 * numTreatments)
                        .map(x => [
                            ds[enc_cell({ r: i, c: j + x })],	  // weight cell
                            ds[enc_cell({ r: labRow, c: j + x })] // label cell
                        ] as [XLSX.CellObject, XLSX.CellObject])

                    // pre weights are in first half, post in other half
                    let preWeights = {
                        rowLabel: "Pre",
                        rowData: dataPairs.slice(0, Math.floor(dataPairs.length / 2))
                            .map((x) => treatmentPair(x))
                    }
                    let postWeights = {
                        rowLabel: "Post",
                        rowData: dataPairs.slice(Math.floor(dataPairs.length / 2))
                            .map((x) => treatmentPair(x))
                    }
                    const session = {
                        sessionNumber: sessNum,
                        cageSessionData: [preWeights, postWeights]
                    }
                    sessions.push(session)
                }
                let ret: Map<CageId, CageData> = Map()
                ret = ret.set(cageid, sessions)
                racks.set(rackid, (racks.get(rackid) as any).merge(ret))
            }
        })))
}

function binToDisplay(dat: Uint8Array | any):
    [ExperimentData, CageDisplayOrder, RackDisplayOrder, ExperimentKVPairs] | void {
    // const wb = XLSX.read(dat, { type: 'array' })
    const wb = XLSX.readFile('./test.xlsx')
    const kvPairs = parseMeta(wb.Sheets.Metadata)
    const experimentData = parseData(wb.Sheets.Data, kvPairs)

    console.log(kvPairs)
    console.log("===")
    let e = experimentData.toJS() as any
    console.log(e)

    // print all sssion data for rack 1, cage 2
    // let x = e['Addiction Study 12_Quinn_10/20/2019, 12:00:00 AM']['1']['2']
    // for (let o of x) {
    //	   console.log(o.sessionNumber)
    //	   for (let d of o.cageSessionData)
    //		   console.log(d)

    console.log("==========")
    // here's one method of getting deeply nested values
    console.log(experimentData.getIn(['Addiction Study 12_Quinn_10/20/2019, 12:00:00 AM', 1, 2, 0]))
    console.log(experimentData.getIn(['Addiction Study 12_Quinn_10/20/2019, 12:00:00 AM', 1, 2, 0, "cageSessionData", 0, "rowData", 0]).toJS())
    console.log("==========")

    // }
}


binToDisplay(null)
