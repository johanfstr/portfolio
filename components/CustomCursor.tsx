/**
 * Disclaimer: This component is not entirely my own
 */

"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useMouse } from "@/hooks/use-mouse";
import { usePreloader } from "../preloader";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePathname } from "next/navigation";

const EMPTY = {} as {
  x: Function; y: Function; r?: Function; width?: Function;
  sx?: Function; sy?: Function; opacity?: Function; height?: Function;
};
function useInstance(value = {}) {
  const ref = useRef(EMPTY);
  if (ref.current === EMPTY) {
    ref.current = typeof value === "function" ? value() : value;
  }
  return ref.current;
}

function getScale(diffX: number, diffY: number) {
  return Math.min(Math.sqrt(diffX * diffX + diffY * diffY) / 735, 0.35);
}
function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getRekt(el: HTMLElement) {
  if (el.classList.contains("cursor-can-hover")) return el.getBoundingClientRect();
  if (el.parentElement?.classList.contains("cursor-can-hover")) return el.parentElement.getBoundingClientRect();
  if (el.parentElement?.parentElement?.classList.contains("cursor-can-hover")) return el.parentElement.parentElement.getBoundingClientRect();
  return null;
}

const CURSOR_DIAMETER = 40;

function ElasticCursor() {
  const pathname = usePathname();
  const isBlogPost = pathname.startsWith("/blogs/") && pathname !== "/blogs";
  const { loadingPercent, isLoading } = usePreloader();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const jellyRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { x, y } = useMouse();

  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance();

  // RAF ref for throttling the render loop
  const rafRef = useRef<number | null>(null);
  const isHoveringRef = useRef(isHovering);
  const isHiddenRef = useRef(isHidden);
  const isLoadingRef = useRef(isLoading);

  useEffect(() => { isHoveringRef.current = isHovering; }, [isHovering]);
  useEffect(() => { isHiddenRef.current = isHidden; }, [isHidden]);
  useEffect(() => { isLoadingRef.current = isLoading; }, [isLoading]);

  useLayoutEffect(() => {
    set.x = gsap.quickSetter(jellyRef.current, "x", "px");
    set.y = gsap.quickSetter(jellyRef.current, "y", "px");
    set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
    set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
    set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
    set.width = gsap.quickSetter(jellyRef.current, "width", "px");
    set.height = gsap.quickSetter(jellyRef.current, "height", "px");
    set.opacity = gsap.quickSetter([jellyRef.current, dotRef.current], "opacity");
  }, []);

  const scheduleLoop = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!set.width || !set.sx || !set.sy || !set.r) return;
      const rotation = getAngle(+vel.x, +vel.y);
      const scale = getScale(+vel.x, +vel.y);

      if (!isHoveringRef.current && !isLoadingRef.current) {
        set.x(pos.x);
        set.y(pos.y);
        set.width(40 + scale * 300);
        set.r(rotation);
        set.sx(1 + scale);
        set.sy(1 - scale * 2);
      } else {
        set.r(0);
      }
      set.opacity?.(isHiddenRef.current ? 0 : 1);
    });
  }, []);

  const [cursorMoved, setCursorMoved] = useState(false);

  useLayoutEffect(() => {
    if (isMobile) return;

    const setFromEvent = (e: MouseEvent) => {
      if (!jellyRef.current) return;
      if (!cursorMoved) setCursorMoved(true);

      const el = e.target as HTMLElement;
      const hoverElemRect = getRekt(el);

      if (hoverElemRect) {
        const rect = el.getBoundingClientRect();
        setIsHovering(true);
        gsap.to(jellyRef.current, { rotate: 0, duration: 0 });
        gsap.to(jellyRef.current, {
          width: el.offsetWidth + 20,
          height: el.offsetHeight + 20,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 10,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        });
      } else {
        gsap.to(jellyRef.current, { borderRadius: 40, width: CURSOR_DIAMETER, height: CURSOR_DIAMETER });
        setIsHovering(false);
      }

      const shouldHide = !!el.closest('[data-no-custom-cursor="true"]');
      setIsHidden(shouldHide);
      if (shouldHide) document.body.style.cursor = 'auto';

      const mx = e.clientX;
      const my = e.clientY;

      gsap.to(pos, {
        x: mx, y: my,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onUpdate: () => {
          // @ts-ignore
          vel.x = (mx - pos.x) * 1.2;
          // @ts-ignore
          vel.y = (my - pos.y) * 1.2;
        },
      });

      scheduleLoop();
    };

    if (!isLoading) window.addEventListener("mousemove", setFromEvent, { passive: true });
    return () => window.removeEventListener("mousemove", setFromEvent);
  }, [isLoading, scheduleLoop]);

  useEffect(() => {
    if (!jellyRef.current) return;
    jellyRef.current.style.height = "2rem";
    jellyRef.current.style.borderRadius = "1rem";
    jellyRef.current.style.width = loadingPercent * 2 + "vw";
  }, [loadingPercent]);

  useEffect(() => {
    document.body.style.cursor = 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, []);

  if (isMobile || isBlogPost) return null;

  return (
    <>
      <div
        ref={jellyRef}
        id="jelly-id"
        className={cn(
          `w-[${CURSOR_DIAMETER}px] h-[${CURSOR_DIAMETER}px] border-2 border-black dark:border-white`,
          "jelly-blob fixed left-0 top-0 rounded-lg z-[999] pointer-events-none will-change-transform",
          "translate-x-[-50%] translate-y-[-50%]"
        )}
        style={{ zIndex: 100020, backdropFilter: "invert(100%)" }}
      />
      <div
        ref={dotRef}
        className="w-3 h-3 rounded-full fixed translate-x-[-50%] translate-y-[-50%] pointer-events-none"
        style={{ top: y, left: x, backdropFilter: "invert(100%)", zIndex: 100020 }}
      />
    </>
  );
}

export default ElasticCursor;
