import React, { useState, useEffect } from 'react';
import api from '../services/api';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkBackend = async () => {
      const result = await api.healthCheck();
      if (result.success) {
        setStatus('connected');
        setMessage('Backend connected');
      } else {
        setStatus('disconnected');
        setMessage('Backend not available');
      }
    };

    checkBackend();
    // Check every 30 seconds
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  const statusColors = {
    checking: 'bg-yellow-500',
    connected: 'bg-green-500',
    disconnected: 'bg-red-500'
  };

  return (
    <div className={`fixed bottom-4 right-4 ${statusColors[status]} text-white px-4 py-2 rounded-lg shadow-lg z-50`}>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full animate-pulse ${status === 'connected' ? 'bg-white' : 'bg-gray-200'}`}></div>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};

export default BackendStatus;
