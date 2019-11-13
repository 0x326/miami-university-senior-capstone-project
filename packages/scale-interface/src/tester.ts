import ws from 'ws'

console.log(`
////////////////////////////
// API FUNCTIONALITY TEST //
////////////////////////////
`)


const PORT = 8081

const wsGetRoot = new ws(`ws://localhost:${PORT}/get-root-dir`)
const wsListExperiments = new ws(`ws://localhost:${PORT}/list-experiments`)
const wsGetExperiment = new ws(`ws://localhost:${PORT}/get-experiment`)
const wsListPaths = new ws(`ws://localhost:${PORT}/list-experiment-paths`)
const wsWriteExperiment = new ws(`ws://localhost:${PORT}/write-experiment`)
const wsScaleData = new ws(`ws://localhost:${PORT}/scale-data`)

let ROOT_DIR: string | null = null

wsGetRoot.onmessage = (event) => {
  console.log('==/get-root-dir')
  console.log(JSON.parse(event.data as string))
  ROOT_DIR = event.data as string
  console.log('===')
}

wsListExperiments.onmessage = (event) => {
  console.log('==/list-experiments')
  console.log(JSON.parse(event.data as string))
  ROOT_DIR = event.data as string
  console.log('===')
}

wsGetExperiment.onmessage = (event) => {
  console.log('==/get-experiment')
  console.log(JSON.parse(event.data as string))
  console.log('===')
}

wsListPaths.onmessage = (event) => {
  console.log('==/list-paths')
  console.log(JSON.parse(event.data as string))
  console.log('===')
}

wsWriteExperiment.onmessage = (event) => {
  console.log('==/write-experiment')
  console.log(JSON.parse(event.data as string))
  console.log('===')
}

wsScaleData.onmessage = (event) => {
  console.log('==/scale-data')
  console.log(JSON.parse(event.data as string))
  console.log('===')
}

wsGetRoot.onopen = () => {
  wsGetRoot.send("")
}

wsGetRoot.onopen = () => {
  wsGetRoot.send("")
}

wsListExperiments.onopen = () => {
  wsListExperiments.send(JSON.stringify({
    path: '/media/root/test_usb/SCALE_INTERFACE_DAT/active',
    filter: {
      primaryExperimenter: "NotQuinn",
    },
  }))
}

wsGetExperiment.onopen = () => {
  wsGetExperiment.send("/media/root/test_usb/SCALE_INTERFACE_DAT/active/addiction study 14_1590000000000_notquinn")
}

wsListPaths.onopen = () => {
  wsListPaths.send(JSON.stringify({
    path: "/media/root/test_usb/SCALE_INTERFACE_DAT/active/",
  }))
}

///////////////////////////////////////////////////////////////////////////////////////////////
// EXPECT THIS TO FAIL.                                                                      //
// It has an invalid file name.If you want it to succeed, change it to a valid name:         //
// <experimentName>_ < dateInitialized > _ < primaryExperimenter >                           //
//                                                                                           //
// You could also test experiment format validation with this method. Just give it different //
// types of invalid experiment data.                                                         //
///////////////////////////////////////////////////////////////////////////////////////////////
wsWriteExperiment.onopen = () => {
  wsWriteExperiment.send(JSON.stringify({
    path: "/media/root/test_usb/SCALE_INTERFACE_DAT/active/testWriteExperiment.json",
    data: JSON.stringify('{"name":"Addiction Study 12","primaryExperimenter":"Quinn","dateInitialized":1572730420004,"lastUpdated":1572730420004,"isComplete":false,"totalSessions":30,"totalColsBegin":8,"totalColsMid":6,"totalColsEnd":4,"subSessionLabelsBegin":["Cage Weight","Cage",["H20 Weights",["Before","After 30m","After 24h"]],["20% ETOH Weights",["Before","After 30m","After 24h"]]],"subSessionLabelsMid":["Cage",["H20 Weights",["Before","After 24h"]],["20% ETOH Weights",["Before","After 24h"]]],"subSessionLabelsEnd":["Cage",["H20 Weights",["After 24h"]],["20% ETOH Weights",["After 24h"]]],"cages":[{"cageWeight":259,"cageLabel":"Cage 1 (Dummy)","sessions":[{"H20 Weights Before":1,"H20 Weights After 30m":2,"H20 Weights After 24h":3,"20% ETOH Weights Before":1,"20% ETOH Weights After 20m":2,"20% ETOH Weights After 24h":3}]}]}')
  }))
}
