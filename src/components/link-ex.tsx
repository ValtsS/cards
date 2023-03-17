import React from 'react';
import { Link } from 'react-router-dom';
import './link-ex.css'; // import CSS file

interface LinkExProps {
  to: string;
  path: string;
  children: React.ReactNode;
}

class LinkEx extends React.Component<LinkExProps> {
  render() {
    const className = this.props.path.toLowerCase() === this.props.to.toLowerCase() ? 'active' : '';
    return (
      <>
        <Link to={this.props.to} className={className}>
          {this.props.children}
        </Link>
      </>
    );
  }
}

export default LinkEx;
