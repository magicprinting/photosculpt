export enum AppStep {
  LANDING = 'LANDING',
  UPLOAD = 'UPLOAD',
  ADDRESS = 'ADDRESS',
  REVIEW = 'REVIEW',
  SUCCESS = 'SUCCESS'
}

export interface AddressData {
  fullName: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  email: string;
}

export interface OrderData {
  imageFile: File | null;
  imagePreviewUrl: string | null;
  aiAnalysis: string | null;
  address: AddressData;
  price: number;
}

export const INITIAL_ADDRESS: AddressData = {
  fullName: '',
  street1: '',
  street2: '',
  city: '',
  state: '',
  zip: '',
  email: ''
};
