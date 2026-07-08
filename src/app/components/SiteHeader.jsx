"use client";

import { useState } from "react";
import TacticNote from "./TacticNote";

// Real uspto.gov .ql-icon rule: width/height 20px, color #0076a3.
const FIND_IT_FAST_ICON_PATHS = {
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><line x1="20" y1="20" x2="15.5" y2="15.5" /></>,
  apply: <><rect x="2" y="6" width="20" height="13" rx="1.5" /><line x1="6" y1="10" x2="6" y2="10" /><line x1="10" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="14" y2="10" /><line x1="18" y1="10" x2="18" y2="10" /><line x1="6" y1="14" x2="18" y2="14" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="4.2" ry="10" /><line x1="2" y1="12" x2="22" y2="12" /></>,
  fees: <><rect x="2" y="5" width="20" height="14" rx="1.5" /><line x1="2" y1="10" x2="22" y2="10" /><line x1="6" y1="15" x2="10" y2="15" /></>,
  guide: <><path d="M4 4h7a3 3 0 013 3v13a2.5 2.5 0 00-2.5-2.5H4z" /><path d="M20 4h-7a3 3 0 00-3 3v13a2.5 2.5 0 012.5-2.5H20z" /></>,
  track: <><path d="M14.7 6.3a4 4 0 01-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 015.4-5.4l-2.3 2.3-2-2z" /></>,
  check: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /><path d="M8.5 14.5l2 2 4-4" /></>,
  wait: <><path d="M6 3h12M6 21h12" /><path d="M7 3c0 6 5 6 5 9s-5 3-5 9M17 3c0 6-5 6-5 9s5 3 5 9" /></>,
};

function FindItFastIcon({ name }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0076a3"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {FIND_IT_FAST_ICON_PATHS[name]}
    </svg>
  );
}

const REAL_NAV_LINKS = [
  { label: "About Us", href: "https://www.uspto.gov/about-us" },
  { label: "Jobs", href: "https://www.uspto.gov/jobs/join-us" },
  { label: "Contact Us", href: "https://www.uspto.gov/about-us/contact-us" },
  { label: "MyUSPTO", href: "https://my.uspto.gov/" },
];

const SECONDARY_NAV = ["Patents", "Trademarks", "IP Policy", "Learning and Resources"];

// All hrefs point to the real uspto.gov domain (not the scam clone).
// Kept to each section's landing page rather than guessed subpaths, since we
// haven't verified every exact URL and don't want dead/incorrect links.
const MENUS = {
  "Patents": {
    href: "https://www.uspto.gov/patents",
    columns: [
      {
        heading: "Get started",
        links: [
          { label: "Patent basics", href: "https://www.uspto.gov/patents/basics" },
          { label: "Search our patent database", href: "https://www.uspto.gov/patents/search/patent-public-search" },
          { label: "How to apply", href: "https://www.uspto.gov/patents/basics/patent-process-overview" },
          { label: "Patent videos", href: "https://www.uspto.gov/learning-and-resources/uspto-videos#patents" },
        ],
      },
      {
        heading: "Apply for patent",
        links: [
          { label: "Apply online", href: "https://www.uspto.gov/patents/apply/patent-center" },
          { label: "Checking application status", href: "https://www.uspto.gov/patents/apply/checking-application-status/check-filing-status-your-patent-application" },
          { label: "Patent forms", href: "https://www.uspto.gov/patents/apply/forms" },
          { label: "Respond to office actions", href: "https://www.uspto.gov/patents/maintain/responding-office-actions" },
          { label: "Respond to notices", href: "https://www.uspto.gov/patents/apply/when-patent-applications-are-incomplete-or-missing-information" },
          { label: "File a petition", href: "https://www.uspto.gov/patents/apply/petitions" },
          { label: "Protect against scams", href: "https://www.uspto.gov/patents/fraud" },
        ],
      },
      {
        heading: "Maintain your patent",
        links: [
          { label: "How to renew", href: "https://www.uspto.gov/patents/maintain" },
          { label: "Maintenance fees", href: "https://www.uspto.gov/patents/basics/manage#fees" },
          { label: "Patent litigation", href: "https://www.uspto.gov/patents/basics/manage#infringement" },
          { label: "Correct your patent", href: "https://www.uspto.gov/patents/maintain/data-management-services" },
          { label: "Transfer ownership", href: "https://www.uspto.gov/patents/maintain/patents-assignments-change-search-ownership" },
        ],
      },
    ],
    boxHeading: "Patent practitioners",
    boxLinks: [
          { label: "Patent Center", href: "https://www.uspto.gov/patents/apply/patent-center" },
          { label: "Patent forms", href: "https://www.uspto.gov/patents/apply/forms" },
          { label: "Patent fees", href: "https://www.uspto.gov" },
          { label: "Order certified copies", href: "https://certifiedcopycenter.uspto.gov/" },
          { label: "MPEP manual", href: "https://www.uspto.gov/web/offices/pac/mpep/index.html" },
          { label: "Open Data Portal", href: "https://data.uspto.gov/home" },
          { label: "International patent filings", href: "https://www.uspto.gov/patents/basics/international-patent-cooperation" },
          { label: "Request reexamination", href: "https://www.uspto.gov/about-us/organizational-offices/office-commissioner-patents/central-reexamination-unit" },
          { label: "Patent Trial and Appeal Board", href: "https://www.uspto.gov/patents/ptab" },
        ],
  },
  "Trademarks": {
    href: "https://www.uspto.gov/trademarks",
    columns: [
      {
        heading: "Get started",
        links: [
          { label: "Learn about searching", href: "https://www.uspto.gov/trademarks/search" },
          { label: "Trademark basics", href: "https://www.uspto.gov/trademarks/basics" },
          { label: "Search our trademark database", href: "https://tmsearch.uspto.gov/" },
          { label: "How to apply", href: "https://www.uspto.gov/patents/basics/patent-process-overview" },
          { label: "Trademark videos", href: "https://www.uspto.gov/trademarks/videos#type-trademark-basics" },
        ],
      },
      {
        heading: "Apply to register",
        links: [
          { label: "Apply online", href: "https://www.uspto.gov/patents/apply/patent-center" },
          { label: "Checking application status & viewing documents", href: "https://www.uspto.gov/trademarks/apply/check-status-view-documents" },
          { label: "All trademark forms", href: "https://www.uspto.gov/trademarks/apply/index-all-teas-forms" },
          { label: "Respond to office actions", href: "https://www.uspto.gov/patents/maintain/responding-office-actions" },
          { label: "Protect against scams", href: "https://www.uspto.gov/patents/fraud" },
        ],
      },
      {
        heading: "Maintain your trademark",
        links: [
          { label: "How to renew", href: "https://www.uspto.gov/patents/maintain" },
          { label: "Maintenance forms", href: "https://www.uspto.gov/trademarks/maintain" },
          { label: "Trademark litigation", href: "https://www.uspto.gov/trademarks/been-sued-or-received-cease-and-desist-letter-answers-common-questions-about-trademark" },
          { label: "Transferring ownership", href: "https://www.uspto.gov/trademarks/trademark-assignments-change-search-ownership" },
          { label: "Post-registration audits", href: "https://www.uspto.gov/trademarks/maintain/post-registration-audit-program" },
        ],
      },
    ],
    boxHeading: "Trademark practitioners",
    boxLinks: [
          { label: "Trademark Center", href: "https://trademarkcenter.uspto.gov/" },
          { label: "ID manual", href: "https://idm-tmng.uspto.gov/id-master-list-public.html" },
          { label: "TEAS forms", href: "https://www.uspto.gov/trademarks/apply/index-all-teas-forms" },
          { label: "Request expungement or reexamination proceeding", href: "https://www.uspto.gov/trademarks/protect/requesting-expungement-or-reexamination-proceeding" },
          { label: "Check status in TSDR", href: "https://tsdr.uspto.gov/" },
          { label: "Madrid protocol international protection", href: "https://www.uspto.gov/ip-policy/international-protection/madrid-protocol" },
          { label: "Trademark Trial and Appeal Board", href: "https://www.uspto.gov/trademarks/ttab" },
          { label: "Order certified copies", href: "https://certifiedcopycenter.uspto.gov/" },
        ],
  },
  "IP Policy": {
    href: "https://www.uspto.gov/ip-policy",
    columns: [
      {
        heading: "IP policy",
        links: [
          { label: "Patent policy", href: "https://www.uspto.gov/ip-policy/patent-policy" },
          { label: "Industrial design policy", href: "https://www.uspto.gov/ip-policy/industrial-design-policy" },
          { label: "Trademark policy", href: "https://www.uspto.gov/ip-policy/trademark-policy" },
          { label: "Copyright policy", href: "https://www.uspto.gov/ip-policy/copyright-policy" },
          { label: "Enforcement policy", href: "https://www.uspto.gov/ip-policy/enforcement-policy" },
          { label: "Trade secret policy", href: "https://www.uspto.gov/ip-policy/trade-secret-policy" },
        ],
      },
      {
        heading: "International affairs",
        links: [
          { label: "IP Attaché Program", href: "https://www.uspto.gov/ip-policy/ip-attache-program" },
          { label: "China IP", href: "https://www.uspto.gov/ip-policy/china" },
          { label: "IPR toolkits", href: "https://www.uspto.gov/ip-policy/ipr-toolkits" },
          { label: "International intergovernmental organizations", href: "https://www.uspto.gov/ip-policy/international-intergovernmental-organizations" },
        ],
      },
      {
        heading: "IP research and training",
        links: [
          { label: "Economic research", href: "https://www.uspto.gov/ip-policy/economic-research" },
          { label: "Global Intellectual Property Academy", href: "https://www.uspto.gov/ip-policy/global-intellectual-property-academy" },
        ],
      },
    ],
    boxHeading: "Tools & links",
    boxLinks: [
          { label: "Legislative resources", href: "https://www.uspto.gov/ip-policy/legislative-resources" },
          { label: "IPR toolkits", href: "https://www.uspto.gov/ip-policy/ipr-toolkits" },
          { label: "IP policy events", href: "https://www.uspto.gov/ip-policy/ip-policy-events" },
          { label: "More tools & links", href: "https://www.uspto.gov/ip-policy" },
        ],
  },
  "Learning and Resources": {
    href: "https://www.uspto.gov/learning-resources",
    columns: [
      {
        heading: "Resources by audience",
        links: [
          { label: "Attorneys, agents & paralegals", href: "https://www.uspto.gov/learning-and-resources/attorneys-agents-and-paralegals" },
          { label: "Inventors & entrepreneurs", href: "https://www.uspto.gov/learning-and-resources/inventors-entrepreneurs-resources" },
          { label: "Kids & educators", href: "https://www.uspto.gov/learning-and-resources/kids-educators" },
          { label: "Media", href: "https://www.uspto.gov/about-us/news-updates" },
          { label: "Researchers & librarians", href: "https://www.uspto.gov/learning-and-resources/patent-trademark-resource-centers" },
          { label: "Patent & trademark practitioners", href: "https://www.uspto.gov/learning-and-resources/patent-and-trademark-practitioners" },
          { label: "IP awards and recognition", href: "https://www.uspto.gov/learning-and-resources/honoring-innovation" },
        ],
      },
      {
        heading: "Getting started",
        links: [
          { label: "Create an account", href: "https://www.uspto.gov/about-us/usptogov-account" },
          { label: "General FAQs", href: "https://www.uspto.gov/learning-and-resources/general-faqs" },
          { label: "IP Identifier", href: "https://ipidentifier.uspto.gov/" },
          { label: "Glossary of terms", href: "https://www.uspto.gov/learning-and-resources/glossary" },
          { label: "Video Learning Center", href: "https://www.uspto.gov/learning-and-resources/uspto-videos" },
          { label: "Access free services", href: "https://www.uspto.gov/learning-and-resources/access-our-free-services" },
          { label: "Inspiring stories of innovation", href: "https://www.uspto.gov/learning-and-resources/innovation-inspiration" },
        ],
      },
      {
        heading: "Publications & data",
        links: [
          { label: "Open data portal", href: "https://data.uspto.gov/home" },
          { label: "Federal Register Notices", href: "https://www.uspto.gov/learning-and-resources/federal-register" },
          { label: "Official Gazette", href: "https://www.uspto.gov/learning-and-resources/official-gazette" },
          { label: "XML resources", href: "https://www.uspto.gov/learning-and-resources/xml-resources" },
          { label: "Classification", href: "https://www.uspto.gov/patents/search/classification-standards-and-development" },
          { label: "Guidance documents", href: "https://www.uspto.gov/guidance" },
          { label: "Statistics and dashboards", href: "https://www.uspto.gov/learning-and-resources/data-and-statistics" },
        ],
      },
    ],
    boxHeading: "Tools & links",
    boxLinks: [
          { label: "Fees and payment", href: "https://www.uspto.gov/learning-and-resources/fees-and-payment" },
          { label: "System availability", href: "https://www.uspto.gov/system-status" },
          { label: "Training and events", href: "https://www.uspto.gov/about-us/events" },
          { label: "Operational status", href: "https://www.uspto.gov/learning-and-resources/operating-status" },
          { label: "More tools & links", href: "https://www.uspto.gov/learning-resources" },
        ],
  },
};

const GENERIC = "https://www.uspto.gov";

const FIND_IT_FAST = {
  columns: [
    {
      heading: "Patents",
      items: [
        {
          icon: "search",
          title: "Search for patents",
          links: [
            { label: "PPUBS", href: "https://ppubs.uspto.gov/" },
            { label: "Open Data Portal", href: GENERIC },
          ],
        },
        {
          icon: "apply",
          title: "Apply for a patent",
          links: [
            { label: "Patent Center", href: "https://patentcenter.uspto.gov/" },
            { label: "Forms", href: GENERIC },
            { label: "Status", href: GENERIC },
          ],
        },
        {
          icon: "globe",
          title: "Access international patent data",
          links: [{ label: "Global Dossier", href: GENERIC }],
        },
        {
          icon: "fees",
          title: "View and pay fees",
          links: [
            { label: "Patent Fees", href: GENERIC },
            { label: "Maintenance Fees", href: GENERIC },
          ],
        },
        {
          icon: "guide",
          title: "Review guides and manuals",
          links: [
            { label: "MPEP", href: GENERIC },
            { label: "Classification", href: GENERIC },
          ],
        },
        {
          icon: "track",
          title: "Track PTAB cases and decisions",
          links: [
            { label: "P-TACTS", href: GENERIC },
            { label: "PTAB DH", href: GENERIC },
          ],
        },
      ],
    },
    {
      heading: "Trademarks",
      items: [
        {
          icon: "search",
          title: "Search trademark database",
          links: [{ label: "Trademark search", href: "https://tmsearch.uspto.gov/" }],
        },
        {
          icon: "apply",
          title: "Apply for a trademark",
          links: [
            { label: "Trademark Center", href: GENERIC },
            { label: "TEAS forms", href: GENERIC },
          ],
        },
        {
          icon: "check",
          title: "Check status, documents, and certificates",
          links: [
            {
              label: "Trademark Status & Document Retrieval (TSDR)",
              href: "https://tsdr.uspto.gov/",
            },
          ],
        },
        {
          icon: "wait",
          title: "See current and target wait times",
          links: [{ label: "Trademark processing wait times", href: GENERIC }],
        },
        {
          icon: "guide",
          title: "Review guides and manuals",
          links: [
            { label: "TMEP", href: GENERIC },
            { label: "ID Manual", href: GENERIC },
            { label: "TMOG", href: GENERIC },
            { label: "TBMP", href: GENERIC },
          ],
        },
        {
          icon: "track",
          title: "File with Trademark Trial and Appeal Board",
          links: [
            { label: "TTAB Center", href: GENERIC },
            { label: "ESTTA", href: "https://estta.uspto.gov/" },
            { label: "TTABVUE", href: "https://ttabvue.uspto.gov/" },
          ],
        },
      ],
    },
  ],
  bottom: [
    {
      title: "Search recorded assignment and record ownership changes",
      label: "Assignment Center",
      href: "https://assignment.uspto.gov/",
    },
    {
      title: "Fee schedule and payment information",
      label: "Fees and Payment",
      href: GENERIC,
    },
    {
      title: "Current and planned system outages",
      label: "Systems status",
      href: GENERIC,
    },
  ],
};

export default function SiteHeader() {
  const [openMenu, setOpenMenu] = useState(null);
  const [pinned, setPinned] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const [mobileCategory, setMobileCategory] = useState(null);

  function previewOpen(item) {
    if (!pinned) setOpenMenu(item);
  }
  function previewClose() {
    if (!pinned) setOpenMenu(null);
  }
  function toggleClick(item) {
    if (pinned && openMenu === item) {
      setOpenMenu(null);
      setPinned(false);
    } else {
      setOpenMenu(item);
      setPinned(true);
    }
  }

  function handleSearchRedirect(e) {
    e.preventDefault();
    const query = e.currentTarget.elements.search.value;
    window.open(
      "https://www.uspto.gov/search/top?q=" + encodeURIComponent(query),
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <header>
      {/* Bars + sketch background live in one clipped wrapper so the image
          doesn't bleed past the nav into the tactic-note area below. */}
      <div className="relative">
        {/* Real uspto.gov theme uses this exact sketch image behind the header bars (#header background rule).
            No overflow-hidden here: backgrounds always clip to their own box already, and this wrapper also
            hosts the Find It Fast / mega-menu popovers which must be free to render outside its flow height. */}
        <div
          className="pointer-events-none absolute inset-0 bg-[#575757]"
          style={{
            backgroundImage: "url(/back-sketch.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left top",
            backgroundSize: "100% auto",
          }}
        />

        {/* Primary bar — real color: #323232. Unlike the sketch image (full viewport width),
            the dark fill only spans the centered content width, matching uspto.gov. */}
        <div className="relative">
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 bg-[#333333] px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-24 items-center justify-center rounded-[2px] bg-white text-xl font-bold tracking-tight text-[#1a1a1a]">
              uspto
              <span className="absolute -bottom-3.5 left-0 right-0 text-center text-[7px] font-bold text-[#b91c1c]">
                (recreation)
              </span>
            </div>
            <div className="hidden text-[13px] font-bold uppercase leading-tight tracking-wide text-white md:block">
              United States
              <br />
              Patent and Trademark Office <span className="align-super text-[8px]">®</span>
              <div className="mt-1 text-[10px] font-normal normal-case tracking-normal text-zinc-400">
                An Agency of the Department of Commerce
              </div>
            </div>
          </div>

          {/* Desktop: nav links + search. Hidden below md, replaced by the icon row. */}
          <div className="hidden flex-col items-end gap-2.5 md:flex">
            <nav aria-label="Primary" className="flex flex-wrap items-center gap-3 text-[13px] text-white">
              {REAL_NAV_LINKS.map((link, i) => (
                <span key={link.href} className="flex items-center gap-3">
                  {i > 0 && <span className="text-black">|</span>}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </nav>
            <form
              onSubmit={handleSearchRedirect}
              className="flex w-[500px] max-w-[80vw] gap-0"
              role="search"
            >
              <input
                name="search"
                type="text"
                placeholder="Search uspto.gov"
                className="w-full  border-0 bg-white px-5 py-2 text-sm text-black placeholder:text-black"
              />
              <button
                type="submit"
                aria-label="Search"
                className="flex items-center justify-center rounded-r-sm bg-[#0076a3] px-4 text-white hover:bg-[#0a5670]"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="2" />
                  <line x1="18" y1="18" x2="13.5" y2="13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </form>
          </div>

          {/* Mobile: Menu / Links / Search icon row. Shown only below md. */}
          <div className="flex items-center gap-6 md:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileOpen((v) => !v);
                setMobileSearchOpen(false);
                setMobileSection(null);
                setMobileCategory(null);
              }}
              className={"flex flex-col items-center gap-1 " + (mobileOpen ? "text-[#6cc4e0]" : "text-white")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-wide">Menu</span>
            </button>
            <button
              type="button"
              onClick={() => toggleClick("FindItFast")}
              className={"flex flex-col items-center gap-1 " + (openMenu === "FindItFast" ? "text-[#6cc4e0]" : "text-white")}
            >
              <svg width="20" height="20" viewBox="0 0 512 512" aria-hidden="true">
                <path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" />
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-wide">Links</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileSearchOpen((v) => !v);
                setMobileOpen(false);
              }}
              className={"flex flex-col items-center gap-1 " + (mobileSearchOpen ? "text-[#6cc4e0]" : "text-white")}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="2" />
                <line x1="18" y1="18" x2="13.5" y2="13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[11px] font-bold uppercase tracking-wide">Search</span>
            </button>
          </div>
        </div>

        {/* Mobile search, toggled by the Search icon above. */}
        {mobileSearchOpen && (
          <form
            onSubmit={handleSearchRedirect}
            className="flex gap-0 px-4 pb-4 md:hidden"
            role="search"
          >
            <input
              name="search"
              type="text"
              placeholder="Search uspto.gov"
              className="w-full border-0 bg-white px-3 py-2 text-sm text-black placeholder:text-zinc-500"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex items-center justify-center rounded-r-sm bg-[#0076a3] px-4 text-white hover:bg-[#0a5670]"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="2" />
                <line x1="18" y1="18" x2="13.5" y2="13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </form>
        )}
      </div>

      {/* Mobile expandable menu — drill-down: top level (Patents/Trademarks/...) ->
          category level (Get started/Apply/.../practitioners) -> leaf links, each
          with a "‹ Back" row, matching the real uspto.gov mobile nav. */}
      {mobileOpen && !mobileSection && (
        <div className="relative z-10 md:hidden">
          {SECONDARY_NAV.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMobileSection(item)}
              className="flex w-full items-center gap-2 border-b border-zinc-200 bg-white px-4 py-3 text-left text-[15px] font-semibold text-[#0076a3]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </button>
          ))}
          {REAL_NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-b border-zinc-200 bg-white px-4 py-3 pl-[30px] text-[15px] font-semibold text-[#0076a3]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Category level: "‹ Back", "[Section] Home", then each column + practitioners box as a row. */}
      {mobileOpen && mobileSection && !mobileCategory && (
        <div className="relative z-10 md:hidden">
          <button
            type="button"
            onClick={() => setMobileSection(null)}
            className="flex w-full items-center gap-2 border-b border-zinc-200 bg-white px-4 py-3 text-left text-[15px] font-semibold text-[#1a1a1a]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <a
            href={MENUS[mobileSection].href}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-b border-zinc-200 bg-white px-4 py-3 pl-[30px] text-[15px] font-semibold text-[#0076a3]"
          >
            {mobileSection} Home
          </a>
          {MENUS[mobileSection].columns.map((col) => (
            <button
              key={col.heading}
              type="button"
              onClick={() => setMobileCategory(col.heading)}
              className="flex w-full items-center gap-2 border-b border-zinc-200 bg-white px-4 py-3 text-left text-[15px] font-semibold text-[#0076a3]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {col.heading}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setMobileCategory(MENUS[mobileSection].boxHeading)}
            className="flex w-full items-center gap-2 border-b border-zinc-200 bg-white px-4 py-3 text-left text-[15px] font-semibold text-[#0076a3]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {MENUS[mobileSection].boxHeading}
          </button>
        </div>
      )}

      {/* Leaf level: "‹ Back" then the actual links for the chosen category. */}
      {mobileOpen && mobileSection && mobileCategory && (
        <div className="relative z-10 md:hidden">
          <button
            type="button"
            onClick={() => setMobileCategory(null)}
            className="flex w-full items-center gap-2 border-b border-zinc-200 bg-white px-4 py-3 text-left text-[15px] font-semibold text-[#1a1a1a]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          {(MENUS[mobileSection].boxHeading === mobileCategory
            ? MENUS[mobileSection].boxLinks
            : MENUS[mobileSection].columns.find((c) => c.heading === mobileCategory).links
          ).map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-b border-zinc-200 bg-white px-4 py-3 pl-[30px] text-[15px] font-semibold text-[#0076a3]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Mobile "Links" (Find It Fast) panel — same data as desktop, stacked single-column. */}
      {openMenu === "FindItFast" && (
        <div className="relative z-10 bg-white px-4 py-4 md:hidden">
          {FIND_IT_FAST.columns.map((col) => (
            <div key={col.heading} className="mb-4">
              <div className="mb-2 text-[15px] font-bold text-[#1a1a1a]">{col.heading}</div>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.title} className="flex gap-2">
                    <FindItFastIcon name={item.icon} />
                    <div>
                      <div className="text-sm font-semibold text-[#1a1a1a]">{item.title}</div>
                      <div className="text-sm">
                        {item.links.map((link, i) => (
                          <span key={link.label}>
                            {i > 0 && " | "}
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0076a3] hover:underline"
                            >
                              {link.label}
                            </a>
                          </span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <hr className="my-4 border-zinc-200" />

          <div className="flex flex-col gap-2 text-center">
            {FIND_IT_FAST.bottom.map((entry) => (
              <div key={entry.label}>
                <div className="text-sm font-bold text-[#1a1a1a]">{entry.title}</div>
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#0076a3] hover:underline"
                >
                  {entry.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Secondary nav — real color: #ebebeb, real accent line: 2px solid #007a33.
          Desktop only: mobile uses the expandable chevron list above instead. */}
      <div
        className="relative hidden border-b border-t-2 border-zinc-200 border-t-[#007a33] bg-[#ebebeb]/85 md:block"
        onMouseLeave={previewClose}
      >
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3.5">
          <nav
            aria-label="Secondary"
            className="flex flex-wrap gap-7 text-[22px] font-semibold"
            style={{
              fontFamily:
                '"Public Sans Web", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            }}
          >
            {SECONDARY_NAV.map((item) => {
              const isActive = openMenu === item;
              return (
                <div
                  key={item}
                  onMouseEnter={() => previewOpen(item)}
                  className={
                    "group flex items-center gap-1 border-b-2  hover:text-[#007a33] " +
                    (isActive
                      ? "border-[#007a33] text-[#007a33]"
                      : "border-transparent text-[#0076a3]")
                  }
                >
                  <a
                    href={MENUS[item].href}
                    target="_blank"
                    rel="noopener noreferrer"

                  >
                    {item}
                  </a>
                  <button
                    type="button"
                    aria-label={`Toggle ${item} menu`}
                    onClick={() => toggleClick(item)}
                    className="leading-none"
                  >
                 
                  </button>
                </div>
              );
            })}
          </nav>
          <div className="relative">
          <button
            type="button"
            onMouseEnter={() => previewOpen("FindItFast")}
            onClick={() => toggleClick("FindItFast")}
            className={
              "flex items-center gap-2 rounded-sm px-3.5 py-1.5 text-[13px] font-medium " +
              (openMenu === "FindItFast"
                ? "border border-b-0 border-[#002040] bg-white text-[#0076a3] [border-bottom-left-radius:0] [border-bottom-right-radius:0]"
                : "bg-[#0076a3] text-white hover:bg-[#0a5670]")
            }
          >
            <svg width="12" height="12" viewBox="0 0 512 512" aria-hidden="true">
              <path fill="currentColor" d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" />
            </svg>
            Find It Fast ▾
          </button>

        {openMenu === "FindItFast" && (
          <div className="absolute top-full right-0 z-10 w-[490px] max-w-[90vw] rounded border border-t-0 border-[#002040] bg-white p-4 shadow-lg">
            <div className="grid grid-cols-2 gap-8">
              {FIND_IT_FAST.columns.map((col) => (
                <div key={col.heading}>
                  <div className="mb-3 text-sm font-bold text-[#1a1a1a]">{col.heading}</div>
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item.title} className="flex gap-2">
                        <FindItFastIcon name={item.icon} />
                        <div>
                          <div className="text-sm font-semibold text-[#1a1a1a]">{item.title}</div>
                          <div className="text-sm">
                            {item.links.map((link, i) => (
                              <span key={link.label}>
                                {i > 0 && " | "}
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#0076a3] hover:underline"
                                >
                                  {link.label}
                                </a>
                              </span>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <hr className="my-4 border-zinc-200" />

            <div className="flex flex-col gap-2 text-center">
              {FIND_IT_FAST.bottom.map((entry) => (
                <div key={entry.label}>
                  <div className="text-sm font-bold text-[#1a1a1a]">{entry.title}</div>
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#0076a3] hover:underline"
                  >
                    {entry.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
          </div>
        </div>

        {openMenu && MENUS[openMenu] && (
          <div className="absolute top-full left-1/2 z-10 w-full max-w-6xl -translate-x-1/2 px-4">
          <div className="flex flex-wrap gap-10 rounded border border-[#002040] bg-white p-6 shadow-lg">
            {MENUS[openMenu].columns.map((col) => (
              <div key={col.heading} className="w-48">
                <div className="mb-1 text-sm font-bold text-[#1a1a1a]">{col.heading}</div>
                <ul className="space-y-1.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-[#0ca1e0] hover:underline"
                      >
                        <span className="text-[#06966e]">›</span> {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="ml-auto w-[370px] rounded border border-zinc-200 bg-white p-4">
              <div className="mb-2 text-sm font-bold text-[#1a1a1a]">{MENUS[openMenu].boxHeading}</div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {MENUS[openMenu].boxLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#0ca1e0] hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>
        )}
      </div>
      </div>


    </header>
  );
}
