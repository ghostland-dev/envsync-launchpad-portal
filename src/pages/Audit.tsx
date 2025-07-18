import React from 'react';
import { ProductionAudit } from '@/components/audit/ProductionAudit';

const Audit: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <ProductionAudit />
    </div>
  );
};

export default Audit;