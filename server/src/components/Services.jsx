import React from 'react';
import { connect } from 'react-redux';

class Services extends React.Component {
  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
          <tr>
            <th>IP</th>
            <th>PID</th>
            <th>Main Class</th>
            <th>Options</th>
            <th>Ports</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.services.map(service => {
              return (
                <tr key={`${service.address}-${service.pid}`}>
                  <td>{service.address}</td>
                  <td>{service.pid}</td>
                  <td>{service.main}</td>
                  <td>
                    {
                      service.options
                    }
                  </td>
                  <td>
                    <ul>
                      {
                        service.ports.map(portItem => (
                          <li key={portItem.port}>
                            {portItem.host}:{portItem.port}
                          </li>
                        ))
                      }
                    </ul>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const services = [];

  state.hosts.forEach(host => {
    const {
      address
    } = host;
    host.jps.forEach(jvm => {
      services.push(Object.assign({}, jvm, {
        address
      }));
    });
  });
  return {
    services
  }
}

export default connect(mapStateToProps)(Services);