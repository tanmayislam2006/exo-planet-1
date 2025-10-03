import React, { useState, useEffect, useRef } from 'react';
import { User, Send, FileText, Mic, LogOut } from 'lucide-react'; 

// --- Constants ---

const API_BASE = "https://exo-planet-finder.onrender.com/citizen";

// --- Main Component ---

const CitizenScientist = () => {
  // Assuming the user is authenticated and we need a consistent name for display.
  const DISPLAY_USERNAME = "Active Citizen"; 
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

    // Simulate API Call - relies on an externally managed token in localStorage
    try {
      const token = localStorage.getItem("token") || "placeholder-token"; 
      
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": token },
        body: JSON.stringify({ message: msg })
      });
      
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      if (!res.ok) throw new Error("API call failed");
      
      // Simulation Response
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

    // Simulate API Call
    try {
      const token = localStorage.getItem("token") || "placeholder-token";
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST", 
        headers: { "Authorization": token }, 
        body: formData
      });

      // Simulate network delay for large file
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!res.ok) throw new Error("Upload failed");
      
      // Successful result simulation
      setCsvMessage({ type: 'success', text: `Data file "${file.name}" uploaded. Analysis complete! Initial finding: 3 potential TESS candidates identified.` });
      
      // Clear file input
      fileInput.value = '';

    } catch (err) {
      console.error("CSV Upload Error:", err);
      setCsvMessage({ type: 'error', text: 'Upload failed. Ensure the file is a valid light curve CSV format.' });
    }
  };

  // --- Render ---

  return (
    // Main Container with Cosmic Gradient Feel
    <div className="min-h-screen bg-gray-900 text-white font-['Inter',sans-serif] p-0 md:p-6"
      style={{
        background: 'radial-gradient(ellipse at center, #1f2937 0%, #111827 100%)',
      }}
    >
      <div className="main md:ml-0">
        
        {/* Navbar / Header Bar - Sleek Dark Design */}
        <nav className="bg-gray-800/80 backdrop-blur-sm border-b border-indigo-700 p-4 flex justify-between items-center rounded-b-xl md:rounded-xl mb-6 shadow-2xl shadow-indigo-900/50">
          <h5 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
            EXO Planet Finder - Citizen Scientist Portal
          </h5>
          <div className="flex items-center space-x-3">
            <span id="navbar-username" className="text-sm font-medium text-indigo-300 flex items-center gap-2 px-3 py-1 rounded-full bg-gray-700/50 border border-indigo-600">
                <User className="w-5 h-5 text-indigo-400" />
                {DISPLAY_USERNAME}
            </span>
            {/* Keeping a placeholder LogOut button for UI completeness, assuming the outside environment handles the actual auth clear. */}
            <button 
                className="px-3 py-1 text-sm rounded-lg border border-red-500 text-red-400 hover:bg-red-900/50 transition duration-150 flex items-center"
                onClick={() => console.log("Logout triggered externally")} 
            >
              <LogOut className="w-4 h-4 mr-1" /> Log Out
            </button>
          </div>
        </nav>

        {/* Chatbot Section */}
        <div className="container mx-auto px-4 md:px-0 mb-8">
          <div 
            className="chat-box bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl shadow-indigo-900/50 p-4 md:p-6 h-[450px] overflow-y-auto border border-indigo-700" 
            ref={chatBoxRef}
          >
            {chatHistory.length === 0 ? (
                <p className="text-center text-indigo-400 p-10 font-medium">
                    Welcome, {DISPLAY_USERNAME}. The Exo Assistant is ready to help analyze, filter, or query your astronomical datasets.
                </p>
            ) : (
                chatHistory.map(msg => (
                    <div 
                        key={msg.id}
                        className={`chat-message my-3 p-3 rounded-2xl max-w-full sm:max-w-[75%] shadow-lg transition-all duration-300 font-light 
                                    ${msg.sender === "user" 
                                        ? 'bg-indigo-600 text-white ml-auto text-right rounded-br-sm' 
                                        : 'bg-gray-700 text-gray-200 mr-auto text-left rounded-tl-sm'}`
                                    }
                    >
                        {msg.text}
                    </div>
                ))
            )}
          </div>
          
          <form onSubmit={sendMessage} className="input-area mt-4 flex items-stretch gap-3">
            <input
              type="text"
              id="chatInput"
              className="flex-1 px-4 py-3 bg-gray-700/50 text-white border border-indigo-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-inner placeholder-gray-400"
              placeholder="Query the database or ask about your uploaded data..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button 
                type="submit" 
                className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition duration-150 shadow-lg flex items-center justify-center transform hover:scale-105" 
                aria-label="Send Message"
            >
              <Send className="w-6 h-6" />
            </button>
            <button 
              type="button" 
              className={`p-3 rounded-xl transition duration-150 shadow-lg flex items-center justify-center 
                          ${isListening 
                              ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse border border-red-400' 
                              : 'bg-gray-700/50 text-indigo-400 hover:bg-gray-700 border border-indigo-700'}`
              }
              onClick={toggleVoice}
              aria-label="Toggle Voice Input"
            >
              <Mic className="w-6 h-6" />
            </button>
          </form>
        </div>

        {/* CSV Upload Section - Using Fuchsia/Pink accent for high visibility */}
        <div className="container mx-auto px-4 md:px-0">
          <div className="upload-box bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-2xl shadow-purple-900/50 border border-purple-700">
            <h5 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-fuchsia-400" /> Upload Raw Transit Data (CSV)
            </h5>
            <form onSubmit={handleCsvUpload} className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <input 
                type="file" 
                id="csvFile" 
                name="csvFile"
                // Custom styling for file input to fit the dark theme
                className="flex-1 w-full sm:w-auto p-2 text-sm text-gray-300 bg-gray-700/50 rounded-lg border border-purple-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-500 file:text-white hover:file:bg-fuchsia-600" 
                accept=".csv" 
                required 
              />
              <button 
                type="submit" 
                className="w-full sm:w-auto px-6 py-2 text-white font-bold rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 transition duration-150 shadow-lg transform hover:scale-105"
              >
                Upload & Analyze
              </button>
            </form>
            
            {/* Upload Status Message */}
            {csvMessage.text && (
              <div 
                className={`mt-4 p-3 rounded-lg text-sm font-medium border
                    ${csvMessage.type === 'success' 
                        ? 'bg-green-900/50 text-green-300 border-green-700' 
                        : csvMessage.type === 'error' 
                        ? 'bg-red-900/50 text-red-300 border-red-700' 
                        : 'bg-blue-900/50 text-blue-300 border-blue-700'}`
                }
              >
                {csvMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenScientist;
