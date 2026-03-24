import React, { useState, useEffect } from 'react';

function HeroContent({ displayedText, isTypingDone, isDark }) {
  return (
    <>
      {displayedText}
      {!isTypingDone && (
        <span style={{ 
          display: 'inline-block', 
          width: '3px', 
          height: '0.85em', 
          background: isDark ? '#fff' : '#111', 
          marginLeft: '4px', 
          verticalAlign: 'middle', 
          animation: 'cursorBlink 0.8s step-end infinite', 
        }} />
      )}
    </>
  );
}

const TypingHeadline = ({ activeTab, articleCount, isMobile, isDark }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    const headlines = {
      'For Anyone': 'Building things, breaking them, understanding why.',
      'For Recruiters': "2nd-year Cybersecurity student. I ship real things. Here's proof.",
      'For Engineers': 'Driven by curiosity, open source, and the question — how does this actually work?',
      'For Writers': `${articleCount} technical articles. If I can't explain it clearly, I don't understand it yet.`
    };

    const fullText = headlines[activeTab] || '';
    setDisplayedText('');
    setIsTypingDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [activeTab, articleCount]);

  return (
    <h1 className="hero-headline hero-enter" style={{ color: isDark ? '#fff' : '#111', fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : undefined }}>
      <HeroContent displayedText={displayedText} isTypingDone={isTypingDone} isDark={isDark} />
    </h1>
  );
};

export default TypingHeadline;
