const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const notificationStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '12px 20px',
  marginBottom: '20px',
  borderRadius: '4px',
  border: '1px solid #45a049',
}

export default Notification
