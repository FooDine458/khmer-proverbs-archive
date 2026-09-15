"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "googtrans";

function readLangCookie() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function writeLangCookie(value) {
  const expires = value ? "" : "expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
  document.cookie = `${COOKIE_NAME}=${value}; ${expires}path=/`;
  document.cookie = `${COOKIE_NAME}=${value}; ${expires}path=/; domain=.${window.location.hostname}`;
}

export default function LanguageToggle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setLang(readLangCookie() === "/en/km" ? "km" : "en");

    if (window.google?.translate?.TranslateElement) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "km,en", autoDisplay: false },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const switchTo = (next) => {
    writeLangCookie(next === "en" ? "" : `/en/${next}`);
    window.location.reload();
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} />
      <button
        type="button"
        className="theme-toggle"
        onClick={() => switchTo(lang === "en" ? "km" : "en")}
        aria-label={`Language: ${lang === "en" ? "English" : "Khmer"}. Click to switch.`}
      >
        <span className="theme-toggle-label">{lang === "en" ? "ខ្មែរ" : "English"}</span>
      </button>
    </>
  );
}
