
import React, { useState, useEffect } from 'react';
import { WritingFormat, GradeLevel, WritingRequest, WritingResponse } from './types';
import { generateWritingContent } from './services/geminiService';
import TeacherTips from './components/TeacherTips';
import Layout from './components/Layout';

interface SavedDraft extends WritingResponse {
  topic: string;
  format: WritingFormat;
  id: string;
  date: string;
}

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState<WritingFormat>(WritingFormat.ESSAY);
  const [grade, setGrade] = useState<GradeLevel>(GradeLevel.SECONDARY);
  const [result, setResult] = useState<WritingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SavedDraft[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('guru_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await generateWritingContent({ topic, format, grade });
      setResult(data);
      
      const newDraft: SavedDraft = {
        ...data,
        topic,
        format,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString()
      };
      
      const updatedHistory = [newDraft, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem('guru_history', JSON.stringify(updatedHistory));
      
      // Smooth scroll to result
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError('Server is busy. Please try again in a few moments.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.content);
      alert('Content copied to clipboard!');
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Your Personal English Educator
          </h1>
          <p className="text-xl opacity-90 font-medium max-w-2xl mx-auto">
            High-quality writing drafts for Indian school students. Simple English, standard board formats, and expert tips.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 pb-20">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">I want to write a:</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(WritingFormat).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFormat(f)}
                      className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        format === f
                          ? 'bg-indigo-600 text-white shadow-lg scale-[1.02]'
                          : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {f.charAt(0) + f.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Target Class/Level:</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as GradeLevel)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-700 font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                >
                  {Object.values(GradeLevel).map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Subject or Topic:</label>
              <div className="relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., A Visit to a Historical Monument..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-5 text-xl font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300 shadow-inner"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-xl hover:shadow-indigo-200 disabled:opacity-50 flex items-center justify-center text-lg group"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-6 w-6 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Teacher is preparing the draft...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>Generate Final Draft</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl font-medium shadow-sm animate-bounce">
            {error}
          </div>
        )}

        {result && (
          <div id="result-section" className="mt-16 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-forwards">
            <div className="bg-white rounded-2xl paper-shadow p-8 md:p-12 border border-slate-100 relative overflow-hidden">
               {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">Prepared Draft</h2>
                  <p className="text-slate-500 font-medium">{format} &bull; {grade}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={copyToClipboard}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy Draft
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center border border-slate-200"
                  >
                    Print
                  </button>
                </div>
              </div>
              
              <div className="writing-content whitespace-pre-wrap text-xl text-slate-800 p-4 border-l-2 border-slate-100 italic md:not-italic">
                {result.content}
              </div>

              <div className="mt-12 flex items-center justify-between text-slate-400 text-xs border-t pt-6">
                <span>Estimated Word Count: {result.content.split(/\s+/).length} words</span>
                <span>Bharat English Guru &copy; 2024</span>
              </div>
            </div>

            <TeacherTips tips={result.teacherTips} />
          </div>
        )}

        {/* Recent History */}
        {!result && history.length > 0 && (
          <div className="mt-16">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Drafts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setResult({ content: h.content, teacherTips: h.teacherTips })}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all text-left flex justify-between items-center group"
                >
                  <div>
                    <h4 className="font-bold text-slate-800 line-clamp-1">{h.topic}</h4>
                    <p className="text-xs text-slate-500 font-medium uppercase mt-1">{h.format} &bull; {h.date}</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
