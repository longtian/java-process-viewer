import React from 'react';

const renderStatus = (delta) => {
  if (delta <= 60000) {
    return <span className="label label-success">alive</span>
  } else {
    return <span className="label label-danger">fail</span>
  }
}

class Host extends React.Component {
  render() {

    const {
      address,
      jps,
      timestampe,
      username
    } = this.props.host;

    const sinceLastHearbeat = Date.now() - new Date(timestampe);

    return (
      <tr>
        <td>
          {
            renderStatus(sinceLastHearbeat)
          }
        </td>
        <td>{address}</td>
        <td>{username}</td>
        <td>
          <table className="table table-striped">
            <tbody>
            {
              jps
                .map(item => (
                  <tr key={item.pid}>
                    <td>
                      {item.pid}
                    </td>
                    <td>
                      {item.main}
                    </td>
                    <td>
                      {item.options}
                    </td>
                    <td>
                      <ul>
                        {item.ports.map(port => (
                          <li key={port.port}>
                            {port.host}:{port.port}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))
            }
            </tbody>
          </table>
        </td>
      </tr>
    )
  }
}

export default Host;