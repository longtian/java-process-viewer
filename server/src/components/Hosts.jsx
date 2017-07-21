import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';

class Hosts extends React.Component {

  renderHost(host) {
    const {
      address,
      status,
      mac,
      timestampe
    } = host;

    const cla = {
      label: true,
      'label-success': status === 'alive',
      'label-danger': status === 'fail'
    };

    return (
      <tr>
        <td>
          <span className={classnames(cla)}>{status}</span>
        </td>
        <td>{moment(timestampe).format('YYYY-MM-DD HH:mm:ss')}</td>
        <td>{address}</td>
        <td>{mac}</td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <h3>Hosts: <span className="badge">{this.props.hosts.length}</span></h3>
        <table className="table table-striped table-condensed">
          <thead>
          <tr>
            <th>状态</th>
            <th>最后一次心跳</th>
            <th>内网 IP</th>
            <th>Mac地址</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.hosts.map(host => this.renderHost(host))
          }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    hosts: state.hosts
  };
};

export default connect(mapStateToProps)(Hosts);