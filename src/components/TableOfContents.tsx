import { useCallback, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocHeading {
  id: string;
  text: string;
}

export interface TableOfContentsProps {
  /** Ref to the article body container whose H2s should be indexed. */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** CSS selector for the article body container (used if no ref given). */
  containerSelector?: string;
  /** Overline label above the list. */
  label?: string;
  /** Scroll offset in px so headings aren't hidden under sticky chrome. */
  scrollOffset?: number;
  className?: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function TableOfContents({
  containerRef,
  containerSelector,
  label = "On this page",
  scrollOffset = 96,
  className,
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const getContainer = useCallback((): HTMLElement | null => {
    if (containerRef?.current) return containerRef.current;
    if (containerSelector)
      return document.querySelector<HTMLElement>(containerSelector);
    return null;
  }, [containerRef, containerSelector]);

  // Scan the live DOM for H2s and ensure each has a stable id.
  useEffect(() => {
    const container = getContainer();
    if (!container) return;

    const used = new Set<string>();
    const found = Array.from(container.querySelectorAll("h2")).map((el) => {
      const text = (el.textContent ?? "").trim();
      let id = el.id || slugify(text) || "section";
      let unique = id;
      let i = 2;
      while (used.has(unique)) unique = `${id}-${i++}`;
      used.add(unique);
      if (el.id !== unique) el.id = unique;
      el.style.scrollMarginTop = `${scrollOffset}px`;
      return { id: unique, text };
    });

    setHeadings(found);
    setActiveId((prev) => prev ?? found[0]?.id ?? null);
  }, [getContainer, scrollOffset]);

  // Track which heading is currently in view.
  useEffect(() => {
    if (headings.length === 0) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const compute = () => {
      const line = scrollOffset + 8;
      let current: HTMLElement = elements[0]!;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        current = elements[elements.length - 1]!;
      }
      setActiveId(current.id);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [headings, scrollOffset]);

  const handleClick = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
    setOpen(false);
    window.history.replaceState(null, "", `#${id}`);
  };

  if (headings.length === 0) return null;

  const list = (
    <ol className="flex flex-col">
      {headings.map((heading, index) => {
        const isActive = heading.id === activeId;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "flex gap-3 border-l-2 py-2 pl-3 pr-2 text-sm leading-snug transition-colors",
                isActive
                  ? "border-accent font-bold text-foreground"
                  : "border-border font-normal text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="tabular-nums opacity-70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{heading.text}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <nav aria-label={label} className={className}>
      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:sticky lg:top-24 lg:block">
        <p className="mb-3 pl-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </p>
        {list}
      </div>

      {/* Mobile: accordion above the article body, collapsed by default */}
      <div className="border-y border-border lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between py-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
        >
          {label}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          />
        </button>
        {open && <div className="pb-4">{list}</div>}
      </div>
    </nav>
  );
}

export default TableOfContents;
