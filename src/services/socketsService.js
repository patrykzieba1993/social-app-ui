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
  sendPost(post, id) {
    this.socket.emit('post', {
      content: post,
      author: parseInt(id, 10),
    });
  }
}

export default SocketsService;