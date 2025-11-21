import React, { useState, useRef } from 'react';
import { OrderData } from '../types';
import { fileToBase64 } from '../services/geminiService';
import { Loader2, Upload, AlertCircle } from 'lucide-react';

interface UploadStepProps {
  orderData: OrderData;
  updateOrder: (data: Partial<OrderData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const UploadStep: React.FC<UploadStepProps> = ({ orderData, updateOrder, onNext, onBack }) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      setError("Please upload a valid image file (JPEG, PNG).");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      return;
    }

    setError(null);
    const previewUrl = URL.createObjectURL(file);
    
    // Optimistic update for UI
    updateOrder({
      imageFile: file,
      imagePreviewUrl: previewUrl,
      aiAnalysis: "Ready for print" 
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Upload Your Photo</h2>
        <p className="text-slate-500">Select the photo you want transformed into a 3D Lithophane.</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        {!orderData.imagePreviewUrl ? (
          <div 
            onClick={triggerFileInput}
            className="w-full h-64 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer flex flex-col items-center justify-center text-slate-400 group"
          >
            <div className="p-4 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform duration-200">
              <Upload className="w-8 h-8 text-indigo-600" />
            </div>
            <p className="mt-4 font-medium text-slate-600">Click to upload image</p>
            <p className="text-sm text-slate-400">JPG or PNG up to 10MB</p>
          </div>
        ) : (
          <div className="relative w-full rounded-xl overflow-hidden shadow-md bg-slate-900 group">
            <img 
              src={orderData.imagePreviewUrl} 
              alt="Preview" 
              className="w-full h-64 object-contain opacity-90"
            />
            <button 
              onClick={triggerFileInput}
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-all"
            >
              Change Photo
            </button>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button 
          onClick={onBack}
          className="flex-1 py-3 px-6 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          disabled={!orderData.imageFile}
          className="flex-1 py-3 px-6 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          Continue to Address
        </button>
      </div>
    </div>
  );
};