import 'whatwg-fetch';

export const hosts = () => fetch('/api/hosts')
  .then(res => res.json())
  .then(hosts => hosts.map(host => {
    const {
      timestampe,
    } = host;
    const status = Date.now() - new Date(timestampe) <= 60000 ? 'alive' : 'fail';
    return Object.assign({}, host, {
      status
    });
  }));