
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight">Bharat English <span className="text-indigo-600">Guru</span></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Academic Excellence</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-slate-600 text-sm font-bold hover:text-indigo-600 transition-colors">Home</a>
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
            <a href="#" className="text-slate-600 text-sm font-bold hover:text-indigo-600 transition-colors">Resources</a>
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300"></div>
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-indigo-700 transition-all">
              Join Newsletter
            </button>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 text-slate-400 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <span className="font-extrabold text-2xl text-white tracking-tight">Bharat English <span className="text-indigo-500">Guru</span></span>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering Indian students with high-quality English writing tools, blending tradition with technology.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Writing Formats</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Academic Essays</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Notice Writing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Formal Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Creative Paragraphs</a></li>
            </ul>
          </div>
          <div className="space-y-4 text-sm">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Community</h4>
            <p>Made with ❤️ for students across India.</p>
            <div className="flex space-x-4 pt-2">
              <div className="h-8 w-8 rounded-full bg-slate-800 hover:bg-indigo-600 transition-colors cursor-pointer"></div>
              <div className="h-8 w-8 rounded-full bg-slate-800 hover:bg-indigo-600 transition-colors cursor-pointer"></div>
              <div className="h-8 w-8 rounded-full bg-slate-800 hover:bg-indigo-600 transition-colors cursor-pointer"></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-900 text-center text-xs text-slate-600 font-medium">
          &copy; {new Date().getFullYear()} Bharat English Guru. Deploying Education Forward.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
