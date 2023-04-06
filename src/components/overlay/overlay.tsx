import React, { ReactNode } from 'react';
import './Overlay.css';

interface OverlayProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Overlay = ({ isOpen, children, onClose }: OverlayProps) => {
  return (
    <>
      {isOpen && (
        <div className="overlay">
          <div className="overlay-content">{children}</div>
          <div className="overlay-backdrop" onClick={onClose}></div>
        </div>
      )}
    </>
  );
};

export default Overlay;
