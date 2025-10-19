import React from 'react';
import { QrCodeIcon } from './icons/QrCodeIcon';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8">
      <div className="flex items-center justify-center space-x-3 text-slate-900">
        <QrCodeIcon className="w-8 h-8 text-indigo-600" />
        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
          QR Code Generator
        </span>
      </div>
    </header>
  );
};

export default Header;
