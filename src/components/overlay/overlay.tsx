import React, { ReactNode } from 'react';
import './overlay.css';

interface OverlayProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Overlay = ({ isOpen, children, onClose }: OverlayProps) => {
  if (isOpen)
    return (
      <div
        className="overlay"
        onClick={() => {
          onClose();
        }}
      >
        <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
          <span
            className="close"
            onClick={() => {
              onClose();
            }}
          >
            &times;
          </span>
          <div>{children}</div>
        </div>
      </div>
    );

  return <></>;
};

export default Overlay;
