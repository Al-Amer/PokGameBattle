import React, { useState, useEffect } from 'react';
import { FaDatabase, FaServer, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const BackendStatus = () => {
  const [status, setStatus] = useState('checking');
  const [dbStatus, setDbStatus] = useState('unknown');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/health');
        const data = await response.json();
        
        if (response.ok) {
          setStatus('connected');
          setDbStatus(data.database || 'connected');
          setMessage(`Backend: ${data.port || '5001'}`);
        } else {
          setStatus('disconnected');
          setMessage('Backend error');
        }
      } catch (error) {
        setStatus('disconnected');
        setMessage('Backend offline');
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch(status) {
      case 'connected': return 'bg-green-500';
      case 'disconnected': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 ${getStatusColor()} text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm`}>
      <div className="flex items-center space-x-2">
        <FaServer className="text-sm" />
        <span>{message}</span>
        {status === 'connected' && <FaCheckCircle className="text-white" />}
        {status === 'disconnected' && <FaExclamationTriangle className="text-white" />}
        <div className={`w-2 h-2 rounded-full animate-pulse ${status === 'connected' ? 'bg-white' : 'bg-gray-200'}`}></div>
      </div>
    </div>
  );
};

export default BackendStatus;
