"use client";

import { useEffect, useRef, useState } from "react";

// Fades its children up once, the first time they scroll into view.
// `index` staggers items that appear together (see .reveal in globals.css).
export default function Reveal({ as: Tag = "div", className = "", index = 0, children }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${seen ? " is-visible" : ""} ${className}`.trim()}
      style={{ "--i": index }}
    >
      {children}
    </Tag>
  );
}
