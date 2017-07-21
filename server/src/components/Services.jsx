import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Services extends React.Component {
  render() {
    return (
      <div>
        <h3>
          Hosts: <span className="badge">{this.props.addresses.length}</span>
          mainClassNames: <span className="badge">{this.props.mainClassNames.length}</span>
          Services: <span className="badge">{this.props.services.length}</span>
        </h3>
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
                  <td>
                    <Link to={ `/services/address/${service.address}`}>{service.address}</Link>
                  </td>
                  <td>{service.pid}</td>
                  <td>
                    <Link to={ `/services/main/${service.main}`}>{service.main}</Link>
                  </td>
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

const mapStateToProps = (state, p) => {
  const services = [];
  const addresses = [];
  const mainClassNames = [];

  const {
    filterKey,
    filterValue
  } = p.match.params;

  state.hosts.forEach(host => {
    const {
      address
    } = host;
    host.jps.forEach(jvm => {
      if (!filterKey || (host[filterKey] === filterValue || jvm[filterKey] === filterValue)) {
        if (addresses.indexOf(host.address) === -1) {
          addresses.push(host.address);
        }
        if (mainClassNames.indexOf(jvm.main)) {
          mainClassNames.push(jvm.main);
        }
        services.push(Object.assign({}, jvm, {
          address
        }));
      }
    });
  });
  return {
    services,
    addresses,
    mainClassNames
  }
}

export default connect(mapStateToProps)(Services);