import { FC, useMemo } from "react";

import { PlanetType } from "@/api/planet/types.ts";

const COLORS_BIOME: Record<PlanetType, string[]> = {
  FROZEN: ["#a0b9ffff", "#5f8affff", "#4a6ad1ff"],
  ROCKY: ["#f1ffa0ff", "#ffbf5fff", "#d1a64aff"],
  TOXIC: ["#a0ffc0ff", "#5fffcfff", "#4ad19dff"],
  BLACKHOLE: ["#000000ff", "#202020ff", "#fff677ff"],
  LUSH: ["#f18686ff", "#b9dd37ff", "#309935ff"],
  EXOTIC: ["#bff186ff", "#37dd98ff", "#32e0e6ff"],
};

interface Props {
  size: number;
  biome: PlanetType;
}

const PlanetIcon: FC<Props> = ({ size = 24, biome }) => {
  const [color1, color2, color3] = COLORS_BIOME[biome];

  // Создаем уникальный ID для градиента
  const gradientId = useMemo(
    () => `planetGradient-${biome}-${Math.random().toString(36).substr(2, 9)}`,
    [biome],
  );

  return (
    <svg
      height={size}
      viewBox="0 0 400 400"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor={color1} />
          <stop offset="70%" stopColor={color2} />
          <stop offset="100%" stopColor={color3} />
        </radialGradient>

        <linearGradient id="ringGradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#ddd" />
          <stop offset="30%" stopColor="#fff" />
          <stop offset="50%" stopColor="#ccc" />
          <stop offset="70%" stopColor="#fff" />
          <stop offset="100%" stopColor="#aaa" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="200" fill={`url(#${gradientId})`} r="120" />

      <circle cx="150" cy="140" fill="#ffffff" opacity="0.4" r="35" />
      <circle cx="145" cy="135" fill="#ffffff" opacity="0.8" r="15" />

      <ellipse
        cx="200"
        cy="160"
        fill="#ffffff"
        opacity="0.2"
        rx="112"
        ry="10"
      />
      <ellipse
        cx="200"
        cy="200"
        fill="#ffffff"
        opacity="0.3"
        rx="118"
        ry="14"
      />
      <ellipse
        cx="200"
        cy="240"
        fill="#ffffff"
        opacity="0.25"
        rx="112"
        ry="10"
      />
    </svg>
  );
};

export default PlanetIcon;
