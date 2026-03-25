import React from 'react';
import DOMPurify from 'dompurify';

export default function SafeHtml({ html, className = '' }) {
  const cleanHtml = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true } // Standard HTML profile
  });
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }} 
    />
  );
}
