import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  Grid3x3,
  List,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Info,
  Heart,
  Share2,
  Trash2,
  Edit,
  Download,
  MoreHorizontal,
  FolderOpen,
  Image,
  Star,
  Clock,
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ─── Sample photo data (varied aspect ratios for masonry) ─────────────────────
const ALL_PHOTOS = [
  { id: 1, url: "https://picsum.photos/seed/photo1/800/600", date: "June 15, 2024", name: "IMG_1001.jpg", size: "2.4 MB", rating: 5, w: 800, h: 600 },
  { id: 2, url: "https://picsum.photos/seed/photo2/600/900", date: "June 15, 2024", name: "IMG_1002.jpg", size: "1.8 MB", rating: 3, w: 600, h: 900 },
  { id: 3, url: "https://picsum.photos/seed/photo3/900/600", date: "June 10, 2024", name: "IMG_1003.jpg", size: "3.1 MB", rating: 4, w: 900, h: 600 },
  { id: 4, url: "https://picsum.photos/seed/photo4/600/600", date: "June 10, 2024", name: "IMG_1004.jpg", size: "2.9 MB", rating: 2, w: 600, h: 600 },
  { id: 5, url: "https://picsum.photos/seed/photo5/800/500", date: "June 05, 2024", name: "IMG_1005.jpg", size: "1.5 MB", rating: 5, w: 800, h: 500 },
  { id: 6, url: "https://picsum.photos/seed/photo6/600/800", date: "June 05, 2024", name: "IMG_1006.jpg", size: "2.2 MB", rating: 1, w: 600, h: 800 },
  { id: 7, url: "https://picsum.photos/seed/photo7/900/700", date: "May 28, 2024", name: "IMG_1007.jpg", size: "4.0 MB", rating: 4, w: 900, h: 700 },
  { id: 8, url: "https://picsum.photos/seed/photo8/600/900", date: "May 28, 2024", name: "IMG_1008.jpg", size: "1.9 MB", rating: 3, w: 600, h: 900 },
  { id: 9, url: "https://picsum.photos/seed/photo9/800/600", date: "May 20, 2024", name: "IMG_1009.jpg", size: "2.7 MB", rating: 5, w: 800, h: 600 },
  { id: 10, url: "https://picsum.photos/seed/photo10/700/900", date: "May 20, 2024", name: "IMG_1010.jpg", size: "3.3 MB", rating: 2, w: 700, h: 900 },
  { id: 11, url: "https://picsum.photos/seed/photo11/900/600", date: "May 15, 2024", name: "IMG_1011.jpg", size: "2.1 MB", rating: 4, w: 900, h: 600 },
  { id: 12, url: "https://picsum.photos/seed/photo12/600/600", date: "May 15, 2024", name: "IMG_1012.jpg", size: "1.6 MB", rating: 3, w: 600, h: 600 },
  { id: 13, url: "https://picsum.photos/seed/photo13/800/700", date: "May 10, 2024", name: "IMG_1013.jpg", size: "2.8 MB", rating: 4, w: 800, h: 700 },
  { id: 14, url: "https://picsum.photos/seed/photo14/600/800", date: "May 10, 2024", name: "IMG_1014.jpg", size: "1.7 MB", rating: 2, w: 600, h: 800 },
  { id: 15, url: "https://picsum.photos/seed/photo15/900/500", date: "May 05, 2024", name: "IMG_1015.jpg", size: "3.0 MB", rating: 5, w: 900, h: 500 },
  { id: 16, url: "https://picsum.photos/seed/photo16/700/700", date: "May 05, 2024", name: "IMG_1016.jpg", size: "2.3 MB", rating: 3, w: 700, h: 700 },
  { id: 17, url: "https://picsum.photos/seed/photo17/800/600", date: "April 20, 2024", name: "IMG_1017.jpg", size: "2.5 MB", rating: 4, w: 800, h: 600 },
  { id: 18, url: "https://picsum.photos/seed/photo18/600/900", date: "April 15, 2024", name: "IMG_1018.jpg", size: "1.9 MB", rating: 3, w: 600, h: 900 },
  { id: 19, url: "https://picsum.photos/seed/photo19/900/600", date: "April 10, 2024", name: "IMG_1019.jpg", size: "3.2 MB", rating: 5, w: 900, h: 600 },
  { id: 20, url: "https://picsum.photos/seed/photo20/600/600", date: "April 05, 2024", name: "IMG_1020.jpg", size: "1.7 MB", rating: 2, w: 600, h: 600 },
  { id: 21, url: "https://picsum.photos/seed/photo21/800/500", date: "March 28, 2024", name: "IMG_1021.jpg", size: "2.6 MB", rating: 4, w: 800, h: 500 },
  { id: 22, url: "https://picsum.photos/seed/photo22/600/800", date: "March 20, 2024", name: "IMG_1022.jpg", size: "2.0 MB", rating: 3, w: 600, h: 800 },
  { id: 23, url: "https://picsum.photos/seed/photo23/900/700", date: "March 15, 2024", name: "IMG_1023.jpg", size: "3.4 MB", rating: 5, w: 900, h: 700 },
  { id: 24, url: "https://picsum.photos/seed/photo24/700/700", date: "March 10, 2024", name: "IMG_1024.jpg", size: "2.1 MB", rating: 3, w: 700, h: 700 },
];

const ALBUMS = [
  { id: 1, name: "All Photos", icon: <Image size={16} />, count: 24 },
  { id: 2, name: "Favorites", icon: <Heart size={16} />, count: 7 },
  { id: 3, name: "Recent", icon: <Clock size={16} />, count: 10 },
  { id: 4, name: "Screenshots", icon: <Grid3x3 size={16} />, count: 4 },
  { id: 5, name: "Downloads", icon: <Download size={16} />, count: 5 },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type ViewMode = "grid" | "list";
type SidebarTab = "all" | "albums" | "date";

interface Photo {
  id: number;
  url: string;
  date: string;
  name: string;
  size: string;
  rating: number;
  w: number;
  h: number;
}

// ─── Derive month groups from photo dates ────────────────────────────────────
function groupByMonth(photos: Photo[]) {
  const groups: { label: string; key: string; photos: Photo[] }[] = [];
  const map: Record<string, Photo[]> = {};
  for (const p of photos) {
    // date format: "Month DD, YYYY" → extract "Month YYYY"
    const parts = p.date.split(" ");
    const key = `${parts[0]} ${parts[2]}`;
    if (!map[key]) { map[key] = []; groups.push({ label: key, key, photos: map[key] }); }
    map[key].push(p);
  }
  return groups; // newest first
}

// ─── Component ────────────────────────────────────────────────────────────────
function PhotoGallery() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState(1);
  const [sortBy, setSortBy] = useState<"date" | "name" | "size">("date");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dateFilterOpen, setDateFilterOpen] = useState(true);
  const [selectedMonths, setSelectedMonths] = useState<Set<string>>(new Set());

  const allMonthGroups = groupByMonth(ALL_PHOTOS);

  const filteredPhotos = ALL_PHOTOS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter((p) => {
    if (selectedMonths.size === 0) return true;
    const parts = p.date.split(" ");
    const key = `${parts[0]} ${parts[2]}`;
    return selectedMonths.has(key);
  });

  const monthGroups = groupByMonth(filteredPhotos);

  const openLightbox = (photo: Photo) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevPhoto = () =>
    setLightboxIndex((i) => (i > 0 ? i - 1 : filteredPhotos.length - 1));
  const nextPhoto = () =>
    setLightboxIndex((i) => (i < filteredPhotos.length - 1 ? i + 1 : 0));

  const toggleMonth = (key: string) => {
    setSelectedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const clearDateFilter = () => setSelectedMonths(new Set());

  // ─── Star rating ─────────────────────────────────────────────────────────────
  const StarRating = ({ rating }: { rating: number }) => (
    <span className="pg-star-row">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={10}
          fill={n <= rating ? "var(--orch-warn)" : "none"}
          color={n <= rating ? "var(--orch-warn)" : "var(--orch-fg-4)"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );

  // ─── List view row ───────────────────────────────────────────────────────────
  const ListRow = ({ photo }: { photo: Photo }) => (
    <div className="pg-list-row" onClick={() => openLightbox(photo)}>
      <img src={photo.url} alt={photo.name} className="pg-list-thumb" />
      <div className="pg-list-info">
        <span className="pg-list-name">{photo.name}</span>
        <span className="pg-list-meta">{photo.date} · {photo.size}</span>
      </div>
      <StarRating rating={photo.rating} />
      <div className="pg-list-actions">
        <Heart size={14} strokeWidth={1.5} />
        <Share2 size={14} strokeWidth={1.5} />
        <Trash2 size={14} strokeWidth={1.5} />
        <MoreHorizontal size={14} strokeWidth={1.5} />
      </div>
    </div>
  );

  // ─── Grid thumbnail ──────────────────────────────────────────────────────────
  const getSizeClass = (idx: number): string => {
    const pattern = ["pg-thumb-tall", "pg-thumb-wide", "pg-thumb-std", "pg-thumb-std",
      "pg-thumb-std", "pg-thumb-tall", "pg-thumb-wide", "pg-thumb-std",
      "pg-thumb-std", "pg-thumb-tall", "pg-thumb-std", "pg-thumb-wide",
      "pg-thumb-std", "pg-thumb-std", "pg-thumb-tall", "pg-thumb-wide",
      "pg-thumb-std", "pg-thumb-tall", "pg-thumb-wide", "pg-thumb-std",
      "pg-thumb-std", "pg-thumb-tall", "pg-thumb-std", "pg-thumb-wide"];
    return pattern[idx % pattern.length];
  };

  const GridThumb = ({ photo, idx }: { photo: Photo; idx: number }) => (
    <div className={`pg-thumb ${getSizeClass(idx)}`} onClick={() => openLightbox(photo)}>
      <img src={photo.url} alt={photo.name} className="pg-thumb-img" />
      <div className="pg-thumb-overlay">
        <div className="pg-thumb-info">
          <span className="pg-thumb-name">{photo.name}</span>
          <span className="pg-thumb-date">{photo.date}</span>
        </div>
        <div className="pg-thumb-actions">
          <Heart size={14} strokeWidth={1.5} />
          <Share2 size={14} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="pg-shell">
      <style>{`
        :root {
          --shell-outer-bg: #0b0b0b;
          --orch-bg-0: #08090b;
          --orch-bg-1: #0d0e11;
          --orch-bg-2: #131418;
          --orch-bg-3: #1a1c21;
          --orch-bg-4: #22252c;
          --orch-line-1: rgba(255, 255, 255, 0.05);
          --orch-line-2: rgba(255, 255, 255, 0.08);
          --orch-line-3: rgba(255, 255, 255, 0.12);
          --orch-fg-1: #e8e9ec;
          --orch-fg-2: #9ea0a8;
          --orch-fg-3: #6b6d75;
          --orch-fg-4: #4a4c54;
          --orch-acc: #1d4ed8;
          --orch-acc-hi: #3b6fff;
          --orch-acc-tint: rgba(29, 78, 216, 0.05);
          --orch-ok: #65b88a;
          --orch-warn: #d9a24a;
          --orch-r-sm: 6px;
          --orch-r-md: 8px;
          --orch-r-lg: 10px;
          --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          --heros-editor-font: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; background: var(--shell-outer-bg); }
        body { color: var(--orch-fg-1); font-family: var(--heros-editor-font); }

        .pg-shell {
          display: flex;
          flex-direction: column;
          height: 100vh;
          height: 100dvh;
          background: var(--shell-outer-bg);
          overflow: hidden;
        }

        /* ── Title bar ────────────────────────────────────────────────────── */
        .pg-titlebar {
          display: flex;
          align-items: center;
          height: 36px;
          padding: 0 12px;
          background: var(--orch-bg-1);
          border-bottom: 1px solid var(--orch-line-1);
          flex-shrink: 0;
          gap: 8px;
          user-select: none;
        }
        .pg-titlebar-title { font-size: 12px; font-weight: 600; color: var(--orch-fg-2); letter-spacing: 0.01em; }
        .pg-titlebar-spacer { flex: 1; }
        .pg-titlebar-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 28px; height: 24px; border-radius: var(--orch-r-sm);
          background: transparent; border: none; color: var(--orch-fg-3);
          cursor: pointer; transition: background 120ms, color 120ms;
        }
        .pg-titlebar-btn:hover { background: var(--orch-bg-3); color: var(--orch-fg-1); }
        .pg-titlebar-btn svg { width: 14px; height: 14px; stroke-width: 1.5; }

        /* ── Toolbar ────────────────────────────────────────────────────────── */
        .pg-toolbar {
          display: flex; align-items: center; gap: 6px;
          padding: 0 16px; height: 48px;
          background: var(--orch-bg-1); border-bottom: 1px solid var(--orch-line-1);
          flex-shrink: 0;
        }
        .pg-toolbar-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 5px;
          height: 32px; padding: 0 12px; border-radius: var(--orch-r-md);
          background: transparent; border: none; color: var(--orch-fg-2);
          font-family: var(--heros-editor-font); font-size: 12px; font-weight: 500;
          cursor: pointer; transition: background 120ms, color 120ms; white-space: nowrap;
        }
        .pg-toolbar-btn:hover { background: var(--orch-bg-3); color: var(--orch-fg-1); }
        .pg-toolbar-btn.active { background: var(--orch-bg-3); color: var(--orch-acc-hi); }
        .pg-toolbar-btn svg { width: 15px; height: 15px; stroke-width: 1.5; }
        .pg-toolbar-sep { width: 1px; height: 20px; background: var(--orch-line-2); margin: 0 4px; }
        .pg-search-wrap {
          display: flex; align-items: center; gap: 6px; height: 32px; padding: 0 10px;
          border-radius: var(--orch-r-md); background: var(--orch-bg-2);
          border: 1px solid var(--orch-line-2); flex: 1; max-width: 280px; margin-left: auto;
        }
        .pg-search-wrap svg { color: var(--orch-fg-3); flex-shrink: 0; }
        .pg-search-wrap input {
          flex: 1; background: transparent; border: none; outline: none;
          color: var(--orch-fg-1); font-family: var(--heros-editor-font); font-size: 12px;
        }
        .pg-search-wrap input::placeholder { color: var(--orch-fg-3); }
        .pg-sort-select {
          height: 32px; padding: 0 8px; border-radius: var(--orch-r-md);
          background: var(--orch-bg-2); border: 1px solid var(--orch-line-2);
          color: var(--orch-fg-2); font-family: var(--heros-editor-font); font-size: 12px;
          cursor: pointer; outline: none;
        }

        /* ── Body ──────────────────────────────────────────────────────────── */
        .pg-body { display: flex; flex: 1; min-height: 0; overflow: hidden; }

        /* ── Sidebar ─────────────────────────────────────────────────────────── */
        .pg-sidebar {
          width: 200px; flex-shrink: 0; background: var(--orch-bg-1);
          border-right: 1px solid var(--orch-line-1);
          display: flex; flex-direction: column; overflow-y: auto;
          transition: width 200ms, opacity 200ms;
        }
        .pg-sidebar.collapsed { width: 0; opacity: 0; overflow: hidden; }
        .pg-sidebar-tabs { display: flex; padding: 8px 8px 0; gap: 2px; }
        .pg-sidebar-tab {
          flex: 1; padding: 5px 0; text-align: center; font-size: 11px; font-weight: 600;
          color: var(--orch-fg-3); border-radius: var(--orch-r-sm) var(--orch-r-sm) 0 0;
          cursor: pointer; transition: color 120ms, background 120ms;
          border-bottom: 2px solid transparent;
        }
        .pg-sidebar-tab.active { color: var(--orch-fg-1); border-bottom-color: var(--orch-acc-hi); }
        .pg-sidebar-tab:hover:not(.active) { color: var(--orch-fg-2); }
        .pg-sidebar-section {
          padding: 8px 8px 0; font-size: 10px; font-weight: 700; color: var(--orch-fg-4);
          letter-spacing: 0.08em; text-transform: uppercase; margin-top: 6px;
        }
        .pg-sidebar-item {
          display: flex; align-items: center; gap: 8px; padding: 7px 10px;
          border-radius: var(--orch-r-md); cursor: pointer; transition: background 120ms;
          color: var(--orch-fg-2); font-size: 12px; font-weight: 500;
        }
        .pg-sidebar-item:hover { background: var(--orch-bg-2); }
        .pg-sidebar-item.active { background: var(--orch-bg-3); color: var(--orch-fg-1); }
        .pg-sidebar-item svg { flex-shrink: 0; }
        .pg-sidebar-item-count { margin-left: auto; font-size: 11px; color: var(--orch-fg-4); font-weight: 400; }

        /* ── Main content area (center + right date panel) ─────────────────── */
        .pg-content { display: flex; flex: 1; min-width: 0; overflow: hidden; }

        /* ── Center main area ─────────────────────────────────────────────── */
        .pg-main { flex: 1; min-width: 0; overflow-y: auto; padding: 16px; background: var(--orch-bg-0); }
        .pg-main::-webkit-scrollbar { width: 6px; }
        .pg-main::-webkit-scrollbar-track { background: transparent; }
        .pg-main::-webkit-scrollbar-thumb { background: var(--orch-bg-4); border-radius: 3px; }

        /* ── Date filter panel (right side) ────────────────────────────────── */
        .pg-date-panel {
          width: 200px; flex-shrink: 0; background: var(--orch-bg-1);
          border-left: 1px solid var(--orch-line-1);
          display: flex; flex-direction: column; overflow-y: auto;
          transition: width 200ms, opacity 200ms;
        }
        .pg-date-panel.collapsed { width: 0; opacity: 0; overflow: hidden; }
        .pg-date-panel-hdr {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 12px 8px;
          font-size: 11px; font-weight: 700; color: var(--orch-fg-3);
          letter-spacing: 0.06em; text-transform: uppercase;
          border-bottom: 1px solid var(--orch-line-1);
          flex-shrink: 0;
        }
        .pg-date-panel-hdr svg { flex-shrink: 0; }
        .pg-date-clear {
          margin-left: auto; font-size: 10px; font-weight: 500;
          color: var(--orch-acc-hi); cursor: pointer; text-transform: none; letter-spacing: 0;
        }
        .pg-date-clear:hover { text-decoration: underline; }
        .pg-date-yr {
          font-size: 11px; font-weight: 700; color: var(--orch-fg-3);
          letter-spacing: 0.04em; padding: 8px 12px 4px;
        }
        .pg-date-mo {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 12px; cursor: pointer; transition: background 120ms;
          color: var(--orch-fg-2); font-size: 12px; font-weight: 400;
        }
        .pg-date-mo:hover { background: var(--orch-bg-2); }
        .pg-date-mo.selected { color: var(--orch-fg-1); background: var(--orch-bg-3); }
        .pg-date-mo-check {
          width: 14px; height: 14px; border-radius: 3px;
          border: 1.5px solid var(--orch-line-3); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: background 120ms, border-color 120ms;
        }
        .pg-date-mo.selected .pg-date-mo-check {
          background: var(--orch-acc-hi); border-color: var(--orch-acc-hi);
        }
        .pg-date-mo-check svg { width: 9px; height: 9px; stroke: #fff; stroke-width: 3; }
        .pg-date-mo-count { margin-left: auto; font-size: 11px; color: var(--orch-fg-4); }
        .pg-date-mo-label { flex: 1; }

        /* ── Masonry grid ──────────────────────────────────────────────────── */
        .pg-masonry { columns: 5 160px; column-gap: 4px; }
        .pg-masonry-item { break-inside: avoid; margin-bottom: 4px; display: inline-block; width: 100%; }
        .pg-thumb {
          position: relative; border-radius: var(--orch-r-md); overflow: hidden;
          cursor: pointer; background: var(--orch-bg-2);
        }
        .pg-thumb-std { aspect-ratio: 1/1; width: 100%; }
        .pg-thumb-wide { aspect-ratio: 16/9; width: 100%; }
        .pg-thumb-tall { aspect-ratio: 3/4; width: 100%; }
        .pg-thumb-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 200ms;
        }
        .pg-thumb:hover .pg-thumb-img { transform: scale(1.03); }
        .pg-thumb-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%);
          opacity: 0; transition: opacity 200ms;
          display: flex; flex-direction: column; justify-content: flex-end; padding: 8px;
        }
        .pg-thumb:hover .pg-thumb-overlay { opacity: 1; }
        .pg-thumb-info { display: flex; flex-direction: column; gap: 2px; }
        .pg-thumb-name { font-size: 11px; font-weight: 600; color: #fff; }
        .pg-thumb-date { font-size: 10px; color: rgba(255,255,255,0.7); }
        .pg-thumb-actions { display: flex; gap: 6px; margin-top: 6px; color: rgba(255,255,255,0.85); }
        .pg-thumb-actions svg { cursor: pointer; transition: color 120ms; }
        .pg-thumb-actions svg:hover { color: #fff; }

        /* ── List view ─────────────────────────────────────────────────────── */
        .pg-list-row {
          display: flex; align-items: center; gap: 12px; padding: 6px 8px;
          border-radius: var(--orch-r-md); cursor: pointer; transition: background 120ms;
        }
        .pg-list-row:hover { background: var(--orch-bg-2); }
        .pg-list-thumb {
          width: 48px; height: 36px; object-fit: cover; border-radius: var(--orch-r-sm); flex-shrink: 0;
        }
        .pg-list-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
        .pg-list-name { font-size: 12px; font-weight: 600; color: var(--orch-fg-1); }
        .pg-list-meta { font-size: 11px; color: var(--orch-fg-3); }
        .pg-star-row { display: flex; gap: 2px; flex-shrink: 0; }
        .pg-list-actions { display: flex; gap: 8px; color: var(--orch-fg-3); opacity: 0; transition: opacity 120ms; }
        .pg-list-row:hover .pg-list-actions { opacity: 1; }
        .pg-list-actions svg { cursor: pointer; transition: color 120ms; }
        .pg-list-actions svg:hover { color: var(--orch-fg-1); }

        /* ── Status bar ────────────────────────────────────────────────────── */
        .pg-statusbar {
          display: flex; align-items: center; gap: 12px; padding: 0 16px; height: 28px;
          background: var(--orch-bg-1); border-top: 1px solid var(--orch-line-1);
          flex-shrink: 0; font-size: 11px; color: var(--orch-fg-3);
        }
        .pg-statusbar span { display: flex; align-items: center; gap: 4px; }
        .pg-statusbar svg { width: 12px; height: 12px; stroke-width: 1.5; }

        /* ── Lightbox ───────────────────────────────────────────────────────── */
        .pg-lightbox {
          position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 100;
          display: flex; flex-direction: column; animation: pg-fadein 150ms ease;
        }
        @keyframes pg-fadein { from { opacity: 0; } to { opacity: 1; } }
        .pg-lightbox-hdr {
          display: flex; align-items: center; gap: 8px; padding: 0 16px; height: 44px;
          background: rgba(11,11,11,0.95); border-bottom: 1px solid var(--orch-line-1); flex-shrink: 0;
        }
        .pg-lightbox-hdr-title { font-size: 12px; font-weight: 600; color: var(--orch-fg-2); flex: 1; }
        .pg-lightbox-hdr-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 32px; height: 28px; border-radius: var(--orch-r-sm);
          background: transparent; border: none; color: var(--orch-fg-3);
          cursor: pointer; transition: background 120ms, color 120ms;
        }
        .pg-lightbox-hdr-btn:hover { background: var(--orch-bg-3); color: var(--orch-fg-1); }
        .pg-lightbox-hdr-btn svg { width: 15px; height: 15px; stroke-width: 1.5; }
        .pg-lightbox-body {
          flex: 1; display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .pg-lightbox-img {
          max-width: 90%; max-height: 90%; object-fit: contain; border-radius: var(--orch-r-lg);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }
        .pg-lightbox-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          display: inline-flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.08); border: none;
          color: rgba(255,255,255,0.7); cursor: pointer; transition: background 120ms, color 120ms;
        }
        .pg-lightbox-nav:hover { background: rgba(255,255,255,0.15); color: #fff; }
        .pg-lightbox-nav svg { width: 18px; height: 18px; stroke-width: 1.5; }
        .pg-lightbox-prev { left: 16px; }
        .pg-lightbox-next { right: 16px; }
        .pg-lightbox-ftr {
          display: flex; align-items: center; gap: 12px; padding: 0 16px; height: 44px;
          background: rgba(11,11,11,0.95); border-top: 1px solid var(--orch-line-1); flex-shrink: 0;
        }
        .pg-lightbox-ftr-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 5px;
          height: 30px; padding: 0 12px; border-radius: var(--orch-r-md);
          background: var(--orch-bg-3); border: 1px solid var(--orch-line-2);
          color: var(--orch-fg-2); font-family: var(--heros-editor-font); font-size: 11px;
          font-weight: 500; cursor: pointer; transition: background 120ms, color 120ms;
        }
        .pg-lightbox-ftr-btn:hover { background: var(--orch-bg-4); color: var(--orch-fg-1); }
        .pg-lightbox-ftr-btn svg { width: 13px; height: 13px; stroke-width: 1.5; }
        .pg-lightbox-counter { margin-left: auto; font-size: 11px; color: var(--orch-fg-3); }
      `}</style>

      {/* ── Title bar ────────────────────────────────────────────────────── */}
      <div className="pg-titlebar">
        <span className="pg-titlebar-title">Photos</span>
        <div className="pg-titlebar-spacer" />
        <button className="pg-titlebar-btn" title="Minimize"><Minimize2 /></button>
        <button className="pg-titlebar-btn" title="Maximize"><Maximize2 /></button>
        <button className="pg-titlebar-btn" title="Close"><X /></button>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className="pg-toolbar">
        <button className="pg-toolbar-btn" onClick={() => setSidebarOpen(!sidebarOpen)} title="Toggle sidebar">
          <ChevronLeft size={15} style={{ transform: sidebarOpen ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 200ms" }} />
        </button>
        <div className="pg-toolbar-sep" />
        <button className="pg-toolbar-btn"><ChevronLeft size={15} /> Back</button>
        <button className="pg-toolbar-btn"><Edit size={15} /> Edit & Create</button>
        <button className="pg-toolbar-btn"><SlidersHorizontal size={15} /> Adjust</button>
        <div className="pg-toolbar-sep" />
        <button className={`pg-toolbar-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")} title="Grid view"><Grid3x3 size={15} /></button>
        <button className={`pg-toolbar-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")} title="List view"><List size={15} /></button>
        <div className="pg-toolbar-sep" />
        <div className="pg-search-wrap">
          <Search size={13} />
          <input type="text" placeholder="Search photos" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <select className="pg-sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
          <option value="date">Date</option>
          <option value="name">Name</option>
          <option value="size">Size</option>
        </select>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="pg-body">
        {/* Left sidebar */}
        <div className={`pg-sidebar ${sidebarOpen ? "" : "collapsed"}`}>
          <div className="pg-sidebar-tabs">
            <div className={`pg-sidebar-tab ${sidebarTab === "all" ? "active" : ""}`} onClick={() => setSidebarTab("all")}>All</div>
            <div className={`pg-sidebar-tab ${sidebarTab === "albums" ? "active" : ""}`} onClick={() => setSidebarTab("albums")}>Albums</div>
            <div className={`pg-sidebar-tab ${sidebarTab === "date" ? "active" : ""}`} onClick={() => setSidebarTab("date")}>Date</div>
          </div>
          {sidebarTab === "all" && (
            <>
              <div className="pg-sidebar-section">Library</div>
              {ALBUMS.map((album) => (
                <div key={album.id} className={`pg-sidebar-item ${selectedAlbum === album.id ? "active" : ""}`} onClick={() => setSelectedAlbum(album.id)}>
                  {album.icon}<span>{album.name}</span><span className="pg-sidebar-item-count">{album.count}</span>
                </div>
              ))}
            </>
          )}
          {sidebarTab === "albums" && (
            <>
              <div className="pg-sidebar-section">Albums</div>
              {ALBUMS.map((album) => (
                <div key={album.id} className={`pg-sidebar-item ${selectedAlbum === album.id ? "active" : ""}`} onClick={() => setSelectedAlbum(album.id)}>
                  <FolderOpen size={16} /><span>{album.name}</span><span className="pg-sidebar-item-count">{album.count}</span>
                </div>
              ))}
            </>
          )}
          {sidebarTab === "date" && (
            <>
              <div className="pg-sidebar-section">Date</div>
              {allMonthGroups.map((g) => (
                <div key={g.key} className="pg-sidebar-item">
                  <Calendar size={16} /><span>{g.label}</span><span className="pg-sidebar-item-count">{g.photos.length}</span>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Center + right date panel */}
        <div className="pg-content">
          {/* Main grid/list */}
          <div className="pg-main">
            {viewMode === "grid" ? (
              <div className="pg-masonry">
                {filteredPhotos.map((photo, idx) => (
                  <div key={photo.id} className="pg-masonry-item">
                    <GridThumb photo={photo} idx={idx} />
                  </div>
                ))}
              </div>
            ) : (
              filteredPhotos.map((photo) => <ListRow key={photo.id} photo={photo} />)
            )}
          </div>

          {/* Right date filter panel */}
          <div className={`pg-date-panel ${dateFilterOpen ? "" : "collapsed"}`}>
            <div className="pg-date-panel-hdr">
              <Calendar size={12} />
              <span>Date</span>
              {selectedMonths.size > 0 && (
                <span className="pg-date-clear" onClick={clearDateFilter}>Clear</span>
              )}
            </div>
            {allMonthGroups.map((group) => {
              const yr = group.key.split(" ")[1];
              const mo = group.key.split(" ")[0];
              const isSelected = selectedMonths.has(group.key);
              return (
                <div key={group.key}>
                  <div className="pg-date-yr">{yr}</div>
                  <div
                    className={`pg-date-mo ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleMonth(group.key)}
                  >
                    <div className="pg-date-mo-check">
                      {isSelected && <ChevronDown size={9} strokeWidth={3} />}
                    </div>
                    <span className="pg-date-mo-label">{mo}</span>
                    <span className="pg-date-mo-count">{group.photos.length}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Status bar ──────────────────────────────────────────────────── */}
      <div className="pg-statusbar">
        <span><Image size={12} /> {filteredPhotos.length} items</span>
        {selectedMonths.size > 0 && <span><Calendar size={12} /> {selectedMonths.size} month{selectedMonths.size > 1 ? "s" : ""} selected</span>}
        <span style={{ marginLeft: "auto" }}>Sorted by {sortBy}</span>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div className="pg-lightbox">
          <div className="pg-lightbox-hdr">
            <span className="pg-lightbox-hdr-title">{filteredPhotos[lightboxIndex]?.name}</span>
            <button className="pg-lightbox-hdr-btn" title="Zoom in"><ZoomIn /></button>
            <button className="pg-lightbox-hdr-btn" title="Zoom out"><ZoomOut /></button>
            <button className="pg-lightbox-hdr-btn" title="Rotate"><RotateCcw /></button>
            <button className="pg-lightbox-hdr-btn" title="Info"><Info /></button>
            <button className="pg-lightbox-hdr-btn" onClick={closeLightbox} title="Close"><X /></button>
          </div>
          <div className="pg-lightbox-body">
            <button className="pg-lightbox-nav pg-lightbox-prev" onClick={prevPhoto}><ChevronLeft /></button>
            <img className="pg-lightbox-img" src={filteredPhotos[lightboxIndex]?.url} alt={filteredPhotos[lightboxIndex]?.name} />
            <button className="pg-lightbox-nav pg-lightbox-next" onClick={nextPhoto}><ChevronRight /></button>
          </div>
          <div className="pg-lightbox-ftr">
            <button className="pg-lightbox-ftr-btn"><Heart size={13} /> Favorite</button>
            <button className="pg-lightbox-ftr-btn"><Share2 size={13} /> Share</button>
            <button className="pg-lightbox-ftr-btn"><Edit size={13} /> Edit</button>
            <button className="pg-lightbox-ftr-btn"><Download size={13} /> Save</button>
            <button className="pg-lightbox-ftr-btn"><Trash2 size={13} /> Delete</button>
            <span className="pg-lightbox-counter">{lightboxIndex + 1} / {filteredPhotos.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mount ────────────────────────────────────────────────────────────────────
if (typeof window !== "undefined") {
  const mountEl = document.getElementById("root");
  if (mountEl) {
    const root = createRoot(mountEl);
    root.render(<PhotoGallery />);
  }
}
