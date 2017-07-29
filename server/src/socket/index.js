import store from '../store';

class Socket {
  constructor(host) {
    const ws = new WebSocket(host);
    this.ws = ws;
    ws.onmessage = (msg) => {
      try {
        const payload = JSON.parse(msg.data);
        store.dispatch({
          type: 'MESSAGE',
          payload
        });
        console.info(`message received %o, `, payload)
      } catch (e) {
        console.error(`unknown message %o`, msg);
      }
    }
  }

  send(payload) {
    this.ws.send(JSON.stringify(payload))
  }
}

export default new Socket(`ws://${window.location.host}`)
