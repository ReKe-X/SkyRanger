import { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket'; // 使用 ES Modules
import './index.css';

// 错误边界组件
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return <div className="text-white p-4">An error occurred. Please refresh the page.</div>;
  }

  return children;
};

const HomePage = ({ onNavigate }) => (
  <div className="flex flex-col items-center justify-center h-screen p-4">
    <h1 className="text-4xl font-bold text-white mb-8 text-shadow">Sky-Ranger</h1>
    <div className="text-white text-lg mb-4">
      <p><strong>Temperature:</strong>-</p>
      <p><strong>Location:</strong>-</p>
      <p><strong>Air Quality:</strong>-</p>
      <p><strong>CO Level:</strong>-</p>
    </div>
    <div className="absolute bottom-8 flex justify-around w-full px-4">
      <button
        onClick={() => onNavigate('messages')}
        className="bg-transparent text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
        style={{ color: '#ffffff' }}
      >
        Messages
      </button>
      <button
        onClick={() => onNavigate('report')}
        className="bg-transparent text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
        style={{ color: '#ffffff' }}
      >
        Report
      </button>
    </div>
  </div>
);

const MessagesPage = ({ onNavigate, alerts }) => (
  <div className="p-4">
    <h2 className="text-2xl font-bold text-white mb-4 text-shadow">Messages</h2>
    <div className="space-y-4">
      {alerts.length > 0 ? (
        <>
          {alerts.filter(a => a.type === 'illegal').length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-2 text-shadow">Illegal Parking</h3>
              {alerts.filter(a => a.type === 'illegal').map((alert, index) => (
                <div key={index} className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg mb-2">
                  <p>{alert.message}</p>
                  {alert.image && (
                    <img
                      src={`data:image/jpeg;base64,${alert.image}`}
                      alt={alert.message}
                      className="w-32 h-32 object-cover rounded-lg mt-2"
                    />
                  )}
                  <p className="text-sm text-gray-300 mt-2">{new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
                </div>
              ))}
            </div>
          )}
          {alerts.filter(a => a.type === 'people').length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-2 text-shadow">People Down</h3>
              {alerts.filter(a => a.type === 'people').map((alert, index) => (
                <div key={index} className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg mb-2">
                  <p>{alert.message}</p>
                  {alert.image && (
                    <img
                      src={`data:image/jpeg;base64,${alert.image}`}
                      alt={alert.message}
                      className="w-32 h-32 object-cover rounded-lg mt-2"
                    />
                  )}
                  <p className="text-sm text-gray-300 mt-2">{new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
                </div>
              ))}
            </div>
          )}
          {alerts.filter(a => a.type === 'license').length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-2 text-shadow">License Plates</h3>
              {alerts.filter(a => a.type === 'license').map((alert, index) => (
                <div key={index} className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg mb-2">
                  <p>{alert.message}</p>
                  {alert.image && (
                    <img
                      src={`data:image/jpeg;base64,${alert.image}`}
                      alt={alert.message}
                      className="w-32 h-32 object-cover rounded-lg mt-2"
                    />
                  )}
                  <p className="text-sm text-gray-300 mt-2">{new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
                </div>
              ))}
            </div>
          )}
          {alerts.filter(a => a.type === 'flame').length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-2 text-shadow">Flame Detection</h3>
              {alerts.filter(a => a.type === 'flame').map((alert, index) => (
                <div key={index} className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg mb-2">
                  <p>{alert.message}</p>
                  {alert.image && (
                    <img
                      src={`data:image/jpeg;base64,${alert.image}`}
                      alt={alert.message}
                      className="w-32 h-32 object-cover rounded-lg mt-2"
                    />
                  )}
                  <p className="text-sm text-gray-300 mt-2">{new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-white">No messages available. Please wait for server updates.</p>
      )}
    </div>
    <button
      onClick={() => onNavigate('home')}
      className="mt-4 bg-transparent text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
      style={{ color: '#ffffff' }}
    >
      Back
    </button>
  </div>
);

const ReportPage = ({ onNavigate }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (description && image) {
      alert('Report submitted successfully!');
      setDescription('');
      setImage(null);
    } else {
      alert('Please provide a description and an image.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4 text-shadow">Report an Issue</h2>
      <div className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg mb-4">
        <label className="block text-lg mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue..."
          className="w-full p-2 rounded-lg bg-gray-800 text-white border-none focus:outline-none"
          rows="4"
        />
        <label className="block text-lg mt-4 mb-2">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 text-white"
        />
        {image && <img src={image} alt="Uploaded" className="w-32 h-32 object-cover rounded-lg mt-2" />}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-transparent text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
          style={{ color: '#ffffff' }}
        >
          Submit
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="bg-transparent text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
          style={{ color: '#ffffff' }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [sensorData, setSensorData] = useState({
    temperature: 'N/A',
    location: 'N/A',
    airQuality: 'N/A',
    coLevel: 'N/A'
  });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // const client = new W3CWebSocket('ws://localhost:8765');
    const client = new W3CWebSocket('ws://172.22.172.212:8765');
    client.onopen = () => {
      console.log('WebSocket 连接已打开');
      client.send(JSON.stringify({ type: 'requestSensorData' }));
    };

    client.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'sensor') {
        setSensorData(data.data);
      } else if (data.type.match(/illegal|people|license|flame/)) {
        setAlerts((prev) => [...prev, data].slice(-5)); // 保留最新 5 条警报
      } else if (data.type === 'sensorDataResponse') {
        setSensorData(data.data);
      }
    };

    client.onerror = (error) => {
      console.error('WebSocket 错误:', error);
    };

    client.onclose = (event) => {
      console.log('WebSocket 连接关闭，原因:', event.reason);
      if (event.wasClean) {
        console.log('连接正常关闭');
      } else {
        console.log('连接异常关闭，尝试重新连接...');
      }
    };

    return () => {
      if (client.readyState === WebSocket.OPEN) {
        client.close();
      }
    };
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    if (page === 'messages') {
      // 点击 Messages 时确保显示所有缓存的警报，无需额外请求
    }
  };

  return (
    <ErrorBoundary>
      <div className="app-container">
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'messages' && <MessagesPage onNavigate={navigate} alerts={alerts} />}
        {currentPage === 'report' && <ReportPage onNavigate={navigate} />}
      </div>
    </ErrorBoundary>
  );
};

export default App;