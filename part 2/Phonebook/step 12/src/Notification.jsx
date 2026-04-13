const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const getStyle = () => {
    if (type === 'error') {
      return errorStyle
    }
    return successStyle
  }

  return (
    <div style={getStyle()}>
      {message}
    </div>
  )
}

const successStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '12px 20px',
  marginBottom: '20px',
  borderRadius: '4px',
  border: '1px solid #45a049',
}

const errorStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  padding: '12px 20px',
  marginBottom: '20px',
  borderRadius: '4px',
  border: '1px solid #da190b',
}

export default Notification
