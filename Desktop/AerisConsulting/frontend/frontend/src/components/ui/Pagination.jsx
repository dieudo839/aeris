import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 16px',
      borderTop: '1px solid var(--border)',
      gap: '16px',
      flexWrap: 'wrap'
    }}>
      <div style={{
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
        fontWeight: 500
      }}>
        Affichage de <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{startItem}</span> à{' '}
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{endItem}</span> sur{' '}
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{totalItems}</span> produits
      </div>

      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        {/* Première page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="btn-icon"
          title="Première page"
          style={{
            opacity: currentPage === 1 ? 0.5 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronsLeft size={18} />
        </button>

        {/* Page précédente */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn-icon"
          title="Page précédente"
          style={{
            opacity: currentPage === 1 ? 0.5 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Numéros de page */}
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              style={{
                padding: '8px 12px',
                color: 'var(--text-muted)',
                fontSize: '0.95rem'
              }}
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: page === currentPage ? '1px solid var(--primary-blue)' : '1px solid var(--border)',
                background: page === currentPage ? 'var(--primary-blue)' : 'white',
                color: page === currentPage ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                fontWeight: page === currentPage ? 600 : 500,
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                minWidth: '40px'
              }}
              onMouseEnter={(e) => {
                if (page !== currentPage) {
                  e.target.style.background = 'var(--bg)';
                  e.target.style.borderColor = 'var(--primary-blue)';
                }
              }}
              onMouseLeave={(e) => {
                if (page !== currentPage) {
                  e.target.style.background = 'white';
                  e.target.style.borderColor = 'var(--border)';
                }
              }}
            >
              {page}
            </button>
          )
        ))}

        {/* Page suivante */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn-icon"
          title="Page suivante"
          style={{
            opacity: currentPage === totalPages ? 0.5 : 1,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronRight size={18} />
        </button>

        {/* Dernière page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="btn-icon"
          title="Dernière page"
          style={{
            opacity: currentPage === totalPages ? 0.5 : 1,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;