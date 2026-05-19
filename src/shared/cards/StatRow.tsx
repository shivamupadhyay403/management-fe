import React from "react";
import KpiCard from "./KpiCard";

interface StatItem {
  label?:string
  title?: string;
  value?: string | number;
  change?: string;
  icon?: React.ReactNode;
  color?: string;
  sub?:string
}

interface StatRowProps {
  items: StatItem[];
}

const StatRow: React.FC<StatRowProps> = ({ items }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        gap: 10,
        marginBottom: 20,
      }}
    >
      {items.map((it, i) => (
        <KpiCard key={i} {...it} />
      ))}
    </div>
  );
};

export default StatRow;