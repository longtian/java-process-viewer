import React from 'react';
import socket from '../socket';
import { connect } from 'react-redux';
import { EXEC } from '../../constants';
class Command extends React.Component {

  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    const {
      uuid,
      command,
      host
    } = this.props;
    socket.send({
      type: EXEC,
      payload: {
        command,
        host,
        uuid
      }
    });
  }

  render() {
    const {
      res
    } = this.props;

    if (res) {
      const {
        result,
        success
      } = res;
      return (
        <div className={`panel panel-${success ? 'default' : 'danger'}`}>
          <pre>{result}</pre>
        </div>
      )
    }

    return (
      <div>
        <span className="label label-success">waiting</span>
      </div>
    )
  }
}
const mapStateToProps = (state, props) => {
  const res = state.messages[props.uuid];
  if (res) {
    return {
      res
    }
  }
  return {};
};

export default connect(mapStateToProps)(Command);