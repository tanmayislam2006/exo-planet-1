// Researcher.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FileText, Brain, Upload, Download, Cpu, Database } from "lucide-react";
import Navbar from "./Navbar";
import useAxios from "../../../Hooks/useAxios";

const Researcher = () => {
  const [activeTab, setActiveTab] = useState("inputJson");
  const [formData, setFormData] = useState({
    koi_period: 10.5,
    koi_prad: 2.3,
    koi_depth: 500,
    koi_impact: 0.5,
    koi_duration: 3.2,
    koi_teq: 1200,
    koi_insol: 45.2,
    koi_steff: 5500,
    koi_slogg: 4.4,
    koi_srad: 1.1,
    koi_kepmag: 12.5,
    ra: 285.67,
    dec: 42.45,
    koi_model_snr: 15.2,
    koi_score: 0.85,
    koi_fpflag_nt: 0,
    koi_fpflag_ss: 0,
    koi_fpflag_co: 0,
    koi_fpflag_ec: 0,
    koi_tce_plnt_num: 1,
    koi_period_err1: 0.001,
    koi_period_err2: -0.001,
    koi_time0bk: 131.45,
    koi_time0bk_err1: 0.005,
    koi_time0bk_err2: -0.005,
    koi_impact_err1: 0.1,
    koi_impact_err2: -0.1,
    koi_duration_err1: 0.2,
    koi_duration_err2: -0.2,
    koi_depth_err1: 50,
    koi_depth_err2: -50,
    koi_prad_err1: 0.3,
    koi_prad_err2: -0.3,
    koi_insol_err1: 5,
    koi_insol_err2: -5,
    koi_steff_err1: 100,
    koi_steff_err2: -100,
    koi_slogg_err1: 0.1,
    koi_slogg_err2: -0.1,
    koi_srad_err1: 0.05,
    koi_srad_err2: -0.05,
  });
  const [result, setResult] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [trainMessage, setTrainMessage] = useState("");
  const [trainForm, setTrainForm] = useState({
    learning_rate: 0.01,
    n_estimators: 100,
    test_size: 0.2,
  });

  const navigate = useNavigate();
  const axiosInstance = useAxios();

  // Mock user data
  const user = { name: "Researcher" };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTrainChange = (field, value) => {
    setTrainForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleJsonSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      api_key: import.meta.env.VITE_API_KEY || "placeholder-key",
      dec: Number(formData.dec),
      koi_depth: Number(formData.koi_depth),
      koi_duration: Number(formData.koi_duration),
      koi_impact: Number(formData.koi_impact),
      koi_insol: Number(formData.koi_insol),
      koi_kepmag: Number(formData.koi_kepmag),
      koi_period: Number(formData.koi_period),
      koi_prad: Number(formData.koi_prad),
      koi_slogg: Number(formData.koi_slogg),
      koi_srad: Number(formData.koi_srad),
      koi_steff: Number(formData.koi_steff),
      koi_teq: Number(formData.koi_teq),
      ra: Number(formData.ra),
    };

    try {
      const res = await axiosInstance.post(`/researcher/input`, submitData);
      const prediction = res.data?.prediction;
      setResult(prediction);
    } catch (err) {
      setResult("❌ Server Error - Could not process request");
    }
  };

  const handleCsvUpload = async (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.csvFile;
    const file = fileInput.files[0];

    if (!file) {
      setUploadMessage("Please select a CSV file first.");
      return;
    }

    setUploadMessage("🔄 Processing your CSV file...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token") || "placeholder-token",
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "researcher_result.csv";
      a.click();

      setUploadMessage("✅ File processed successfully! Results downloaded.");
      fileInput.value = "";
    } catch (err) {
      setUploadMessage("❌ Upload failed. Please try again.");
    }
  };

  const handleTrainModel = async (e) => {
    e.preventDefault();
    const fileInput = e.target.elements.trainFile;
    const file = fileInput.files[0];

    if (!file) {
      setTrainMessage("Please select a training dataset file.");
      return;
    }

    setTrainMessage("🧠 Training AI model... This may take a few moments.");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("learning_rate", trainForm.learning_rate);
      formData.append("n_estimators", trainForm.n_estimators);
      formData.append("test_size", trainForm.test_size);

      const res = await fetch(`${API_BASE}/train`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token") || "placeholder-token",
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Training failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "trained_model_results.csv";
      a.click();

      setTrainMessage("✅ Model trained successfully! Results downloaded.");
      fileInput.value = "";
    } catch (err) {
      setTrainMessage(
        "❌ Training failed. Please check your data and try again."
      );
    }
  };
console.log(result);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const renderInputField = (label, name, type = "number", step = "0.01") => (
    <div className="space-y-2">
      <label className="text-white/80 text-sm font-medium">{label}</label>
      <input
        type={type}
        step={step}
        value={formData[name]}
        onChange={(e) => handleInputChange(name, e.target.value)}
        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
    </div>
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-40 h-40 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-40 w-28 h-28 bg-white/5 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-40 right-20 w-44 h-44 bg-white/10 rounded-full animate-pulse delay-1500"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        <Navbar
          title="Exo Planet Explorer - Researcher"
          user={user}
          onLogout={handleLogout}
        />

        <div className="p-8 max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            {[
              { id: "inputJson", label: "Input JSON", icon: Database },
              { id: "uploadCsv", label: "Upload CSV", icon: Upload },
              { id: "trainModel", label: "Train AI Model", icon: Brain },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-8">
            {/* Input JSON Tab */}
            {activeTab === "inputJson" && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      KOI Parameters Analysis
                    </h3>
                    <p className="text-white/70">
                      Input Kepler Object of Interest parameters for exoplanet
                      prediction
                    </p>
                  </div>
                </div>

                <form onSubmit={handleJsonSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-4 bg-white/5 rounded-2xl">
                    {Object.entries({
                      koi_period: { label: "KOI Period", step: "0.01" },
                      koi_prad: { label: "KOI Planet Radius", step: "0.01" },
                      koi_depth: { label: "KOI Depth", step: "0.01" },
                      koi_impact: { label: "KOI Impact", step: "0.01" },
                      koi_duration: { label: "KOI Duration", step: "0.01" },
                      koi_teq: { label: "KOI Equilibrium Temp", step: "1" },
                      koi_insol: { label: "KOI Insolation", step: "0.1" },
                      koi_steff: { label: "KOI Stellar Temp", step: "1" },
                      koi_slogg: { label: "KOI Stellar LogG", step: "0.1" },
                      koi_srad: { label: "KOI Stellar Radius", step: "0.1" },
                      koi_kepmag: {
                        label: "KOI Kepler Magnitude",
                        step: "0.1",
                      },
                      ra: { label: "Right Ascension", step: "0.01" },
                      dec: { label: "Declination", step: "0.01" },
                    }).map(([key, config]) =>
                      renderInputField(config.label, key, "number", config.step)
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-lg font-semibold text-lg"
                  >
                    Analyze KOI Parameters
                  </button>
                </form>

                {result && (
                  <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20">
                    <h4 className="text-white font-semibold mb-3">
                      Analysis Results:
                    </h4>
                    <pre className="text-white/80 bg-black/30 p-4 rounded-xl overflow-x-auto">
                      {result}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Upload CSV Tab */}
            {activeTab === "uploadCsv" && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      CSV Data Analysis
                    </h3>
                    <p className="text-white/70">
                      Upload your astronomical dataset for batch processing
                    </p>
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
                      className="px-8 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-2xl hover:from-purple-600 hover:to-fuchsia-600 transition duration-300 shadow-lg font-semibold flex items-center gap-2"
                    >
                      <FileText className="w-5 h-5" />
                      Process Data
                    </button>
                  </div>

                  {uploadMessage && (
                    <div
                      className={`p-4 rounded-2xl backdrop-blur-sm border ${
                        uploadMessage.includes("✅")
                          ? "bg-green-500/20 text-green-100 border-green-400/30"
                          : uploadMessage.includes("❌")
                          ? "bg-red-500/20 text-red-100 border-red-400/30"
                          : "bg-blue-500/20 text-blue-100 border-blue-400/30"
                      }`}
                    >
                      {uploadMessage}
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Train AI Model Tab */}
            {activeTab === "trainModel" && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      AI Model Training
                    </h3>
                    <p className="text-white/70">
                      Train custom exoplanet detection models with your dataset
                    </p>
                  </div>
                </div>

                <form onSubmit={handleTrainModel} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-white/80 text-sm font-medium">
                        Learning Rate
                      </label>
                      <input
                        type="number"
                        step="0.001"
                        value={trainForm.learning_rate}
                        onChange={(e) =>
                          handleTrainChange("learning_rate", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white/80 text-sm font-medium">
                        N Estimators
                      </label>
                      <input
                        type="number"
                        value={trainForm.n_estimators}
                        onChange={(e) =>
                          handleTrainChange("n_estimators", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white/80 text-sm font-medium">
                        Test Size
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={trainForm.test_size}
                        onChange={(e) =>
                          handleTrainChange("test_size", e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-green-400 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/80 text-sm font-medium">
                      Training Dataset
                    </label>
                    <input
                      type="file"
                      name="trainFile"
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-green-500 file:to-emerald-500 file:text-white hover:file:from-green-600 hover:file:to-emerald-600 transition duration-300"
                      accept=".csv"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 transition duration-300 shadow-lg font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    <Cpu className="w-6 h-6" />
                    🚀 Train AI Model
                  </button>

                  {trainMessage && (
                    <div
                      className={`p-4 rounded-2xl backdrop-blur-sm border ${
                        trainMessage.includes("✅")
                          ? "bg-green-500/20 text-green-100 border-green-400/30"
                          : trainMessage.includes("❌")
                          ? "bg-red-500/20 text-red-100 border-red-400/30"
                          : "bg-blue-500/20 text-blue-100 border-blue-400/30"
                      }`}
                    >
                      {trainMessage}
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Researcher;
