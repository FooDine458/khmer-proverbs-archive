"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 5000;

export default function HeroFigure({ entries }) {
  const slides = entries.filter((entry) => entry.image);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    // Auto-advance is a WCAG "moving content" concern for some viewers, so
    // reduced-motion users get manual dots only, no timer.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Depending on `index` restarts the countdown on every change, manual
    // clicks included, so a dot click gets the full interval before the
    // next auto-advance instead of being overridden moments later.
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [index, paused, slides.length]);

  if (!slides.length) return null;
  const current = slides[index];

  return (
    <figure
      className="hero-figure"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-figure-stack">
        {slides.map((entry, i) => (
          <img
            key={entry.id}
            src={entry.image}
            alt={entry.imageAlt || entry.englishName}
            aria-hidden={i === index ? undefined : true}
            className={i === index ? "hero-figure-slide is-active" : "hero-figure-slide"}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      <figcaption>
        <span>
          <span className="hero-figure-khmer" lang="km">
            {current.khmerName}
          </span>{" "}
          <span className="hero-figure-names">
            {current.romanization}, {current.englishName}
          </span>
        </span>
        <span className="metadata">NO. {String(current.number).padStart(2, "0")}</span>
      </figcaption>
      {slides.length > 1 ? (
        <div className="hero-figure-dots" role="tablist" aria-label="Featured object">
          {slides.map((entry, i) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${entry.englishName}`}
              className={i === index ? "hero-dot is-active" : "hero-dot"}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </figure>
  );
}
