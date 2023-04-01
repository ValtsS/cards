import React, { ReactElement } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import './link-ex.css'; // import CSS file

interface LinkExProps extends LinkProps {
  path: string;
  children: React.ReactNode;
}

export const LinkEx = (props: LinkExProps): ReactElement => {
  const to = props.to.valueOf().toString().toLowerCase();
  const className = props.path.toLowerCase() === to ? 'active' : '';

  return (
    <>
      <Link className={className} {...(props as LinkProps)}></Link>
    </>
  );
};
