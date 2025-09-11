import React from 'react';

export type PriorityItem = { item: string; impacto: string; urgencia: string };

interface Props {
  items: PriorityItem[];
}

const colWidths = [160, 100, 100];
const rowHeight = 30;

export default function PriorityTableSVG({ items }: Props) {
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);
  const rows = items.length + 1; // header + items
  const height = rows * rowHeight;
  const colPositions = [0, colWidths[0], colWidths[0] + colWidths[1], totalWidth];

  return (
    <svg width={totalWidth} height={height} xmlns="http://www.w3.org/2000/svg">
      {/* grid lines */}
      {Array.from({ length: rows + 1 }).map((_, r) => (
        <line
          key={`h-${r}`}
          x1={0}
          y1={r * rowHeight}
          x2={totalWidth}
          y2={r * rowHeight}
          stroke="#000"
        />
      ))}
      {colPositions.map((x, i) => (
        <line key={`v-${i}`} x1={x} y1={0} x2={x} y2={height} stroke="#000" />
      ))}
      {/* headers */}
      <text x={4} y={rowHeight / 2} dominantBaseline="middle">
        Item
      </text>
      <text
        x={colPositions[1] + 4}
        y={rowHeight / 2}
        dominantBaseline="middle"
      >
        Impacto
      </text>
      <text
        x={colPositions[2] + 4}
        y={rowHeight / 2}
        dominantBaseline="middle"
      >
        Urgência
      </text>
      {/* data rows */}
      {items.map((p, i) => (
        <g key={i}>
          <text x={4} y={(i + 1.5) * rowHeight} dominantBaseline="middle">
            {p.item}
          </text>
          <text
            x={colPositions[1] + 4}
            y={(i + 1.5) * rowHeight}
            dominantBaseline="middle"
          >
            {p.impacto}
          </text>
          <text
            x={colPositions[2] + 4}
            y={(i + 1.5) * rowHeight}
            dominantBaseline="middle"
          >
            {p.urgencia}
          </text>
        </g>
      ))}
    </svg>
  );
}

