import 'whatwg-fetch';

export const hosts = () => fetch('/api/hosts').then(res => res.json());