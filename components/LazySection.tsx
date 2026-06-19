"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazySectionProps = {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: string;
  className?: string;
};

export default function LazySection({
  children,
  rootMargin = "300px 0px",
  minHeight = "40vh",
  className,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Render if intersecting OR if the element is already scrolled past (above the viewport)
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {visible ? children : null}
    </div>
  );
}
