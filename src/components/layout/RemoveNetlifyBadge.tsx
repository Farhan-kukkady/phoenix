"use client";

import { useEffect } from "react";

export function RemoveNetlifyBadge() {
  useEffect(() => {
    const purge = () => {
      // Find any element containing "netlify" in tag, id, class, or attribute
      const candidates = document.querySelectorAll(
        '[id*="netlify"], [class*="netlify"], [data-netlify], netlify-drawer-root, #netlify-feedback-drawer'
      );
      candidates.forEach((el) => {
        try {
          el.remove();
        } catch (_) {
          (el as HTMLElement).style.display = "none";
        }
      });

      // Also check if any shadow roots or bottom-right floating bars contain Netlify
      document.body.querySelectorAll("div, iframe").forEach((el) => {
        const text = el.textContent || "";
        if (text.includes("Powered by Netlify") && el.children.length === 0) {
          const container = el.closest("div") || el;
          container.style.display = "none";
          container.style.opacity = "0";
          container.style.pointerEvents = "none";
        }
      });
    };

    purge();
    const interval = setInterval(purge, 500);
    const observer = new MutationObserver(purge);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return null;
}
