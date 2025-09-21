// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/lib/utils.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const calculateEPC = (earnings, clicks) => {
  return clicks > 0 ? (earnings / clicks).toFixed(2) : 0;
};

export const calculateROI = (earnings, costs) => {
  return costs > 0 ? ((earnings - costs) / costs * 100).toFixed(2) : 0;
};