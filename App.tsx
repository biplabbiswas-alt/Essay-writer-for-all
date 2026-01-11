
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
  const [wordCount, setWordCount] = useState<number>(200);
  const [result, setResult] = useState<WritingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<SavedDraft[]>([]);

  const wordCountOptions = [100, 150, 200, 300, 350, 400, 500, 600, 700];

  // Safety check for API Key on mount
  useEffect(() => {
    const saved = localStorage.getItem('guru_history');
    if (saved) setHistory(JSON.parse(saved));

    if (!process.env.API_KEY) {
      console.warn("API Key is missing from process.env. Ensure it is configured in your environment.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await generateWritingContent({ topic, format, grade, wordCount });
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
      
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'The Guru is currently busy. Please try again after a minute.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.content);
      alert('Draft copied to clipboard!');
    }
  };

  return (
    <Layout>
      <div className="bg-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Bharat English Guru
          </h1>
          <p className="text-xl opacity-90 font-medium max-w-2xl mx-auto">
            Expert academic writing drafts for Indian school students. Follows standard CBSE & ICSE formats.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 pb-20">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Format</label>
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
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Class Level</label>
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
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Length (Words)</label>
              <div className="flex flex-wrap gap-2">
                {wordCountOptions.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setWordCount(count)}
                    className={`py-2 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${
                      wordCount === count
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Draft Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Environment Conservation, School Annual Day..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-5 text-xl font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-xl disabled:opacity-50 flex items-center justify-center text-lg group"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-6 w-6 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Consulting the Guru...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>Prepare Draft</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl font-medium shadow-sm flex items-start space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-bold">Execution Error</p>
              <p className="text-sm opacity-90">{error}</p>
              {!process.env.API_KEY && (
                <p className="mt-2 text-xs font-bold text-red-800 underline uppercase tracking-tight">Technical Note: The API Key is not set in the environment.</p>
              )}
            </div>
          </div>
        )}

        {result && (
          <div id="result-section" className="mt-16 space-y-10 animate-flourish">
            <div className="bg-white rounded-2xl paper-shadow p-8 md:p-12 border border-slate-100 relative">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900">Guru's Draft</h2>
                  <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">{format} &bull; {grade} &bull; target {wordCount} words</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={copyToClipboard}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center shadow-sm"
                  >
                    Copy Draft
                  </button>
                </div>
              </div>
              
              <div className="writing-content whitespace-pre-wrap text-xl text-slate-800 p-6 border-l-4 border-indigo-100 bg-slate-50/30 rounded-r-xl">
                {result.content}
              </div>

              <div className="mt-12 flex items-center justify-between text-slate-400 text-xs border-t pt-6">
                <span>Words: {result.content.split(/\s+/).filter(x => x).length}</span>
                <span>Created by Bharat English Guru</span>
              </div>
            </div>

            <TeacherTips tips={result.teacherTips} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
