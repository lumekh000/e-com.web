import React from 'react';
import { useStore } from '../context/StoreContext';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigate } = useStore();

  return (
    <div className="bg-[#F8F7F2] min-h-screen py-20 flex items-center justify-center">
      <div className="max-w-md w-full text-center px-4 space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#EAE6D8] text-[#063D30] flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <span className="text-[#F0787B] font-bold text-sm tracking-widest uppercase">404 Error</span>

        <h1 className="font-serif text-3xl font-bold text-[#17231E]">
          Page Not Found
        </h1>

        <p className="text-xs text-[#6D746E]">
          The page you are looking for might have been removed, renamed, or is temporarily unavailable.
        </p>

        <button
          onClick={() => navigate('home')}
          className="bg-[#063D30] text-[#DCE6D2] font-bold text-xs py-3.5 px-8 rounded-full shadow-lg hover:bg-[#022C23] inline-flex items-center gap-2 uppercase tracking-wider"
        >
          <span>Back to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
