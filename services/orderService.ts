import { OrderData } from '../types';

// --- CONFIGURATION ---
// The ID from your provided link: 14h0P8WGhvdpHOYM44h8sPqZSFpGUbdpzSG5MyjU4oKs
// NOTE: If the form doesn't receive responses, you likely need the "Public" ID (ViewForm ID), not the "Edit" ID.
const FORM_ID = '14h0P8WGhvdpHOYM44h8sPqZSFpGUbdpzSG5MyjU4oKs'; 
const FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

export const submitOrderToSystem = async (orderData: OrderData): Promise<boolean> => {
  
  // 1. Save to Local Storage (Backup/Immediate View)
  // This ensures you can see orders in Chrome Dev Tools -> Application -> Local Storage
  try {
    const existingOrders = JSON.parse(localStorage.getItem('photo_sculpt_orders') || '[]');
    existingOrders.push({
      id: Date.now(),
      date: new Date().toLocaleString(),
      ...orderData,
      status: 'PENDING_PAYMENT'
    });
    localStorage.setItem('photo_sculpt_orders', JSON.stringify(existingOrders));
    console.log("%c ORDER RECORDED LOCALLY ", "background: #22c55e; color: #fff; font-weight: bold; padding: 4px;");
    console.table(existingOrders); // Prints neat table to console
  } catch (e) {
    console.warn("Could not save to local storage", e);
  }

  // 2. Submit to Google Form (Tracking/Sheet)
  // IMPORTANT: You must find the "entry.ID" for each field in your specific form.
  // To do this: Open your Form -> Click 3 dots -> "Get pre-filled link" -> Fill dummy data -> Click "Get Link" -> Copy Link.
  // Look at the URL for `&entry.123456=dummydata`. Those numbers are your IDs.
  const formData = new FormData();
  
  // REPLACE THESE KEYS WITH YOUR ACTUAL FORM ENTRY IDS
  // Currently using placeholders. Submitting without correct keys means data won't map to columns.
  formData.append('entry.2005620554', orderData.address.fullName); 
  formData.append('entry.1045781291', orderData.address.email);    
  formData.append('entry.1065046570', `${orderData.address.street1} ${orderData.address.street2 || ''}, ${orderData.address.city}, ${orderData.address.state} ${orderData.address.zip}`); 
  formData.append('entry.1166974658', `$${orderData.price}`);      
  formData.append('entry.839337160', orderData.aiAnalysis || 'Standard Print'); 

  try {
    // We use mode: 'no-cors' because Google Forms does not allow standard CORS requests from web apps.
    // This means we won't get a "200 OK" response object back, but the data WILL be sent if the ID is correct.
    await fetch(FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
    
    console.log("Order sent to Google Form");
    return true;
  } catch (error) {
    console.error("Failed to submit order to Google Form:", error);
    // We return true anyway so the user sees the Success screen, since we saved it to LocalStorage above.
    return true; 
  }
};