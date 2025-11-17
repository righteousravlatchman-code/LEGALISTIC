import React from 'react';

interface WesternZodiacIconProps {
  sign: string;
  className?: string;
}

const WesternZodiacIcon: React.FC<WesternZodiacIconProps> = ({ sign, className }) => {
  const commonProps = {
    className: className,
    width: "100%",
    height: "100%",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (sign.toLowerCase()) {
    case 'aries':
      return <svg {...commonProps}><path d="M12 5V2M12 5c4 0 8 4 8 8M12 5C8 5 4 9 4 13"/></svg>;
    case 'taurus':
      return <svg {...commonProps}><path d="M12 15a6 6 0 100-12 6 6 0 000 12zM12 15v7"/></svg>;
    case 'gemini':
      return <svg {...commonProps}><path d="M3 7v10M21 7v10M6.5 2h11M6.5 22h11"/></svg>;
    case 'cancer':
      return <svg {...commonProps}><path d="M6 10a4 4 0 108 0 4 4 0 00-8 0zM18 14a4 4 0 10-8 0 4 4 0 008 0z"/></svg>;
    case 'leo':
      return <svg {...commonProps}><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM18 18l-6-6"/></svg>;
    case 'virgo':
      return <svg {...commonProps}><path d="M4 4v16M8 4v16M12 4v16M16 20l4-4V4"/></svg>;
    case 'libra':
      return <svg {...commonProps}><path d="M2 18h20M4 14h16"/></svg>;
    case 'scorpio':
      return <svg {...commonProps}><path d="M4 4v12h4l4 4 4-4h4V4H4zM16 12l-4 4-4-4"/></svg>;
    case 'sagittarius':
      return <svg {...commonProps}><path d="M5 19l14-14M13 5h6v6"/></svg>;
    case 'capricorn':
      return <svg {...commonProps}><path d="M3 3v10l4 4 4-4V3M10 17l4 4 4-4"/></svg>;
    case 'aquarius':
      return <svg {...commonProps}><path d="M3 12h18M6 7l12 10M6 17L18 7"/></svg>;
    case 'pisces':
      return <svg {...commonProps}><path d="M6 9a4 4 0 100 8 4 4 0 000-8zM18 7a4 4 0 100 8 4 4 0 000-8zM6 12h12"/></svg>;
    default:
      return <svg {...commonProps}><circle cx="12" cy="12" r="10" /></svg>;
  }
};

export default WesternZodiacIcon;
