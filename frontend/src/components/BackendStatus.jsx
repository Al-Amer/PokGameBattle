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
          setDbStatus(data.database);
          setMessage('Backend connected');
        } else {
          setStatus('disconnected');
          setDbStatus('error');
          setMessage('Connection error');
        }
      } catch (error) {
        setStatus('disconnected');
        setDbStatus('unknown');
        setMessage('Backend not available');
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

  const getDbIcon = () => {
    if (dbStatus === 'connected') return <FaCheckCircle className="text-green-300" />;
    if (dbStatus === 'disconnected') return <FaExclamationTriangle className="text-red-300" />;
    return <FaDatabase className="text-yellow-300" />;
  };

  return (
    <div className={`fixed bottom-4 right-4 ${getStatusColor()} text-white px-4 py-2 rounded-lg shadow-lg z-50`}>
      <div className="flex items-center space-x-3">
        <FaServer className="text-sm" />
        <span className="text-sm font-medium">{message}</span>
        {status === 'connected' && (
          <>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center space-x-1">
              {getDbIcon()}
              <span className="text-xs">DB: {dbStatus}</span>
            </div>
          </>
        )}
        <div className={`w-2 h-2 rounded-full animate-pulse ${status === 'connected' ? 'bg-white' : 'bg-gray-200'}`}></div>
      </div>
    </div>
  );
};

export default BackendStatus;
