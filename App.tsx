
import React, { useState, useCallback } from 'react';
import QRCode from 'qrcode';
import Header from './components/Header';
import InputForm from './components/InputForm';
import QrCodeCard from './components/QrCodeCard';
import Footer from './components/Footer';
import { QrCodeIcon } from './components/icons/QrCodeIcon';

const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const generateQrCode = useCallback(async () => {
    if (!text.trim()) {
      setError('Please enter some text or a URL.');
      setQrCodeUrl('');
      return;
    }

    setIsLoading(true);
    setError('');
    // Keep previous QR code visible while loading new one for better UX
    // setQrCodeUrl(''); 

    try {
      // FIX: The 'quality' option is only valid for 'image/jpeg' and 'image/webp', not 'image/png'. Removing it resolves the TypeScript overload error.
      const url = await QRCode.toDataURL(text, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        margin: 1,
        width: 300,
        color: {
          dark: '#0f172a', // slate-900
          light: '#ffffff',
        },
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error(err);
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-cyan-50 min-h-screen flex flex-col items-center justify-between text-slate-800 antialiased">
      <Header />
      <main className="flex flex-col items-center justify-center w-full px-4 text-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-8 sm:p-10 max-w-lg w-full transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/60">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
            Instant QR Code
          </h1>
          <p className="text-slate-600 mb-8">
            Turn any text or URL into a QR code with a single click.
          </p>
          
          <InputForm
            text={text}
            setText={setText}
            onGenerate={generateQrCode}
            isLoading={isLoading}
          />

          {error && (
            <p className="mt-4 text-red-600 bg-red-100 p-3 rounded-lg text-sm">
              {error}
            </p>
          )}

          <div className="mt-8 transition-opacity duration-500 ease-in-out min-h-[300px] flex items-center justify-center">
            {isLoading && !qrCodeUrl ? (
               <div className="flex flex-col items-center justify-center">
                 <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
                 <p className="mt-4 text-slate-500">Generating...</p>
               </div>
            ) : qrCodeUrl ? (
              <QrCodeCard qrCodeUrl={qrCodeUrl} textToEncode={text} />
            ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 p-8">
                    <QrCodeIcon className="w-24 h-24 opacity-50" />
                    <p className="mt-4">Your QR Code will appear here</p>
                </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
