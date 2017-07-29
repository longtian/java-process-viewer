import React from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import Command from './Command';

class Host extends React.Component {
  render() {
    const {
      host
    } = this.props;

    if (!host) {
      return (
        <div>
          loading
        </div>
      );
    }

    return (
      <div>
        <h3>{host.address}</h3>

        <div className="panel panel-default">
          <div className="panel-heading">
            监控进程
          </div>
          <table className="table">
            <tbody>
            <tr>
              <th>
                pid
              </th>
              <td>
                {host.pid}
              </td>
            </tr>
            <tr>
              <th>
                username
              </th>
              <td>
                {host.username}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            JVM 实例 <span className="label label-default"> 只显示 {host.username} 可见的 </span>
          </div>
          <table className="table">
            <thead>
            <tr>
              <th>pid</th>
              <th>main</th>
              <th>uptime</th>
              <th>jcmd</th>
            </tr>
            </thead>
            <tbody>
            {
              host.jps.map(item => {
                return (
                  <tr key={item.pid}>
                    <td>
                      {item.pid}
                    </td>
                    <td>
                      {item.main}
                    </td>
                    <td>
                      <Command uuid={uuid.v4()} host={host.address} command={`jcmd ${item.pid} VM.uptime`}/>
                    </td>
                    <td>
                      <div className="btn-group">
                        <Link
                          className="btn btn-default"
                          to={`/hosts/${host.address}/jvm/${item.pid}/Thread.print`}>
                          线程</Link>
                        <Link
                          className="btn btn-default" to={`/hosts/${host.address}/jvm/${item.pid}/GC.run`}>
                          手动GC</Link>
                        <Link
                          className="btn btn-default"
                          to={`/hosts/${host.address}/jvm/${item.pid}/GC.class_histogram`}>
                          类统计</Link>
                        <Link
                          className="btn btn-default"
                          to={`/hosts/${host.address}/jvm/${item.pid}/VM.system_properties`}>
                          系统属性</Link>
                        <Link
                          className="btn btn-default" to={`/hosts/${host.address}/jvm/${item.pid}/VM.version`}>
                          JVM 版本</Link>
                        <Link
                          className="btn btn-default" to={`/hosts/${host.address}/jvm/${item.pid}/VM.command_line`}>
                          启动命令</Link>
                        <Link
                          className="btn btn-default" to={`/hosts/${host.address}/jvm/${item.pid}/VM.flags`}>
                          Flags</Link>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            端口
          </div>
          <table className="table">
            <tbody>
            {
              host.ports.map(item => {
                return (
                  <tr key={`${host.address}-${item.port}`}>
                    <td>
                      {item.host}
                    </td>
                    <td>
                      {item.port}
                    </td>
                    <td>
                      {item.pid}
                    </td>
                    <td>
                      {item.program}
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const {
    address
  } = props.match.params;
  const host = _.find(state.hosts, {
    address
  });
  return {
    host
  }
};

export default connect(mapStateToProps)(Host);
