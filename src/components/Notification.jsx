const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }
  const className = isError ? "message-error" : "message-successful";

  return <div className={className}>{message}</div>;
};

export default Notification;
