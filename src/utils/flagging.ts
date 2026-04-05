export const flagKeywords = [
  'brokerage', 
  'commission', 
  'direct contact', 
  'whatsapp', 
  'call me', 
  'contact me', 
  'payment link', 
  'gpay', 
  'phonepe'
];

export function analyzeMessage(text: string) {
  const phoneRegex = /\b\d{10}\b/g;
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  
  const hasPhone = phoneRegex.test(text);
  const hasEmail = emailRegex.test(text);
  const matchedKeywords = flagKeywords.filter(keyword => 
    text.toLowerCase().includes(keyword.toLowerCase())
  );
  
  const isFlagged = hasPhone || hasEmail || matchedKeywords.length > 0;
  const reasons = [
    hasPhone ? 'Phone Number' : null,
    hasEmail ? 'Email Address' : null,
    ...matchedKeywords.map(k => `Keyword: ${k}`)
  ].filter(Boolean) as string[];

  return {
    isFlagged,
    severity: hasPhone || hasEmail ? 'high' : matchedKeywords.length > 0 ? 'medium' : 'low',
    reasons
  };
}
