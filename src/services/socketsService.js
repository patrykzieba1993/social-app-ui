import io from 'socket.io-client';

class SocketsService {
  constructor(){
    this.socket = null;
  }
  init() {
    this.socket = io.connect('localhost:3001');
  }
  onPost(callback) {
    this.socket.on('post', msg => {
      callback(msg);
    })
  }
  sendPost(text, id) {
    this.socket.emit('post', {
      text,
      id,
    });
  }
}

export default SocketsService;