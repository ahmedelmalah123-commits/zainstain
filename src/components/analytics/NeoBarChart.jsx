import React, { useState } from 'react';

/**
 * NeoBarChart - Neo-Brutalist Horizontal & Vertical Bar Chart
 * Props:
 * - data: Array<{ label, count, percentage, color, flag }>
 * - mode: 'horizontal' | 'vertical'
 * - title: string
 * - subtitle: string
 * - onBarClick: (label) => void
 * - activeValue: string
 * - maxItems: number
 */
export default function NeoBarChart({
  data = [],
  mode = 'horizontal',
  title,
  subtitle,
  onBarClick,
  activeValue,
  maxItems,
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const displayData = maxItems ? data.slice(0, maxItems) : data;
  const maxCount = Math.max(...displayData.map((d) => Number(d.count || 0)), 1);

  if (mode === 'vertical') {
    return (
      <div className="neo-barchart-card vertical">
        {title && (
          <div className="chart-header">
            <h4 className="chart-card-title">{title}</h4>
            {subtitle && <span className="chart-card-subtitle">{subtitle}</span>}
          </div>
        )}

        <div className="neo-vertical-grid">
          {displayData.map((item, idx) => {
            const count = Number(item.count || 0);
            const heightPercent = Math.max((count / maxCount) * 100, 8);
            const isActive = activeValue && activeValue === item.label;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                className={`neo-col-wrap ${isActive ? 'is-active' : ''}`}
                onClick={() => onBarClick && onBarClick(item.label)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ cursor: onBarClick ? 'pointer' : 'default' }}
                title="اضغط لتصفية المسجلين بهذه الفئة"
              >
                {/* Count badge on top */}
                <div className="neo-col-count font-mono">
                  {count.toLocaleString('ar-EG')}
                  <span className="neo-col-pct">{item.percentage}%</span>
                </div>

                {/* Column bar container */}
                <div className="neo-col-bar-bg">
                  <div
                    className="neo-col-bar-fill"
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: item.color || 'var(--yellow)',
                    }}
                  />
                </div>

                {/* Bottom label */}
                <span className="neo-col-label">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Horizontal Mode
  return (
    <div className="neo-barchart-card horizontal">
      {title && (
        <div className="chart-header">
          <h4 className="chart-card-title">{title}</h4>
          {subtitle && <span className="chart-card-subtitle">{subtitle}</span>}
        </div>
      )}

      <div className="neo-horiz-list">
        {displayData.map((item, idx) => {
          const count = Number(item.count || 0);
          const widthPercent = Math.max((count / maxCount) * 100, 6);
          const isActive = activeValue && activeValue === item.label;

          return (
            <div
              key={idx}
              className={`neo-bar-row ${isActive ? 'active-filter' : ''}`}
              onClick={() => onBarClick && onBarClick(item.label)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: onBarClick ? 'pointer' : 'default' }}
              title="اضغط لتصفية قائمة المسجلين بهذا التصنيف"
            >
              <div className="neo-bar-label-wrap">
                {item.code ? (
                  <span className="bar-code-pill font-mono">{item.code}</span>
                ) : item.flag ? (
                  <span className="bar-code-pill font-mono">{item.flag}</span>
                ) : null}
                <span className="bar-label-text">{item.label}</span>
              </div>

              <div className="neo-bar-track">
                <div
                  className="neo-bar-fill"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: item.color || 'var(--yellow)',
                  }}
                />
              </div>

              <div className="neo-bar-numbers font-mono">
                <span className="bar-count">{count.toLocaleString('ar-EG')}</span>
                <span className="bar-pct">({item.percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
