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
    });
  }
  
  onComment(callback) {
    this.socket.on('comment', msg => {
      callback(msg);
    });
  }
  
  sendPost(post, id) {
    this.socket.emit('post', {
      content: post,
      author: parseInt(id, 10),
    });
  }
  
  sendComment(comment, userId, postId) {
    this.socket.emit('comment', {
      content: comment,
      userId,
      postId,
    });
  }
}

export default SocketsService;