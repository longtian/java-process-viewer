import 'whatwg-fetch';

const fetchOptions = {
  credentials: 'same-origin'
};

export const hosts = () => fetch('/api/hosts', fetchOptions)
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