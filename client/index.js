const http = require('http');
const os = require('os');
const cp = require('child_process');
const assert = require('assert');

const ES_HOST = process.env.ES;
let count = 0;

assert(ES_HOST, 'es host must be provided');


/**
 * 获得 JVM 列表
 * @returns {Array}
 */
const getJavaProcessList = () => {
  return cp
    .execSync('jps -lvm')
    .toString('utf-8')
    .trim()
    .split('\n')
    .map(item => {
      const [pid, main, ...options] = item.split(' ');
      return {
        pid,
        main,
        options: options.join(' ')
      }
    });
};

/**
 * 获得监听端口号
 *
 * @returns {Array}
 */
const getListeningPortList = () => {
  return cp
    .execSync('netstat -nltp')
    .toString('utf-8')
    .trim()
    .split('\n')
    .slice(2)
    .map(item => {
      const d = item.split(/\s+/);
      const [host, port] = d[3].split(':')
      const [pid, program] = d[6].split('/');
      return {
        host,
        port,
        pid,
        program
      }
    });
};


/**
 * 获取第一个内网网卡的信息
 * @returns {Object}
 */
const getLANInterface = () => {
  const res = {};
  const nics = os.networkInterfaces();
  Object.keys(nics).forEach(nicName => {
    const nic = nics[nicName];
    nic.forEach(item => {
      // 找到第一个 10 开头的 Address
      if (item.address.startsWith('10') && !item.internal) {
        res.address = item.address;
        res.nic = nicName;
        res.mac = item.mac;
        res.netmask = item.netmask;
      }
    })
  });
  return res;
};

/**
 * 记录一个 Message
 *
 * @param {String} message
 */
const log = (message) => {
  const req = http.request({
    host: ES_HOST,
    path: '/ops/beat',
    method: 'POST'
  }, () => {
    console.log('write ok');
  });
  req.on('error', (err) => {
    console.error(err);
  });

  const jps = getJavaProcessList();
  const ports = getListeningPortList();

  jps.forEach(item => {
    item.ports = [];
    ports.forEach(pItem => {
      if (pItem.pid === item.pid) {
        item.ports.push(pItem);
      }
    })
  });

  const payload = Object.assign({}, {
    argv: process.argv,
    pid: process.pid,
    message,
    hostname: os.hostname(),
    timestamp: (new Date()).toISOString(),
    username: os.userInfo().username,
  }, getLANInterface(), {
    jps,
    ports
  });
  req.write(JSON.stringify(payload));
  req.end();
};

/**
 * 心跳
 */
const tick = () => {
  log(`tick-[${count++}]`);
  setTimeout(tick, 60000);
};

// 开始
log('start');
tick();

// 进程信号处理
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    log(`exit on ${signal}`);
    setTimeout(() => {
      process.exit(0);
    }, 200)
  });
});




