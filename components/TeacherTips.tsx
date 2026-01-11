
import React from 'react';

interface TeacherTipsProps {
  tips: string[];
}

const TeacherTips: React.FC<TeacherTipsProps> = ({ tips }) => {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-10 border border-amber-100 shadow-xl shadow-amber-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
      
      <div className="flex items-center space-x-4 mb-10 relative">
        <div className="bg-amber-500 p-3 rounded-2xl text-white shadow-lg shadow-amber-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-black text-amber-900 leading-tight uppercase tracking-tight">Teacher's Insights</h3>
          <p className="text-amber-700/70 text-sm font-bold tracking-widest uppercase">Classroom Wisdom</p>
        </div>
      </div>
      
      <div className="space-y-8 relative">
        {tips.map((tip, index) => (
          <div key={index} className="flex space-x-6 items-start group">
            <span className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white border-2 border-amber-200 text-amber-600 font-black flex items-center justify-center text-lg shadow-sm group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all duration-300">
              {index + 1}
            </span>
            <div className="flex-1 pt-1">
              <p className="text-amber-900 text-xl font-medium italic leading-relaxed decoration-amber-200 decoration-wavy underline-offset-4">
                "{tip}"
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 pt-8 border-t border-amber-200/60 relative">
        <div className="flex items-center space-x-3 text-amber-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p className="text-sm font-black uppercase tracking-wider">Guru's Golden Rule</p>
        </div>
        <p className="mt-2 text-amber-900/80 text-lg font-medium italic">
          "Don't write to impress; write to express. Clear thoughts lead to clear sentences."
        </p>
      </div>
    </div>
  );
};

export default TeacherTips;
