import store from '../store';
import { EXEC_RESULT } from '../../constants';

class Socket {
  constructor(host) {
    const ws = new WebSocket(host);
    this.ws = ws;
    this.waiting = [];

    ws.onopen = () => {
      this.ready = true;
      this.waiting.forEach(item => {
        this.send(item);
      })
    }
    ws.onmessage = (msg) => {
      try {
        const {
          type,
          payload
        } = JSON.parse(msg.data);
        switch (type) {
          case EXEC_RESULT:
            store.dispatch({
              type: EXEC_RESULT,
              payload
            });
            break;
        }
        console.info(`message received %o, `, payload)
      } catch (e) {
        console.error(`unknown message %o`, msg);
      }
    }
  }

  send(payload) {
    if (!this.ready) {
      this.waiting.push(payload);
    } else {
      this.ws.send(JSON.stringify(payload));
    }
  }
}

export default new Socket(`ws://${window.location.host}/ws`)
