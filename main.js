const peerconfig = {host:'peerjs-server.herokuapp.com', secure:true, port:443,debug: 3};

/*
{host:'peerjs-server.herokuapp.com', secure:true, port:443, key: '/peerjs',debug: 3};
{  host: location.hostname,  port: location.port || (location.protocol === 'https:' ? 443 : 80),  secure:true,  key: 'peerjs',  path: '/peerjs',  debug: 3};
*/
const joinChat = async () => {
  const peer = new Peer('sender', peerconfig)

  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true
  })
  document.querySelector('video#local').srcObject = localStream
  const call = peer.call('receiver', localStream)

  call.on('stream', remoteStream => {
    document.querySelector('video#remote').srcObject = remoteStream
  })
}

function createRoom() {
  const peer = new Peer('receiver', peerconfig)

  let localStream = null
  const startChat = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true
    })

    document.querySelector('video#local').srcObject = localStream
  }

  startChat()

  peer.on('call', call => {
    call.answer(localStream)

    call.on('stream', remoteStream => {
      document.querySelector('video#remote').srcObject = remoteStream
    })
  })
}
// joinChat()
// createRoom()