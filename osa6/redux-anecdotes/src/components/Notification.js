import React from 'react';

const Notification = ({store}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!store.getState().notifications){
    return null
  }
  return (
    <div style={style}>
        {store.getState().notifications.map(notification => 
          <div key={notification.id}>{notification.content}</div>)}
    </div>
  )
}

export default Notification
