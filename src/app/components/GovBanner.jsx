"use client";

import { useState } from "react";

export default function GovBanner() {
  const [expanded, setExpanded] = useState(false);

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
          An official website of the United States government{" "}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="font-medium text-[#0071a2] underline decoration-1 underline-offset-2"
            aria-expanded={expanded}
          >
            Here&apos;s how you know
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
                <strong className="text-[#1b1b1b]">
                  Official websites use .gov
                </strong>{" "}
                A <strong>.gov</strong> website belongs to an official
                government organization in the United States.
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
                <strong className="text-[#1b1b1b]">The site is secure.</strong>{" "}
                A <strong>lock</strong> ( 🔒 ) or <strong>https://</strong>{" "}
                means you&apos;ve safely connected to the .gov website. Share
                sensitive information only on official, secure websites.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
