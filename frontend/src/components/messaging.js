import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Messaging = ({ currentUserId, chatWithId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    axios.get(`/api/messages/${currentUserId}/${chatWithId}`)
      .then(res => setMessages(res.data));
  }, [currentUserId, chatWithId]);

  const handleSend = () => {
    axios.post('/api/messages', {
      senderId: currentUserId,
      receiverId: chatWithId,
      message: newMessage
    }).then(res => {
      setMessages([...messages, res.data]);
      setNewMessage('');
    });
  };

  return (
    <div>
      <h3>Chat</h3>
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.senderId === currentUserId ? 'You' : 'Them'}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Messaging;
