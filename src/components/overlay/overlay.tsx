import React, { ReactNode } from 'react';
import './overlay.css';

interface OverlayProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const Overlay = ({ isOpen, children, onClose }: OverlayProps) => {
  if (isOpen)
    return (
      <div
        className="overlay"
        data-testid="overlay"
        onClick={() => {
          onClose();
        }}
      >
        <div
          className="overlay-content"
          data-testid="overlay-content"
          onClick={(e) => e.stopPropagation()}
        >
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
