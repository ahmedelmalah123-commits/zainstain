import React, { useState } from 'react';

/**
 * NeoTimelineChart - Neo-Brutalist SVG Line & Area Timeline Chart
 * Displays 7-day momentum, daily registration counts, and percentage growth/dip between days.
 */
export default function NeoTimelineChart({
  data = [],
  title = 'مسار وزخم حركة التسجيلات (7 أيام)',
  subtitle,
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="neo-timeline-card">
        <h4 className="chart-card-title">{title}</h4>
        <div className="chart-empty-state">لا توجد بيانات زمنية كافية حالياً</div>
      </div>
    );
  }

  const width = 680;
  const height = 220;
  const padding = { top: 32, right: 36, bottom: 44, left: 48 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map((d) => d.count || d.cumulative || 0), 1200);
  const minVal = 0;

  const getX = (idx) => {
    if (data.length <= 1) return padding.left + innerWidth / 2;
    return padding.left + (idx / (data.length - 1)) * innerWidth;
  };

  const getY = (val) => {
    const norm = (val - minVal) / (maxVal - minVal);
    return padding.top + innerHeight - norm * innerHeight;
  };

  const points = data.map((d, i) => ({
    x: getX(i),
    y: getY(d.count || 0),
    ...d,
  }));

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`;

  const activeItem = hoveredIdx !== null ? points[hoveredIdx] : points[points.length - 1];

  return (
    <div className="neo-timeline-card">
      <div className="chart-header">
        <div>
          <h4 className="chart-card-title">{title}</h4>
          {subtitle && <span className="chart-card-subtitle">{subtitle}</span>}
        </div>

        {activeItem && (
          <div className="timeline-active-kpi-chip">
            <span className="chip-day">{activeItem.day || activeItem.date}:</span>
            <strong className="chip-count font-mono">{activeItem.count?.toLocaleString('ar-EG')} تسجيل</strong>
            {activeItem.rate && <span className="chip-rate font-mono">({activeItem.rate})</span>}
            <span className="chip-cumulative font-mono">تراكمي: {activeItem.cumulative?.toLocaleString('ar-EG')}</span>
          </div>
        )}
      </div>

      <div className="neo-timeline-svg-wrap">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="neo-timeline-svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffe15a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffe15a" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = padding.top + innerHeight * (1 - pct);
            const val = Math.round(minVal + (maxVal - minVal) * pct);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="rgba(23, 23, 23, 0.12)"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fontFamily="'Space Mono', monospace"
                  fontWeight="600"
                  fill="#555"
                >
                  {val.toLocaleString('ar-EG')}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#timelineGradient)" />

          {/* Line Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points & Interactive Nodes */}
          {points.map((p, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Vertical hover guide line */}
                {isHovered && (
                  <line
                    x1={p.x}
                    y1={padding.top}
                    x2={p.x}
                    y2={padding.top + innerHeight}
                    stroke="var(--ink)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}

                {/* Point circle */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? '8' : '6'}
                  fill={isHovered ? 'var(--yellow)' : 'var(--white)'}
                  stroke="var(--ink)"
                  strokeWidth="3"
                  className="timeline-point"
                />

                {/* Point Value label above circle */}
                <text
                  x={p.x}
                  y={p.y - 12}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="'Space Mono', monospace"
                  fontWeight="700"
                  fill="var(--ink)"
                >
                  {p.count?.toLocaleString('ar-EG')}
                </text>

                {/* Day label below chart */}
                <text
                  x={p.x}
                  y={height - 12}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="'Cairo', sans-serif"
                  fontWeight={isHovered ? '700' : '600'}
                  fill={isHovered ? 'var(--blue)' : '#333'}
                >
                  {p.day || p.date}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Daily Breakdown Chips Footer */}
      <div className="timeline-breakdown-cards">
        {data.map((item, idx) => {
          const isSelected = hoveredIdx === idx;
          return (
            <div
              key={idx}
              className={`timeline-day-card ${isSelected ? 'is-selected' : ''}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="day-name">{item.day || item.date}</div>
              <div className="day-count font-mono">{item.count?.toLocaleString('ar-EG')}</div>
              {item.rate && (
                <div
                  className={`day-rate font-mono ${
                    item.rate.startsWith('+') ? 'positive' : 'negative'
                  }`}
                >
                  {item.rate}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
