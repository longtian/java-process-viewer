import React from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import uuid from 'uuid';
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
              <th>command</th>
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
                      <Command uuid={uuid.v4()} host={host.address} command={`jcmd ${item.pid} VM.version`}/>
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
            RAW
          </div>
          <pre>
            {JSON.stringify(this.props.host, null, 2)}
          </pre>
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
