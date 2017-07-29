import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Hosts extends React.Component {

  renderHost(host) {
    const {
      address,
      status,
      mac,
      timestamp
    } = host;

    const cla = {
      label: true,
      'label-success': status === 'alive',
      'label-danger': status === 'fail'
    };

    return (
      <tr key={address}>
        <td>
          {moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}
          &nbsp;
          <span className={classnames(cla)}>{status}</span>
        </td>
        <td>
          <Link to={`services/address/${address}`}>{address}</Link>
        </td>
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
            <th>Last Heartbeat</th>
            <th>Internal IP</th>
            <th>Mac Address</th>
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