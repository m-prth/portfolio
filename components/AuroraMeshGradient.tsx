import React from 'react';
import { useTheme } from '../hooks/useTheme';

const AuroraMeshGradient: React.FC = () => {
  const { designSystem } = useTheme();

  if (designSystem !== 'aurora') {
    return null;
  }

  return (
    <div className="aurora-mesh-gradient">
      <div className="aurora-orb-rose" />
    </div>
  );
};

export default AuroraMeshGradient;
