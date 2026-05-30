import React from 'react';
import { motion } from 'framer-motion';
import { Award, X, Printer, ShieldCheck } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../context/AppContext';

export interface CollaborationCertificateProps {
  franchise: {
    id: string;
    name: string;
    ownerId: string; // Storing Director Name
    contact: string;
    address: string;
    validityFrom?: string;
    validityTo?: string;
  };
  onClose: () => void;
}

export const CollaborationCertificate: React.FC<CollaborationCertificateProps> = ({ franchise, onClose }) => {
  const { businessProfile } = useApp();

  const logoSrc = businessProfile?.logoUrl || "https://api.dicebear.com/7.x/initials/svg?seed=STG&backgroundColor=112D55&textColor=FFFFFF&fontSize=38";

  // Helper to format date in "04 March 2026" format
  const formatPrettyDate = (dateString?: string, defaultVal: string = '04 March 2026') => {
    if (!dateString) return defaultVal;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return defaultVal;
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return defaultVal;
    }
  };

  // Resolve director's name with smart fallback for mock data
  const getDirectorName = () => {
    if (!franchise) return 'Ram Preet Prajapati';
    if (franchise.id === 'f1' || franchise.ownerId === 'u2') return 'Ram Preet Prajapati';
    if (franchise.ownerId && franchise.ownerId.length > 3 && !franchise.ownerId.startsWith('u')) {
      return franchise.ownerId;
    }
    return 'Ram Preet Prajapati'; // Fallback to leadership requested by user
  };

  const directorName = getDirectorName();
  const issueDate = formatPrettyDate(franchise.validityFrom, '04 March 2026');
  const expiryDate = formatPrettyDate(franchise.validityTo, '04 March 2027');

  const verificationUrl = `${window.location.origin}/verify/franchise-${franchise.id}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 print:p-0 print:bg-white print:relative print:inset-auto">
      <div className="bg-white rounded-[2.5rem] max-w-5xl w-full p-8 space-y-6 print:p-0 print:rounded-none relative shadow-2xl">
        
        {/* Header toolbar (Hidden during print) */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 print:hidden">
          <div className="flex items-center space-x-3 text-[#141414]">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Award size={20} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider font-display">Certificate of Collaboration</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Official Franchise Credentials</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Outer view frame with scrolling wrapper */}
        <div className="overflow-x-auto py-2">
          {/* Certificate Container with PRINT-ONLY class support */}
          <div 
            id="collaboration-certificate"
            className="print-only min-w-[950px] mx-auto border-[6px] border-amber-500/80 p-2 bg-[#FCFAF6] aspect-[1.414/1] relative flex flex-col justify-between shadow-xl print:shadow-none print:border-[6px] print:border-amber-500/80 leading-normal select-none overflow-hidden"
          >
            {/* Outer Navy Border Inset */}
            <div className="absolute inset-2 border-[14px] border-[#0F1E36] pointer-events-none rounded-xs"></div>
            
            {/* Double Golden Hairlines */}
            <div className="absolute inset-[24px] border border-amber-400/40 pointer-events-none"></div>
            <div className="absolute inset-[27px] border border-amber-400/20 pointer-events-none"></div>

            {/* Secure security pattern */}
            <div className="absolute inset-[28px] bg-[radial-gradient(#0f1e3602_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none"></div>
            
            {/* Central Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <img 
                src={logoSrc} 
                alt="" 
                className="w-[40%] object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://api.dicebear.com/7.x/initials/svg?seed=STG&backgroundColor=112D55&textColor=FFFFFF&fontSize=38";
                }}
              />
            </div>

            {/* Decorative Corner Ornaments */}
            <div className="absolute top-[32px] left-[32px] w-14 h-14 border-t-2 border-l-2 border-amber-500/60 rounded-tl-sm pointer-events-none flex items-start justify-start p-1">
              <div className="w-2.5 h-2.5 bg-amber-500/40 rounded-full"></div>
            </div>
            <div className="absolute top-[32px] right-[32px] w-14 h-14 border-t-2 border-r-2 border-amber-500/60 rounded-tr-sm pointer-events-none flex items-start justify-end p-1">
              <div className="w-2.5 h-2.5 bg-amber-500/40 rounded-full"></div>
            </div>
            <div className="absolute bottom-[32px] left-[32px] w-14 h-14 border-b-2 border-l-2 border-amber-500/60 rounded-bl-sm pointer-events-none flex items-end justify-start p-1">
              <div className="w-2.5 h-2.5 bg-amber-500/40 rounded-full"></div>
            </div>
            <div className="absolute bottom-[32px] right-[32px] w-14 h-14 border-b-2 border-r-2 border-amber-500/60 rounded-br-sm pointer-events-none flex items-end justify-end p-1">
              <div className="w-2.5 h-2.5 bg-amber-500/40 rounded-full"></div>
            </div>

            {/* Top Certificate Header Block */}
            <div className="text-center pt-10 px-12 relative z-10 flex flex-col items-center">
              {/* Brand Logo in dynamic high-contrast container */}
              <div className="mb-3">
                <div className="w-20 h-20 bg-white rounded-full p-1.5 shadow-md border-2 border-amber-500 flex items-center justify-center overflow-hidden">
                  <img 
                    src={logoSrc} 
                    alt="Softdev GURU Logo" 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://api.dicebear.com/7.x/initials/svg?seed=STG&backgroundColor=112D55&textColor=FFFFFF&fontSize=38";
                    }}
                  />
                </div>
              </div>

              {/* Institute Name */}
              <h1 className="text-3xl font-black text-[#0F1E36] tracking-widest uppercase font-sans leading-none drop-shadow-xs">
                SOFTDEV TALLY GURU
              </h1>
              <p className="text-[10px] font-black tracking-[0.15em] text-slate-500 uppercase mt-1 mb-0.5">
                (A Complete Computer Education Institute)
              </p>
              <p className="text-[9px] font-extrabold tracking-[0.2em] text-amber-600 uppercase mt-0.5 bg-amber-50 px-3 py-0.5 rounded-full border border-amber-200/50">
                (An Authorised Tally Education Partner)
              </p>
              
              <div className="flex items-center justify-center gap-3 mt-1 text-[8px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                <span>Joint Accreditation</span>
                <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
                <span>ISO 9001:2015 Certification</span>
              </div>
            </div>

            {/* Certificate Title Row */}
            <div className="relative my-2 flex items-center justify-center relative z-10 w-full px-20">
              <div className="h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent w-full absolute" />
              <span className="relative bg-[#FCFAF6] px-6 py-1 text-[13px] font-extrabold text-amber-700 border-2 border-amber-500/30 rounded-full uppercase tracking-[0.3em] shadow-xs font-display">
                CERTIFICATE OF COLLABORATION
              </span>
            </div>

            {/* Body content meticulously framed */}
            <div className="px-16 text-center text-slate-800 relative z-10 flex-grow flex flex-col justify-center space-y-4 pt-1 pb-2">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400 italic">This is to certify that</p>
              
              <div className="space-y-1">
                {/* Franchise Center Block */}
                <h2 className="text-2xl font-black text-[#0F1E36] tracking-tight uppercase px-6 py-0.5 inline-block border-b-2 border-double border-amber-500 text-center">
                  {franchise.name}
                </h2>
                <p className="text-[10px] font-bold tracking-[0.2em] text-amber-600 uppercase mt-1">is a valued branch of</p>
                <p className="text-base font-extrabold text-slate-700 tracking-wider">SOFTDEV TALLY GURU</p>
              </div>

              <div className="space-y-3 mt-1">
                {/* Under the leadership of */}
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  Under the leadership of <strong className="text-[#0F1E36] text-sm uppercase tracking-wide px-3 py-0.5 bg-yellow-50 rounded-lg border border-yellow-200/50">{directorName}</strong>
                </p>
                
                {/* Validity and Location Details */}
                <p className="text-[10px] font-medium text-slate-600 max-w-lg mx-auto">
                  On this day <span className="font-bold text-slate-800">{issueDate}</span>, located at <span className="font-bold text-slate-800 uppercase text-[9px]">{franchise.address}</span>.
                </p>

                <div className="inline-block bg-[#0F1E36]/5 border border-[#0F1E36]/10 px-4 py-1.5 rounded-xl">
                  <p className="text-[9px] font-bold text-[#0F1E36] tracking-wider uppercase leading-none">
                    This certification is valid until <span className="text-red-600 font-extrabold">{expiryDate}</span>
                  </p>
                </div>
                
                <p className="text-[8px] font-bold uppercase tracking-widest text-[#0F1E36]/60 italic mt-1 font-mono">
                  * This certification is subject to renewal by the SOFTDEV TALLY GURU.
                </p>
              </div>
            </div>

            {/* Footer Signatures, QR and Seal */}
            <div className="flex justify-between items-end relative z-10 px-14 pb-8 pt-2">
              
              {/* Left verification system */}
              <div className="space-y-1 flex flex-col items-center">
                <div className="p-1.5 bg-white border border-gray-100 rounded-xl shadow-md">
                  <QRCodeSVG 
                    value={verificationUrl} 
                    size={72} 
                  />
                </div>
                <span className="text-[7px] font-black tracking-widest text-[#0F1E36] uppercase font-mono">Verify Center</span>
              </div>

              {/* Center Seal design */}
              <div className="flex flex-col items-center justify-center relative translate-y-3">
                <div className="w-16 h-16 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg relative border-4 border-double border-amber-100">
                  <div className="absolute inset-0.5 rounded-full border border-dashed border-white/40 flex flex-col items-center justify-center text-center">
                    <span className="text-[5px] font-black tracking-tighter text-amber-950 uppercase leading-none">STG</span>
                    <span className="text-[4px] font-black tracking-widest text-white uppercase mt-0.5">ESTD 2012</span>
                    <span className="text-[4px] font-bold text-amber-950/80 uppercase">COLLABORATION</span>
                  </div>
                </div>
                <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 font-mono">Accreditation Stamp</span>
              </div>

              {/* Right signature design */}
              <div className="flex flex-col items-center text-center space-y-1 min-w-[150px]">
                <div className="h-10 flex items-center justify-center relative select-none">
                  <span className="font-serif italic text-lg text-amber-700 font-extrabold leading-none select-none select-none tracking-wider font-script pointer-events-none block translate-y-2">
                    Director
                  </span>
                  {/* Decorative faint signature line */}
                  <div className="absolute w-32 h-6 border-b border-amber-700/30 rotate-[-12deg] pointer-events-none scale-y-50"></div>
                </div>
                <div className="w-32 border-t border-slate-300"></div>
                <span className="text-[9px] font-black text-[#0F1E36] uppercase tracking-wider">Director</span>
                <span className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">SOFTDEV TALLY GURU</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action button row (Hidden during print) */}
        <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-gray-100 print:hidden font-sans">
          <button 
            onClick={() => window.print()}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center space-x-2 shadow-sm"
          >
            <Printer size={16} />
            <span>Print Certificate</span>
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-[#141414] text-xs font-black uppercase tracking-wider rounded-xl transition-all"
          >
            Close
          </button>
        </div>

      </div>

      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            background: white !important;
            color: black !important;
          }
          body * {
            visibility: hidden;
          }
          #collaboration-certificate, #collaboration-certificate * {
            visibility: visible !important;
          }
          #collaboration-certificate {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            background: #FCFAF6 !important;
            border: 6px solid rgba(245, 158, 11, 0.8) !important;
            padding: 8px !important;
            margin: 0 !important;
            box-shadow: none !important;
            width: 297mm !important;
            height: 210mm !important;
            box-sizing: border-box !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};
