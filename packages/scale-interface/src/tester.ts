import WebSocket from 'ws'

console.log(`
////////////////////////////
// API FUNCTIONALITY TEST //
////////////////////////////
`)


const PORT = 8080

const wsGetRoot = new WebSocket(`ws://localhost:${PORT}/get-root-dir`)
const wsListExperiments = new WebSocket(`ws://localhost:${PORT}/list-experiments`)
const wsGetExperiment = new WebSocket(`ws://localhost:${PORT}/get-experiment`)
const wsListPaths = new WebSocket(`ws://localhost:${PORT}/list-experiment-paths`)
const wsWriteExperiment = new WebSocket(`ws://localhost:${PORT}/write-experiment`)
const wsScaleData = new WebSocket(`ws://localhost:${PORT}/scale-data`)

let ROOT_DIR: string | null = null

wsGetRoot.addEventListener('message', (event) => {
  console.log('==/get-root-dir')
  console.log(JSON.parse(event.data as string))
  ROOT_DIR = event.data as string
  console.log('===')
})

wsListExperiments.addEventListener('message', (event) => {
  console.log('==/list-experiments')
  console.log(JSON.parse(event.data as string))
  ROOT_DIR = event.data as string
  console.log('===')
})

wsGetExperiment.addEventListener('message', (event) => {
  console.log('==/get-experiment')
  console.log(JSON.parse(event.data as string))
  console.log('===')
})

wsListPaths.addEventListener('message', (event) => {
  console.log('==/list-paths')
  console.log(JSON.parse(event.data as string))
  console.log('===')
})

wsWriteExperiment.addEventListener('message', (event) => {
  console.log('==/write-experiment')
  console.log(JSON.parse(event.data as string))
  console.log('===')
})

wsScaleData.addEventListener('message', (event) => {
  console.log('==/scale-data')
  console.log(JSON.parse(event.data as string))
  console.log('===')
})

wsGetRoot.addEventListener('open', () => {
  wsGetRoot.send('')
})

wsGetRoot.addEventListener('open', () => {
  wsGetRoot.send('')
})

wsListExperiments.addEventListener('open', () => {
  wsListExperiments.send(JSON.stringify({
    path: '/media/root/test_usb/SCALE_INTERFACE_DAT/active',
    filter: {
      primaryExperimenter: 'NotQuinn',
    },
  }))
})

wsGetExperiment.addEventListener('open', () => {
  wsGetExperiment.send('/media/root/test_usb/SCALE_INTERFACE_DAT/active/addiction study 14_1590000000000_notquinn')
})

wsListPaths.addEventListener('open', () => {
  wsListPaths.send(JSON.stringify({
    path: '/media/root/test_usb/SCALE_INTERFACE_DAT/active/',
  }))
})

// //////////////////////////////////////////////////////////////////////////////////////////////
// valid name:                                                                                //
// <experimentName>_ < dateInitialized > _ < primaryExperimenter >                            //
//                                                                                            //
// You could also test experiment format validation with this method. Just give it different  //
// types of invalid experiment data.                                                          //
// //////////////////////////////////////////////////////////////////////////////////////////////

wsWriteExperiment.addEventListener('open', () => {
  wsWriteExperiment.send(JSON.stringify({
    path: '/media/root/test_usb/SCALE_INTERFACE_DAT/active/test study 99_1571826295869_quinn',
    data: JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}'),
  }))
})
