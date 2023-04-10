import React from 'react';
import './float-notification.css';

interface FloatNotificationProps {
  message?: string;
  error?: boolean;
}

export const FloatNotification = (props: FloatNotificationProps) => {
  const cn = props.error ? 'errorfloater' : 'infofloater';

  return <>{props.message && <div className={cn}>{props.message}</div>}</>;
};
