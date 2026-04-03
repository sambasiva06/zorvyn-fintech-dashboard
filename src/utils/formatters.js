// ─── Pulse Finance — Formatting Utilities ───

/**
 * Format a number as Indian Rupees (₹)
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a date string to a human-readable format
 */
export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

/**
 * Get month name from a date string
 */
export function getMonthName(dateString) {
  return new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(new Date(dateString));
}

/**
 * Get full month name from a date string
 */
export function getFullMonthName(dateString) {
  return new Intl.DateTimeFormat('en-IN', { month: 'long' }).format(new Date(dateString));
}

/**
 * Export transactions as CSV and trigger download
 */
export function exportToCSV(transactions, filename = 'pulse-transactions') {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount (INR)'];
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description}"`,
    t.category,
    t.type,
    t.amount,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export transactions as JSON and trigger download
 */
export function exportToJSON(transactions, filename = 'pulse-transactions') {
  const jsonContent = JSON.stringify(transactions, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
