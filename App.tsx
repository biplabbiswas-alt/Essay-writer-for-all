
import React, { useState } from 'react';
import { WritingFormat, GradeLevel, WritingRequest, WritingResponse } from './types';
import { generateWritingContent } from './services/geminiService';
import TeacherTips from './components/TeacherTips';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState<WritingFormat>(WritingFormat.ESSAY);
  const [grade, setGrade] = useState<GradeLevel>(GradeLevel.SECONDARY);
  const [result, setResult] = useState<WritingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await generateWritingContent({ topic, format, grade });
      setResult(data);
    } catch (err) {
      setError('Something went wrong. Please check your connection and try again.');
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-indigo-700 px-8 py-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Bharat English Guru</h1>
            <p className="opacity-90">Expert Writing Assistance by Your Virtual Indian School Teacher</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Writing Format</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(WritingFormat).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFormat(f)}
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        format === f
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {f.charAt(0) + f.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Grade Level</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as GradeLevel)}
                  className="w-full bg-slate-100 border-none rounded-lg py-2 px-4 text-sm focus:ring-2 focus:ring-indigo-500"
                >
                  {Object.values(GradeLevel).map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">Topic Name</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., The Importance of Discipline, Annual Sports Day, Water Crisis..."
                className="w-full bg-slate-100 border-none rounded-lg py-3 px-4 text-lg focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-indigo-200 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Reviewing your request...</span>
                </>
              ) : (
                <span>Generate Writing Draft</span>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200 relative">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800 border-l-4 border-indigo-600 pl-4">Teacher's Draft</h2>
                <button
                  onClick={copyToClipboard}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center space-x-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>Copy Text</span>
                </button>
              </div>
              
              <div className="writing-content whitespace-pre-wrap text-lg text-slate-700">
                {result.content}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <TeacherTips tips={result.teacherTips} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
