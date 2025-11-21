import React, { useState } from 'react';
import { OrderData, AddressData } from '../types';

interface AddressStepProps {
  orderData: OrderData;
  updateOrder: (data: Partial<OrderData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AddressStep: React.FC<AddressStepProps> = ({ orderData, updateOrder, onNext, onBack }) => {
  const [address, setAddress] = useState<AddressData>(orderData.address);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrder({ address });
    onNext();
  };

  const isValid = address.fullName && address.street1 && address.city && address.state && address.zip && address.email;

  // Updated classes for high contrast readability
  const inputClasses = "w-full p-3 rounded-lg border border-slate-300 bg-white text-black placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">Shipping Details</h2>
        <p className="text-slate-500">Where should we send your 3D masterpiece?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Jane Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={address.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder="jane@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Street Address</label>
          <input
            type="text"
            name="street1"
            value={address.street1}
            onChange={handleChange}
            className={inputClasses}
            placeholder="123 Maker Lane"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Apartment, suite, etc. (Optional)</label>
          <input
            type="text"
            name="street2"
            value={address.street2}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Apt 4B"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className={inputClasses}
              placeholder="New York"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">State</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              className={inputClasses}
              placeholder="NY"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">ZIP Code</label>
          <input
            type="text"
            name="zip"
            value={address.zip}
            onChange={handleChange}
            className={inputClasses}
            placeholder="10001"
            required
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button 
          type="button"
          onClick={onBack}
          className="flex-1 py-3 px-6 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
        >
          Back
        </button>
        <button 
          type="submit"
          disabled={!isValid}
          className="flex-1 py-3 px-6 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Review Order
        </button>
      </div>
    </form>
  );
};