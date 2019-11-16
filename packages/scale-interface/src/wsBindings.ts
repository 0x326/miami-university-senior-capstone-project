import ws from 'ws'

const PORT = 8081
let socket: ws | null = null

function openWebsocket(path: string, timeout: number): Promise<ws> {
  return new Promise((resolve, reject) => {
    const socket = new ws(path)
    socket.addEventListener('open', () => resolve(socket))
    setTimeout(() => reject(new Error(`Timeout ${socket}`)), timeout)
  })
}

function getRoot(f: (event: any) => void): Promise<string> {
  return openWebsocket(`ws://localhost:${PORT}/get-root-dir`, 1000)
    .then((socket) => new Promise((resolve, reject) => {
      socket.onmessage = f
      socket.send('')
    }))
  // Wait for repln
}


// const wsGetRoot = new ws(`ws://localhost:${PORT}/get-root-dir`)
// wsGetRoot.addEventListener('open', () => {
//   wsGetRoot.addEventListener('message', f)
// })
// return wsGetRoot
// }


getRoot((event) => console.log(event.data))
