import WebSocket from 'ws'

console.log(`
////////////////////////////
// API FUNCTIONALITY TEST //
////////////////////////////
`)


const port = 8080

const webSocketGetRoot = new WebSocket(`ws://localhost:${port}/get-root-dir`)
const webSocketListExperiments = new WebSocket(`ws://localhost:${port}/list-experiments`)
const webSocketGetExperiment = new WebSocket(`ws://localhost:${port}/get-experiment`)
const webSocketListPaths = new WebSocket(`ws://localhost:${port}/list-experiment-paths`)
const webSocketWriteExperiment = new WebSocket(`ws://localhost:${port}/write-experiment`)
const webSocketScaleData = new WebSocket(`ws://localhost:${port}/scale-data`)

webSocketGetRoot.addEventListener('message', ({ data }) => {
  console.log('/get-root-dir')
  console.log(JSON.parse(String(data)))
  console.log('')
})

webSocketListExperiments.addEventListener('message', ({ data }) => {
  console.log('/list-experiments')
  console.log(JSON.parse(String(data)))
  console.log('')
})

webSocketGetExperiment.addEventListener('message', ({ data }) => {
  console.log('/get-experiment')
  console.log(JSON.parse(String(data)))
  console.log('')
})

webSocketListPaths.addEventListener('message', ({ data }) => {
  console.log('/list-paths')
  console.log(JSON.parse(String(data)))
  console.log('')
})

webSocketWriteExperiment.addEventListener('message', ({ data }) => {
  console.log('/write-experiment')
  console.log(JSON.parse(String(data)))
  console.log('')
})

webSocketScaleData.addEventListener('message', ({ data }) => {
  console.log('/scale-data')
  console.log(JSON.parse(String(data)))
  console.log('')
})

webSocketGetRoot.addEventListener('open', () => {
  webSocketGetRoot.send('')
})

webSocketGetRoot.addEventListener('open', () => {
  webSocketGetRoot.send('')
})

webSocketListExperiments.addEventListener('open', () => {
  webSocketListExperiments.send(JSON.stringify({
    path: '/media/root/test_usb/SCALE_INTERFACE_DAT/active',
    filter: {
      primaryExperimenter: 'NotQuinn',
    },
  }))
})

webSocketGetExperiment.addEventListener('open', () => {
  webSocketGetExperiment.send('/media/root/test_usb/SCALE_INTERFACE_DAT/active/addiction study 14_1590000000000_notquinn')
})

webSocketListPaths.addEventListener('open', () => {
  webSocketListPaths.send(JSON.stringify({
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

webSocketWriteExperiment.addEventListener('open', () => {
  webSocketWriteExperiment.send(JSON.stringify({
    path: '/media/root/test_usb/SCALE_INTERFACE_DAT/active/test study 99_1571826295869_quinn',
    data: JSON.parse('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}'),
  }))
})
