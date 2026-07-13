"use client";

import { useState } from "react";

export default function GovBanner({ settings }) {
  const [expanded, setExpanded] = useState(false);
  const s = settings ?? {};

  return (
    <div className="w-full bg-[#f0f0f0] text-[13px] text-[#1b1b1b]">
      <div className="flex max-w-6xl items-center gap-2 px-4 py-1.5">
        <img
          src="/Other/us_flag_small.png"
          alt=""
          aria-hidden="true"
          width="20"
          height="14"
          className="shrink-0"
        />
        <span>
          {s.bannerText}{" "}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="font-medium text-[#0071a2] underline decoration-1 underline-offset-2"
            aria-expanded={expanded}
          >
            {s.bannerToggleLabel}
            <span aria-hidden="true" className="ml-1">
              {expanded ? "▲" : "▼"}
            </span>
          </button>
        </span>
      </div>

      {expanded && (
        <div className="border-t border-[#d6d6d6] bg-white">
          <div className="flex max-w-6xl flex-wrap gap-10 px-4 py-4">
            <div className="flex max-w-[440px] gap-3">
              <img
                src="/Other/icon-dot-gov.svg"
                alt=""
                aria-hidden="true"
                className="mt-0.5 h-12 w-12 shrink-0"
              />
              <p className="text-lg text-[#3d3d3d]">
                <strong className="text-[#1b1b1b]">{s.dotGovHeading}</strong>{" "}
                {s.dotGovBody}
              </p>
            </div>
            <div className="flex max-w-[440px] gap-3">
              <img
                src="/Other/icon-https.svg"
                alt=""
                aria-hidden="true"
                className="mt-0.5 h-12 w-12 shrink-0"
              />
              <p className="text-lg text-[#3d3d3d]">
                <strong className="text-[#1b1b1b]">{s.httpsHeading}</strong>{" "}
                {s.httpsBody}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
