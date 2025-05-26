import { useRef, useState } from "react";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageZoom({ src, alt, className }: ImageZoomProps) {
  const zoom = 1.8;
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setOrigin({ x: 50, y: 50 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ overflow: "hidden", cursor: isHovering ? "zoom-in" : "auto" }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          transition: "transform 0.2s, transform-origin 0.2s",
          transform: isHovering ? `scale(${zoom})` : "scale(1)",
          transformOrigin: `${origin.x}% ${origin.y}%`,
        }}
        draggable={false}
      />
    </div>
  );
}
