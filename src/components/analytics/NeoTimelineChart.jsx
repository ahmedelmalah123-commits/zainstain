import React, { useState } from 'react';

/**
 * NeoTimelineChart - Neo-Brutalist SVG Line & Area Timeline Chart
 * Props:
 * - data: Array<{ date, count, cumulative }>
 * - title: string
 * - subtitle: string
 */
export default function NeoTimelineChart({
  data = [],
  title = 'مسار نمو التسجيلات',
  subtitle,
}) {
  const [activePoint, setActivePoint] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="neo-timeline-card">
        <h4 className="chart-card-title">{title}</h4>
        <div className="chart-empty-state">لا توجد بيانات زمنية كافية حالياً</div>
      </div>
    );
  }

  const width = 640;
  const height = 180;
  const padding = { top: 24, right: 30, bottom: 36, left: 40 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map((d) => d.cumulative || d.count || 0), 10);
  const minVal = 0;

  // Coordinate mapper
  const getX = (idx) => {
    if (data.length <= 1) return padding.left + innerWidth / 2;
    return padding.left + (idx / (data.length - 1)) * innerWidth;
  };

  const getY = (val) => {
    const norm = (val - minVal) / (maxVal - minVal);
    return padding.top + innerHeight - norm * innerHeight;
  };

  // Generate SVG Path
  const points = data.map((d, i) => ({
    x: getX(i),
    y: getY(d.cumulative || d.count),
    ...d,
  }));

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`;

  return (
    <div className="neo-timeline-card">
      <div className="chart-header">
        <div>
          <h4 className="chart-card-title">{title}</h4>
          {subtitle && <span className="chart-card-subtitle">{subtitle}</span>}
        </div>
        {activePoint && (
          <div className="timeline-tooltip-badge font-mono">
            {activePoint.date}: <strong>{activePoint.cumulative || activePoint.count} مسجل</strong>
          </div>
        )}
      </div>

      <div className="neo-timeline-svg-wrap">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="neo-timeline-svg"
          preserveAspectRatio="none"
        >
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
                  fill="#666"
                >
                  {val.toLocaleString('ar-EG')}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="var(--yellow)" fillOpacity="0.45" />

          {/* Line Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle
                cx={p.x}
                cy={p.y}
                r="6"
                fill="var(--white)"
                stroke="var(--ink)"
                strokeWidth="3"
                className="timeline-point"
                onMouseEnter={() => setActivePoint(p)}
                onMouseLeave={() => setActivePoint(null)}
                style={{ cursor: 'pointer' }}
              />
              {/* Date label at bottom */}
              {(data.length <= 8 || idx === 0 || idx === data.length - 1 || idx % 2 === 0) && (
                <text
                  x={p.x}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="'Cairo', sans-serif"
                  fontWeight="600"
                  fill="#444"
                >
                  {p.date}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
