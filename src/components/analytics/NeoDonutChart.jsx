import React, { useState } from 'react';

/**
 * NeoDonutChart - Neo-Brutalist SVG Donut Chart
 * Props:
 * - data: Array<{ label, count, percentage, color }>
 * - title: string
 * - centerLabel: string
 * - centerValue: string|number
 * - onSliceClick: (item) => void
 * - activeValue: string
 */
export default function NeoDonutChart({
  data = [],
  title,
  centerLabel = 'الإجمالي',
  centerValue,
  onSliceClick,
  activeValue,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const total = data.reduce((acc, d) => acc + Number(d.count || 0), 0);
  const size = 220;
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate segment offsets
  let cumulativePercent = 0;
  const segments = data.map((item, idx) => {
    const itemTotal = Number(item.count || 0);
    const percent = total > 0 ? itemTotal / total : 0;
    const strokeDasharray = `${percent * circumference} ${circumference}`;
    const strokeDashoffset = -cumulativePercent * circumference;
    cumulativePercent += percent;

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
      idx,
    };
  });

  const displayCenterValue =
    hoveredIndex !== null
      ? data[hoveredIndex]?.count
      : centerValue !== undefined
      ? centerValue
      : total;

  const displayCenterLabel =
    hoveredIndex !== null ? data[hoveredIndex]?.label : centerLabel;

  return (
    <div className="neo-donut-card">
      {title && <h4 className="chart-card-title">{title}</h4>}

      <div className="neo-donut-container">
        {/* SVG Donut */}
        <div className="neo-donut-svg-wrap">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="neo-donut-svg"
          >
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--paper)"
              strokeWidth={strokeWidth}
            />

            {/* Slices */}
            {segments.map((seg, idx) => {
              const isHovered = hoveredIndex === idx;
              const isActive = activeValue && activeValue === seg.label;

              return (
                <circle
                  key={idx}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={seg.color || 'var(--yellow)'}
                  strokeWidth={isHovered || isActive ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={seg.strokeDasharray}
                  strokeDashoffset={seg.strokeDashoffset}
                  className={`neo-donut-slice ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => onSliceClick && onSliceClick(seg.label)}
                  style={{
                    cursor: onSliceClick ? 'pointer' : 'default',
                    transition: 'stroke-width 0.15s ease, opacity 0.15s ease',
                    opacity: hoveredIndex !== null && !isHovered ? 0.7 : 1,
                  }}
                />
              );
            })}

            {/* Inner border separator for neo-brutalist crisp look */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius - strokeWidth / 2}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2.5"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius + strokeWidth / 2}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2.5"
            />
          </svg>

          {/* Center Info Text */}
          <div className="neo-donut-center">
            <span className="neo-donut-value font-mono">
              {Number(displayCenterValue || 0).toLocaleString('ar-EG')}
            </span>
            <span className="neo-donut-label">{displayCenterLabel}</span>
          </div>
        </div>

        {/* Legend */}
        <div className="neo-donut-legend">
          {data.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const isActive = activeValue && activeValue === item.label;

            return (
              <button
                type="button"
                key={idx}
                className={`neo-legend-item ${isActive ? 'active-filter' : ''}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => onSliceClick && onSliceClick(item.label)}
                title="اضغط لتصفية قائمة المسجلين بهذا التصنيف"
              >
                <span
                  className="legend-color-box"
                  style={{ backgroundColor: item.color || 'var(--yellow)' }}
                />
                <span className="legend-name">{item.label}</span>
                <span className="legend-count font-mono">
                  {Number(item.count || 0).toLocaleString('ar-EG')}
                </span>
                <span className="legend-pct font-mono">{item.percentage}%</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
