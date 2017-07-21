import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

class Hosts extends React.Component {

  renderHost(host) {
    const {
      address,
      status,
      username
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
        <td>{address}</td>
        <td>{username}</td>
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
            <th>Staus</th>
            <th>Address</th>
            <th>Username</th>
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