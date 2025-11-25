import React from 'react';

const StatCard = ({ label, value, trend, icon: Icon, variant = 'primary' }) => {
  return (
    <div className={`stat-card stat-${variant}`}>
      <div className="stat-left">
        {Icon && <Icon size={20} className="stat-icon" />}
      </div>
      <div className="stat-body">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
        {trend && <div className="stat-trend">{trend}</div>}
      </div>
    </div>
  );
};

export default StatCard;
