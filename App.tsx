import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  Copy, 
  ArrowRight,
  Box
} from 'lucide-react';

// --- CUSTOM LOGO COMPONENT ---
const DoodleCubeIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Front Face */}
    <rect x="3" y="7" width="14" height="14" rx="2" />
    {/* Back Face Lines (The 'Doodle' look) */}
    <path d="M7 7l4-4" />
    <path d="M17 7l4-4" />
    <path d="M17 21l4-4" />
    {/* Back Face partial rect to complete the illusion */}
    <path d="M11 3h10v14" />
  </svg>
);

// --- ANIMATION COMPONENT ---
const ProcessAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 3500); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[320px] md:max-w-sm aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 mx-auto ring-4 ring-slate-900/50">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        
        {/* STEP 1: PHOTO */}
        <div className={`transition-all duration-700 absolute transform ${step === 0 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 -translate-x-10'}`}>
          <div className="flex flex-col items-center">
            <div className="w-20 h-32 bg-slate-800 border-4 border-slate-600 rounded-xl flex items-center justify-center relative shadow-xl">
              <div className="w-12 h-20 bg-indigo-500/20 rounded flex items-center justify-center overflow-hidden">
                {/* The original photo on the phone */}
                <img 
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200" 
                  className="w-full h-full object-cover opacity-80"
                  alt="Real Dog Photo"
                />
              </div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
            </div>
            <p className="mt-4 font-bold text-white text-sm tracking-wide uppercase text-xs">1. You Send Photo</p>
          </div>
        </div>

        {/* STEP 2: MODELING */}
        <div className={`transition-all duration-700 absolute transform ${step === 1 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 translate-x-10'}`}>
           <div className="flex flex-col items-center">
             <div className="relative w-32 h-32 bg-slate-800/80 rounded-xl border border-slate-700 flex items-center justify-center overflow-hidden shadow-inner">
               {/* Wireframe scanning effect */}
               <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(99,102,241,0.5)_50%)] bg-[length:100%_4px] animate-scan"></div>
               <Box className="w-16 h-16 text-indigo-400 animate-pulse" />
             </div>
             <p className="mt-4 font-bold text-white text-sm tracking-wide uppercase text-xs">2. We Model It</p>
           </div>
        </div>

        {/* STEP 3: THE PHYSICAL OBJECT */}
        <div className={`transition-all duration-700 absolute transform ${step === 2 ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-90 translate-x-10'}`}>
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-36 flex items-center justify-center group">
              {/* The Result: A statue/print of the dog */}
              <div className="absolute bottom-0 w-24 h-4 bg-black/50 blur-md rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1589929605995-d59479012d0c?auto=format&fit=crop&q=80&w=300" 
                className="relative w-full h-full object-cover drop-shadow-2xl filter contrast-125" 
                style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)' }} // Slight trapezoid to fake a standing object
                alt="3D Printed Dog Statue"
              />
              {/* Sparkles */}
              <div className="absolute -top-2 -right-2 text-yellow-400 animate-bounce">✨</div>
            </div>
            <p className="mt-4 font-bold text-indigo-200 text-sm tracking-wide uppercase text-xs shadow-black drop-shadow-md">3. Real 3D Statue</p>
          </div>
        </div>

      </div>

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${step === i ? 'bg-indigo-500 w-4' : 'bg-slate-700'}`} />
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState<'HOME' | 'GALLERY' | 'ORDER'>('HOME');

  const EMAIL = "tibaumflek@gmail.com";
  const VENMO_HANDLE = "@tsufy";
  const VENMO_LINK = `https://venmo.com/u/${VENMO_HANDLE.replace('@', '')}`;
  const PRICE = "$29.99";

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied!`);
  };

  // --- VIEWS ---

  const HomeView = () => (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full max-w-5xl animate-fade-in">
      <div className="flex-1 text-center md:text-left space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] md:text-xs font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          Now Accepting Orders
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
          From flat photo <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">to physical object.</span>
        </h1>
        
        <p className="text-base md:text-lg text-slate-600 max-w-md mx-auto md:mx-0 leading-relaxed">
          Send us a picture of your pet, your house, or your best friend. We'll 3D print a <strong>tangible, custom figurine</strong> or model that you can hold in your hands.
        </p>
        
        <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
          <button 
            onClick={() => setActiveTab('ORDER')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            Create a Statue <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setActiveTab('GALLERY')}
            className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all"
          >
            See Examples
          </button>
        </div>
      </div>

      <div className="flex-1 w-full flex justify-center">
        <ProcessAnimation />
      </div>
    </div>
  );

  const GalleryView = () => (
    <div className="w-full max-w-5xl space-y-6 animate-fade-in flex flex-col h-full justify-center">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Turn Memories into Miniatures</h2>
        <p className="text-slate-500">We don't just print photos. We create physical objects.</p>
      </div>

      {/* Horizontal Scroll Container for Mobile, Grid for Desktop */}
      <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 scrollbar-hide">
        
        {/* Card 1: Custom Figurines */}
        <div className="min-w-[260px] md:min-w-0 flex-1 snap-center relative rounded-2xl overflow-hidden bg-slate-100 aspect-[3/4] md:aspect-[4/5] shadow-md group">
          <img 
            src="https://images.unsplash.com/photo-1544164559-3a375f8892f1?auto=format&fit=crop&q=80&w=600" 
            alt="Sculpted Portrait" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex items-end p-5">
            <div className="text-white">
              <h3 className="font-bold text-lg">Custom Figurines</h3>
              <p className="text-slate-300 text-xs mt-1">Turn a person into a 3D printed statue.</p>
            </div>
          </div>
        </div>

        {/* Card 2: Pet Statues */}
        <div className="min-w-[260px] md:min-w-0 flex-1 snap-center relative rounded-2xl overflow-hidden bg-white aspect-[3/4] md:aspect-[4/5] shadow-md ring-4 ring-indigo-50 group">
          <img 
            src="https://images.unsplash.com/photo-1633516496530-39c384f73863?auto=format&fit=crop&q=80&w=600" 
            alt="3D Printed Pet" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Most Popular</div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex items-end p-5">
            <div className="text-white">
              <h3 className="font-bold text-lg">Pet Statues</h3>
              <p className="text-slate-300 text-xs mt-1">A solid model of your furry friend.</p>
            </div>
          </div>
        </div>

        {/* Card 3: Scale Models */}
        <div className="min-w-[260px] md:min-w-0 flex-1 snap-center relative rounded-2xl overflow-hidden bg-slate-100 aspect-[3/4] md:aspect-[4/5] shadow-md group">
          <img 
            src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600" 
            alt="House Model" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex items-end p-5">
            <div className="text-white">
              <h3 className="font-bold text-lg">Scale Models</h3>
              <p className="text-slate-300 text-xs mt-1">Your house or car as a miniature model.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Specs */}
      <div className="flex justify-center gap-4 md:gap-12 text-center pt-2">
         <div className="flex flex-col items-center gap-1">
           <Box className="w-5 h-5 text-indigo-500" />
           <span className="text-xs font-semibold text-slate-700">Solid 3D Print</span>
         </div>
         <div className="flex flex-col items-center gap-1">
           <span className="w-5 h-5 flex items-center justify-center font-bold text-indigo-500 text-sm border border-indigo-500 rounded">4"</span>
           <span className="text-xs font-semibold text-slate-700">Standard Height</span>
         </div>
         <div className="flex flex-col items-center gap-1">
           <Box className="w-5 h-5 text-indigo-500" />
           <span className="text-xs font-semibold text-slate-700">Tangible Object</span>
         </div>
      </div>
      
      <div className="flex justify-center pt-4">
        <button onClick={() => setActiveTab('ORDER')} className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
            Start My Order <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const OrderView = () => (
    <div className="w-full max-w-4xl animate-fade-in flex flex-col items-center justify-center h-full">
      <div className="bg-white w-full rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Header Side (Mobile Top / Desktop Left) */}
        <div className="bg-slate-900 p-6 md:p-10 flex flex-col justify-center md:w-1/3 text-center md:text-left">
           <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Get Started</h2>
           <p className="text-slate-400 text-sm mb-6">Order your custom 3D figurine today.</p>
           <div className="inline-block bg-slate-800 rounded-lg p-3 border border-slate-700">
             <p className="text-slate-400 text-xs uppercase font-bold mb-1">Starting Price</p>
             <p className="text-2xl font-bold text-white">{PRICE}</p>
           </div>
        </div>

        {/* Steps Side */}
        <div className="p-6 md:p-10 md:w-2/3 grid gap-8">
          
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="flex-none w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">1</div>
            <div className="flex-1 space-y-3">
               <div>
                 <h3 className="font-bold text-slate-900">Email Us The Photo</h3>
                 <p className="text-xs text-slate-500">Send the photo you want turned into a 3D model:</p>
               </div>
               <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200 justify-between group">
                  <span className="font-mono text-sm text-slate-700 truncate">{EMAIL}</span>
                  <button onClick={() => copyToClipboard(EMAIL, "Email")} className="p-1 hover:bg-white rounded shadow-sm transition-all text-slate-500 hover:text-indigo-600">
                    <Copy className="w-4 h-4" />
                  </button>
               </div>
               <a 
                  href={`mailto:${EMAIL}?subject=PhotoSculpt Order&body=Hi PhotoSculpt Team,%0D%0A%0D%0AI want to turn my attached photo into a 3D figurine!%0D%0A%0D%0A--- ORDER DETAILS ---%0D%0A%0D%0A[Attach Photo Here]%0D%0A%0D%0ASHIPPING ADDRESS:%0D%0AName:%20%0D%0AStreet:%20%0D%0ACity/State/Zip:%20%0D%0A%0D%0AVENMO HANDLE (for confirmation):%20`}
                  className="inline-flex items-center text-xs font-bold text-indigo-600 hover:underline"
               >
                 Draft Email for me <ArrowRight className="w-3 h-3 ml-1" />
               </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="flex-none w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">2</div>
            <div className="flex-1 space-y-3">
               <div>
                 <h3 className="font-bold text-slate-900">Send Payment</h3>
                 <p className="text-xs text-slate-500">Venmo <strong>{PRICE}</strong> to confirm your order:</p>
               </div>
               <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg border border-blue-100 justify-between">
                  <span className="font-mono text-sm text-blue-800 font-bold">{VENMO_HANDLE}</span>
                  <button onClick={() => copyToClipboard(VENMO_HANDLE, "Venmo Handle")} className="p-1 hover:bg-white rounded shadow-sm transition-all text-blue-400 hover:text-blue-600">
                    <Copy className="w-4 h-4" />
                  </button>
               </div>
               <a href={VENMO_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-bold text-blue-600 hover:underline">
                 Open Venmo <ExternalLink className="w-3 h-3 ml-1" />
               </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 flex flex-col overflow-hidden">
      
      {/* --- COMPACT HEADER --- */}
      <header className="flex-none h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 flex items-center justify-between z-50">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setActiveTab('HOME')}
        >
          <div className="w-10 h-10 text-indigo-600 transform group-hover:rotate-6 transition-transform duration-300">
             <DoodleCubeIcon />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900 hidden md:inline">
            Photo<span className="text-indigo-600">Sculpt</span>
          </span>
        </div>

        {/* SEGMENTED CONTROL NAVIGATION */}
        <nav className="bg-slate-100/80 p-1 rounded-full flex items-center relative">
           {['HOME', 'GALLERY', 'ORDER'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`relative px-4 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all duration-200 z-10 ${
                 activeTab === tab 
                 ? 'text-indigo-600 shadow-sm bg-white' 
                 : 'text-slate-500 hover:text-slate-700'
               }`}
             >
               {tab.charAt(0) + tab.slice(1).toLowerCase()}
             </button>
           ))}
        </nav>

        {/* Spacer for visual balance */}
        <div className="w-8 hidden md:block"></div>
      </header>

      {/* --- MAIN CONTENT AREA (NO SCROLL) --- */}
      <main className="flex-1 relative overflow-hidden w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-white">
        <div className="w-full h-full absolute inset-0 p-4 md:p-8 flex items-center justify-center">
          {activeTab === 'HOME' && <HomeView />}
          {activeTab === 'GALLERY' && <GalleryView />}
          {activeTab === 'ORDER' && <OrderView />}
        </div>
      </main>

    </div>
  );
}