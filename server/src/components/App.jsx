import React from 'react';
import { connect } from 'react-redux';

import Host from './Host';
import { fetchHosts } from '../actions';
import * as API from '../api';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchHosts(API.hosts());
  }

  render() {
    return (
      <div>
        <h3>Hosts: <span className="badge">{this.props.hosts.length}</span></h3>
        <table className="table table-striped table-condensed">
          <tbody>
          {
            this.props.hosts.map(host =>
              (
                <Host key={ host.address } host={ host }/>
              )
            )
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

export default connect(mapStateToProps, {
  fetchHosts
})(App);