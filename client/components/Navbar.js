import React from 'react';

class Navbar extends React.Component {
  constructor(...args) {
    super(...args)
    this.logout = this.logout.bind(this)
  }

  render() {
    return (
      <section className="navbar pure-g">
        <span className="navbar-title pure-u-1 pure-u-md-1-4">
          Dashboard
        </span>
        <nav className="navbar-items navigation pure-u-1 pure-u-md-3-4">
          <ul className="pure-menu-horizontal">
            {this.props.currentUser ? <li className="navigation-item pure-menu-item"><a onClick={this.logout} href="#" >Logout</a></li> : ''}
          </ul>
        </nav>
      </section>
    );
  }

  logout(e) {
    e.preventDefault();
    this.props.logout()
    return false;
  }
}

export default Navbar;
