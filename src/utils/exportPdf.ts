export const exportPDF = () => {
  // Alert the user about the optimal way to save as PDF
  alert("For a high-quality, fully editable, and text-selectable PDF:\n\n1. The Print dialog will open.\n2. In the 'Destination' dropdown, select 'Save as PDF'.\n3. Click 'Save'.");
  
  // Trigger the native browser print engine
  window.print();
};