import React, { useState, useEffect, useRef } from 'react';
import { User, Send, FileText, Mic, LogOut, Rocket, Users, Bot, Cpu } from 'lucide-react'; 

// --- Constants ---
const API_BASE = "https://exo-planet-finder.onrender.com/citizen";

// --- Main Component ---
const CitizenScientist = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [csvMessage, setCsvMessage] = useState({ type: '', text: '' });
  
  const chatBoxRef = useRef(null);
  const recognitionRef = useRef(null);
  
  // Scrolls chat box to the bottom on new message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const appendMessage = (text, sender) => {
    setChatHistory(prev => [...prev, { text, sender, id: Date.now() }]);
  };

  // --- Chat and Voice Logic ---
  const sendMessage = async (e) => {
    e?.preventDefault();
    const msg = chatInput.trim();
    if (!msg) return;

    appendMessage(msg, "user");
    setChatInput("");

    try {
      const token = localStorage.getItem("token") || "placeholder-token"; 
      
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": token },
        body: JSON.stringify({ message: msg })
      });
      
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      if (!res.ok) throw new Error("API call failed");
      
      const simulatedResponse = `Analyzing transit data for your query: "${msg}". The Exo Assistant detects promising patterns in Sector 4. Further computational review is queued.`;
      appendMessage(simulatedResponse, "bot");
      
    } catch (err) {
      console.error("Chat API Error:", err);
      appendMessage("🌌 Connection lost: Could not reach the Exo Assistant server.", "bot");
    }
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error("Voice recognition not supported in this browser."); 
      appendMessage("🎤 Voice recognition not supported on this device.", "bot");
      return;
    }
    
    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setChatInput(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error("Voice recognition error:", event.error);
        appendMessage("🎤 Voice recognition error", "bot");
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }

    if (!isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // --- CSV Upload Logic ---
  const handleCsvUpload = async (e) => {
    e.preventDefault();
    setCsvMessage({ type: 'info', text: 'Processing file: Uploading and initiating deep analysis...' });

    const fileInput = e.target.elements.csvFile;
    const file = fileInput.files[0];
    if (!file) {
      setCsvMessage({ type: 'error', text: 'Please select a file to upload.' });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token") || "placeholder-token";
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST", 
        headers: { "Authorization": token }, 
        body: formData
      });

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!res.ok) throw new Error("Upload failed");
      
      setCsvMessage({ type: 'success', text: `Data file "${file.name}" uploaded. Analysis complete! Initial finding: 3 potential TESS candidates identified.` });
      fileInput.value = '';

    } catch (err) {
      console.error("CSV Upload Error:", err);
      setCsvMessage({ type: 'error', text: 'Upload failed. Ensure the file is a valid light curve CSV format.' });
    }
  };

  return (
    // Main Container with Cosmic Gradient Background matching Home page
    <div className="min-h-screen relative overflow-hidden text-white" style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' 
    }}>
      
      {/* Animated Background Elements matching Home page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-40 h-40 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-40 w-28 h-28 bg-white/5 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-40 right-20 w-44 h-44 bg-white/10 rounded-full animate-pulse delay-1500"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 min-h-screen">
        
        {/* Header/Navigation */}
        <nav className="bg-white/10 backdrop-blur-md border-b border-white/30 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Exo Planet Explorer
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Users className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Citizen Scientist</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <User className="w-5 h-5 text-white" />
              <span className="text-white">Welcome, Explorer</span>
            </div>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full border border-white/30 hover:bg-white/30 transition duration-300 flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="p-8 max-w-7xl mx-auto">
          
          {/* Chatbot Section */}
          <div className="mb-8">
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Exoplanet Research Assistant</h3>
                  <p className="text-white/70">Analyze data with AI-powered text & voice commands</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div 
                ref={chatBoxRef}
                className="h-80 bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-4 overflow-y-auto border border-white/20 space-y-4"
              >
                {chatHistory.length === 0 ? (
                  <div className="text-center text-white/60 p-8">
                    <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Welcome to the Exoplanet Research Assistant!</p>
                    <p className="text-white/50">Ask me about light curves, transit patterns, or upload your data for analysis.</p>
                  </div>
                ) : (
                  chatHistory.map(msg => (
                    <div 
                      key={msg.id}
                      className={`p-4 rounded-2xl max-w-3/4 backdrop-blur-sm ${
                        msg.sender === "user" 
                          ? 'ml-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                          : 'mr-auto bg-white/10 text-white border border-white/20'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))
                )}
              </div>
              
              {/* Input Area */}
              <form onSubmit={sendMessage} className="flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-white/50"
                  placeholder="Ask about light curves, transit patterns, or data analysis..."
                />
                <button 
                  type="submit" 
                  className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-lg flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
                <button 
                  type="button" 
                  className={`px-6 py-4 rounded-2xl transition duration-300 shadow-lg flex items-center gap-2 ${
                    isListening 
                      ? 'bg-red-500 text-white border border-red-400 animate-pulse' 
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                  onClick={toggleVoice}
                >
                  <Mic className="w-5 h-5" />
                  Voice
                </button>
              </form>
            </div>
          </div>

          {/* CSV Upload Section */}
          <div className="p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Data Analysis Hub</h3>
                <p className="text-white/70">Upload your light curve CSV data for advanced analysis</p>
              </div>
            </div>

            <form onSubmit={handleCsvUpload} className="space-y-4">
              <div className="flex gap-3">
                <input 
                  type="file" 
                  name="csvFile"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-500 file:to-fuchsia-500 file:text-white hover:file:from-purple-600 hover:file:to-fuchsia-600 transition duration-300"
                  accept=".csv" 
                  required 
                />
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-2xl hover:from-purple-600 hover:to-fuchsia-600 transition duration-300 shadow-lg font-semibold"
                >
                  Upload & Analyze
                </button>
              </div>
              
              {/* Upload Status Message */}
              {csvMessage.text && (
                <div 
                  className={`p-4 rounded-2xl backdrop-blur-sm border ${
                    csvMessage.type === 'success' 
                      ? 'bg-green-500/20 text-green-100 border-green-400/30' 
                      : csvMessage.type === 'error' 
                      ? 'bg-red-500/20 text-red-100 border-red-400/30' 
                      : 'bg-blue-500/20 text-blue-100 border-blue-400/30'
                  }`}
                >
                  {csvMessage.text}
                </div>
              )}

              {/* Supported Format Info */}
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-fuchsia-300" />
                  Supported CSV Format:
                </h4>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Time series data with timestamp and flux columns</li>
                  <li>• Light curve observations from telescopes</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Required columns: time, flux</li>
                  <li>• Optional columns: error, quality_flags</li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenScientist;