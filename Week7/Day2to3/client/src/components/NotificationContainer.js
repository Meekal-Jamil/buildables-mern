import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../redux/slices/uiSlice';
import './NotificationContainer.css';

const NotificationContainer = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.ui);

  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.id) {
        setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, 5000);
      }
    });
  }, [notifications, dispatch]);

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div 
          key={notification.id} 
          className={`notification ${notification.type}`}
          onClick={() => dispatch(removeNotification(notification.id))}
        >
          <div className="notification-content">
            <strong>{notification.title}</strong>
            {notification.message && <p>{notification.message}</p>}
          </div>
          <button 
            className="notification-close"
            onClick={() => dispatch(removeNotification(notification.id))}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;