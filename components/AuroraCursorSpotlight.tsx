import React, { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

const AuroraCursorSpotlight: React.FC = () => {
  const { designSystem } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (designSystem !== 'aurora') {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [designSystem]);

  if (designSystem !== 'aurora') {
    return null;
  }

  return (
    <div
      className="aurora-spotlight"
      style={{
        left: position.x,
        top: position.y,
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
};

export default AuroraCursorSpotlight;
