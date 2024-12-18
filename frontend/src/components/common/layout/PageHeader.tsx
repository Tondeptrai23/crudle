import React from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  items: NavItem[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ items }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
    {items.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && <span>/</span>}
        {item.to ? (
          <Link to={item.to} className="hover:text-gray-900">
            {item.label}
          </Link>
        ) : (
          <span className="text-gray-900">{item.label}</span>
        )}
      </React.Fragment>
    ))}
  </div>
);

export default PageHeader;
