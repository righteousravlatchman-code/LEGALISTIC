import React from 'react';
import type { Contact } from '../types';

interface AvatarProps {
  contact: Contact;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ contact, size = 'md' }) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };
  const textSizeMap = {
      sm: '20px',
      md: '32px',
      lg: '48px',
  };

  let glyph: string;
  if (contact.report?.coreNumbers?.lifePathNumber?.number) {
    glyph = contact.report.coreNumbers.lifePathNumber.number.split(' ')[0] || '?';
  } else {
    glyph = contact.name.charAt(0).toUpperCase() || '?';
  }

  return (
    <div className={`${sizeMap[size]} rounded-full flex items-center justify-center bg-gradient-to-br from-[var(--color-bg-secondary)] to-black shadow-lg ring-2 ring-offset-2 ring-offset-black/50 ring-[var(--color-accent-gold)]`}>
        <span
            className="font-bold text-[var(--color-accent-gold)]"
            style={{ fontSize: textSizeMap[size], fontFamily: 'var(--font-serif)' }}
        >
            {glyph}
        </span>
    </div>
  );
};

export default Avatar;