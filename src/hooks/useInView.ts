import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + boolean indicating whether the referenced element is
 * within (or near) the viewport. Used to pause/resume <Canvas> render
 * loops so hero scenes don't burn GPU after the user scrolls past.
 *
 * Defaults assume scrolling — `rootMargin` is generous so the scene
 * starts rendering slightly before it enters view (avoids a visible
 * freeze frame).
 */
export function useInView<T extends Element>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  // Default true so SSR / pre-IO render still animates (avoids a static
  // first paint flicker before the observer attaches).
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

export default useInView;
