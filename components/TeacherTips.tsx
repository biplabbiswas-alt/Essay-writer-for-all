
import React from 'react';

interface TeacherTipsProps {
  tips: string[];
}

const TeacherTips: React.FC<TeacherTipsProps> = ({ tips }) => {
  return (
    <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-amber-100 p-2 rounded-full text-amber-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-amber-900 uppercase tracking-wide">Teacher's Expert Advice</h3>
      </div>
      
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex space-x-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-200 text-amber-800 font-bold flex items-center justify-center text-sm">
              {index + 1}
            </span>
            <p className="text-amber-900 text-lg italic leading-relaxed">
              "{tip}"
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-amber-200">
        <p className="text-amber-800 text-sm font-medium">
          Remember: "Simple writing is good writing. Focus on clarity before complexity."
        </p>
      </div>
    </div>
  );
};

export default TeacherTips;
