import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    const {
      pathname
    } = this.props.location;

    return (
      <ul className="nav nav-tabs">
        <li className={ classnames({ active: pathname.indexOf('/hosts') === 0 }) }>
          <Link to="/hosts">Hosts</Link>
        </li>
        <li className={ classnames({ active: pathname.indexOf('/services') === 0 }) }>
          <Link to="/services">Services</Link>
        </li>
      </ul>
    )
  }
}

export default Nav;