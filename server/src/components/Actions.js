import React from 'react';
import { fetchHosts } from '../actions';
import * as API from '../api';
import { connect } from 'react-redux';

class Actions extends React.Component {
  componentDidMount() {
    this.props.fetchHosts(API.hosts());
  }

  handleClick() {
    this.props.fetchHosts(API.hosts());
  }

  render() {
    return (
      <div>
        <button className="btn" onClick={ this.handleClick.bind(this) }>Refresh</button>
      </div>
    );
  }
}

export default connect(null, {
  fetchHosts
})(Actions);