import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import './link-ex.css'; // import CSS file

interface LinkExProps extends LinkProps {
  path: string;
  children: React.ReactNode;
}

class LinkEx extends React.Component<LinkExProps> {
  render() {
    const to = this.props.to.valueOf().toString().toLowerCase();
    const className = this.props.path.toLowerCase() === to ? 'active' : '';
    return (
      <>
        <Link className={className} {...(this.props as LinkProps)}></Link>
      </>
    );
  }
}

export default LinkEx;
