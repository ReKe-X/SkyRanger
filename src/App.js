import React, { useState, useEffect } from 'react';
import './index.css';

const initialMessages = [
  {
    id: 1,
    type: 'computer',
    temperature: '25°C',
    roadSection: 'Campus Road A',
    coConcentration: '0.5 ppm',
    airQuality: 'Good',
    anomalies: [
      { description: 'Non-motorized vehicle parked illegally', image: 'https://via.placeholder.com/150' },
      { description: 'Student fallen on ground', image: 'https://via.placeholder.com/150' }
    ],
    importance: 3,
    timestamp: '10:01 PM PDT, May 29, 2025'
  },
  {
    id: 2,
    type: 'computer',
    temperature: '22°C',
    roadSection: 'Campus Road B',
    coConcentration: '1.2 ppm',
    airQuality: 'Moderate',
    anomalies: [],
    importance: 1,
    timestamp: '09:45 PM PDT, May 29, 2025'
  },
  {
    id: 3,
    type: 'user',
    description: 'Littering observed near the library entrance.',
    image: 'https://via.placeholder.com/150',
    timestamp: '09:30 PM PDT, May 29, 2025'
  }
];

const HomePage = ({ onNavigate }) => (
  <div className="flex flex-col items-center justify-center h-screen p-4">
    <h1 className="text-4xl font-bold text-white mb-8 text-shadow">Sky-Ranger</h1>
    <div className="absolute bottom-8 flex justify-around w-full px-4">
      <button
        onClick={() => onNavigate('messages')}
        className="bg-transparent text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
      >
        Messages
      </button>
      <button
        onClick={() => onNavigate('report')}
        className="bg-transparent text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
      >
        Report
      </button>
    </div>
  </div>
);

const MessagesPage = ({ onNavigate }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const sortedMessages = [...initialMessages].sort((a, b) => {
      if (a.type === 'computer' && b.type === 'computer') {
        return b.importance - a.importance || new Date(b.timestamp) - new Date(a.timestamp);
      }
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    setMessages(sortedMessages);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-white mb-4 text-shadow">Messages</h2>
      <div className="space-y-4">
        {messages.map(message => (
          <div key={message.id} className="bg-black bg-opacity-50 p-4 rounded-lg shadow-lg">
            {message.type === 'computer' ? (
              <>
                <p><strong>Road Section:</strong> {message.roadSection}</p>
                <p><strong>Temperature:</strong> {message.temperature}</p>
                <p><strong>CO Concentration:</strong> {message.coConcentration}</p>
                <p><strong>Air Quality:</strong> {message.airQuality}</p>
                {message.anomalies.length > 0 && (
                  <div>
                    <p><strong>Anomalies Detected:</strong></p>
                    {message.anomalies.map((anomaly, index) => (
                      <div key={index} className="mt-2">
                        <p>{anomaly.description}</p>
                        <img src={anomaly.image} alt={anomaly.description} className="w-32 h-32 object-cover rounded-lg mt-1" />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <p><strong>User Report:</strong> {message.description}</p>
                {message.image && <img src={message.image} alt="User Report" className="w-32 h-32 object-cover rounded-lg mt-2" />}
              </>
            )}
            <p className="text-sm text-gray-300 mt-2">{message.timestamp}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => onNavigate('home')}
        className="mt-4 bg-transparent text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
      >
        Back
      </button>
    </div>
  );
};

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
        >
          Submit
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="bg-transparent text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
        >
          Back
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      {currentPage === 'home' && <HomePage onNavigate={navigate} />}
      {currentPage === 'messages' && <MessagesPage onNavigate={navigate} />}
      {currentPage === 'report' && <ReportPage onNavigate={navigate} />}
    </div>
  );
};

export default App;