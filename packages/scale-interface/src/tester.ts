import ws from 'ws'

const PORT = 8080

const wsGetRoot = new ws(`ws://localhost:${PORT}/get-root-dir`)
const wsListExperiments = new ws(`ws://localhost:${PORT}/list-experiments`)
const wsGetExperiment = new ws(`ws://localhost:${PORT}/get-experiment`)
const wsListPaths = new ws(`ws://localhost:${PORT}/list-experiment-paths`)
const wsWriteExperiment = new ws(`ws://localhost:${PORT}/write-experiment`)
const wsScaleData = new ws(`ws://localhost:${PORT}/scale-data`)

wsGetRoot.onmessage = (event) => {
  console.log('==/get-root-dir')
  console.log(event.data)
  console.log('===')
}

wsListExperiments.onmessage = (event) => {
  console.log('==/list-experiments')
  console.log(JSON.parse(event.data as string))
  console.log('===')
}

wsGetExperiment.onmessage = (event) => {
  console.log(event.data)
}

wsListPaths.onmessage = (event) => {
  console.log(event.data)
}

wsWriteExperiment.onmessage = (event) => {
  console.log(event.data)
}

wsScaleData.onmessage = (event) => {
  console.log(event.data)
}

wsListExperiments.onopen = () => {
  wsListExperiments.send(JSON.stringify({
    path: '/media/root/test_usb/SCALE_INTERFACE_DAT/active',
    filter: {
      primaryExperimenter: "NotQuinn",
    },
  }))
}

wsGetRoot.onopen = () => {
  wsGetRoot.send("")
}
