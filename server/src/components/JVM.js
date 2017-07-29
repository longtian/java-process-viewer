import React from 'react';
import Command from './Command';
import uuid from 'uuid';

class JVM extends React.Component {
  render() {
    const {
      address,
      pid,
      command
    } = this.props.match.params;

    return (
      <div>
        <Command uuid={ uuid.v4()} host={ address } command={ `jcmd ${pid} ${command}` }/>
      </div>
    );
  }
}

export default JVM;