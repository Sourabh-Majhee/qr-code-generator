import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface QrCodeCardProps {
  qrCodeUrl: string;
  textToEncode: string;
}

const QrCodeCard: React.FC<QrCodeCardProps> = ({ qrCodeUrl, textToEncode }) => {
  const getFileName = () => {
    const safeText = textToEncode.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const truncatedText = safeText.substring(0, 20);
    return `qrcode_${truncatedText}.png`;
  };

  return (
    <div className="bg-white/50 p-6 rounded-xl border border-slate-200/80 flex flex-col items-center gap-6 animate-fade-in w-full">
        <img
          src={qrCodeUrl}
          alt="Generated QR Code"
          className="w-full max-w-[250px] h-auto rounded-lg shadow-lg"
        />
        <a
          href={qrCodeUrl}
          download={getFileName()}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <DownloadIcon className="w-5 h-5" />
          Download PNG
        </a>
    </div>
  );
};

export default QrCodeCard;
