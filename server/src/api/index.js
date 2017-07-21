import 'whatwg-fetch';

export const hosts = () => fetch('/api/hosts')
  .then(res => res.json())
  .then(hosts => hosts.map(host => {
    const {
      timestamp
    } = host;
    const status = Date.now() - new Date(timestamp) <= 60000 ? 'alive' : 'fail';
    return Object.assign({}, host, {
      status
    });
  }));