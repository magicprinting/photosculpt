import React from 'react';
import { OrderData } from '../types';
import { MapPin, ExternalLink, ShieldCheck, Loader2 } from 'lucide-react';

interface ReviewStepProps {
  orderData: OrderData;
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ orderData, onBack, onConfirm, isSubmitting = false }) => {
  const VENMO_HANDLE = "@tsufy";
  const VENMO_LINK = `https://venmo.com/u/${VENMO_HANDLE.replace('@', '')}`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Confirm & Pay</h2>
        <p className="text-slate-500">Almost there! Review your details below.</p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex p-4 border-b border-slate-100 gap-4">
           {orderData.imagePreviewUrl && (
             <img 
               src={orderData.imagePreviewUrl} 
               alt="Print Preview" 
               className="w-20 h-20 object-cover rounded-lg bg-slate-100"
             />
           )}
           <div className="flex-1">
             <h3 className="font-semibold text-slate-800">Custom 3D Figurine</h3>
             <p className="text-sm text-slate-500 mt-1">Height: Approx 4"</p>
             <p className="text-sm text-slate-500">Material: Solid PLA/Resin</p>
           </div>
           <div className="text-right">
             <span className="block font-bold text-slate-800 text-lg">${orderData.price.toFixed(2)}</span>
           </div>
        </div>

        <div className="p-4 bg-slate-50">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
            <div className="text-sm text-slate-600">
              <p className="font-medium text-slate-900">{orderData.address.fullName}</p>
              <p>{orderData.address.street1} {orderData.address.street2}</p>
              <p>{orderData.address.city}, {orderData.address.state} {orderData.address.zip}</p>
              <p className="mt-1 text-slate-500">{orderData.address.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Venmo Instructions */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
          V
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Payment Required: ${orderData.price.toFixed(2)}</h3>
          <p className="text-slate-600 text-sm mt-1 max-w-xs mx-auto">
            To finalize your order, please send <strong>${orderData.price.toFixed(2)}</strong> to our Venmo handle.
          </p>
        </div>
        
        <div className="py-3 px-4 bg-white rounded-lg border border-blue-200 inline-flex items-center gap-2 select-all cursor-pointer hover:border-blue-400 transition-colors">
          <span className="font-mono font-bold text-blue-700 text-lg">{VENMO_HANDLE}</span>
        </div>

        <div>
            <a 
              href={VENMO_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Open Venmo App <ExternalLink className="w-3 h-3" />
            </a>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <button 
          onClick={onConfirm}
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing Order...
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              I have sent the payment
            </>
          )}
        </button>
        <button 
          onClick={onBack}
          disabled={isSubmitting}
          className="w-full py-3 px-6 text-slate-500 font-medium hover:text-slate-700 text-sm"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};