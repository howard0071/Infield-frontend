import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import "./src/index.css";
import {
  Dialog,
  DialogContent,
} from "./src/components/ui/dialog";
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
  CheckSquare,
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

const MOCK_ALBUMS = [
  { id: 101, name: "Summer Vacation 2024", count: 42 },
  { id: 102, name: "Family Gatherings", count: 28 },
  { id: 103, name: "Work Projects", count: 15 },
  { id: 104, name: "Food & Dining", count: 33 },
  { id: 105, name: "Travel", count: 67 },
  { id: 106, name: "Screenshots", count: 19 },
  { id: 107, name: "Birthdays", count: 11 },
  { id: 108, name: "Landscapes", count: 24 },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type ViewMode = "grid" | "list" | "dense";
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
    const parts = p.date.split(" ");
    const key = `${parts[0]} ${parts[2]}`;
    if (!map[key]) { map[key] = []; groups.push({ label: key, key, photos: map[key] }); }
    map[key].push(p);
  }
  return groups;
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
  const [hoveredNeighborIdx, setHoveredNeighborIdx] = useState<number | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; photo: Photo } | null>(null);
  const [contextSubmenu, setContextSubmenu] = useState<{ x: number; y: number } | null>(null);
  const [albumSearch, setAlbumSearch] = useState("");
  const submenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [photos, setPhotos] = useState<Photo[]>(ALL_PHOTOS);

  const allMonthGroups = groupByMonth(photos);

  const filteredPhotos = photos.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter((p) => {
    if (selectedMonths.size === 0) return true;
    const parts = p.date.split(" ");
    const key = `${parts[0]} ${parts[2]}`;
    return selectedMonths.has(key);
  });

  const openLightbox = (photo: Photo) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
    setLightboxIndex(idx);
    setLightboxOpen(true);
    setHoveredNeighborIdx(null);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setHoveredNeighborIdx(null);
  };

  const goToPhoto = (idx: number) => {
    setLightboxIndex(Math.max(0, Math.min(idx, filteredPhotos.length - 1)));
    setHoveredNeighborIdx(null);
  };

  const prevPhoto = () => goToPhoto(lightboxIndex - 1);
  const nextPhoto = () => goToPhoto(lightboxIndex + 1);

  const toggleMonth = (key: string) => {
    setSelectedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const clearDateFilter = () => setSelectedMonths(new Set());

  // ─── Keyboard + scroll navigation ──────────────────────────────────────────
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevPhoto();
      else if (e.key === "ArrowRight") nextPhoto();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, lightboxIndex]);

  const handleWheel = (e: React.WheelEvent) => {
    if (!lightboxOpen) return;
    if (e.deltaY > 30) nextPhoto();
    else if (e.deltaY < -30) prevPhoto();
  };

  // ─── Right-click context menu ───────────────────────────────────────────────
  const openContextMenu = (e: React.MouseEvent, photo: Photo) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, photo });
  };

  const closeContextMenu = () => setContextMenu(null);

  const contextAction = (action: string, photo: Photo) => {
    closeContextMenu();
    switch (action) {
      case "open":
        openLightbox(photo);
        break;
      case "select":
        setSelectedPhotos(prev => {
          const next = new Set(prev);
          if (next.has(photo.id)) next.delete(photo.id);
          else next.add(photo.id);
          return next;
        });
        break;
      case "copy_image":
        // Copy image to clipboard via fetch + canvas
        fetch(photo.url).then(r => r.blob()).then(blob => {
          navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]);
        }).catch(() => {
          // Fallback: copy URL
          navigator.clipboard.writeText(photo.url);
        });
        break;
      case "copy_path":
        navigator.clipboard.writeText(photo.url);
        break;
      case "favorite":
        // Toggle favorite (simulated — just flip the local state)
        setPhotos(prev => prev.map(p => p.id === photo.id ? { ...p, rating: p.rating === 5 ? 0 : 5 } : p));
        break;
      case "delete":
        setPhotos(prev => prev.filter(p => p.id !== photo.id));
        break;
      default:
        break;
    }
  };

  // Close context menu on outside click / scroll / escape
  useEffect(() => {
    if (!contextMenu) return;
    const close = () => closeContextMenu();
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("keydown", close);
    };
  }, [contextMenu]);

  // ─── Neighboring thumbnails ─────────────────────────────────────────────────
  // Show5 thumbnails:2 before, current, 2 after
  const getNeighborThumbs = () => {
    const thumbs: { photo: Photo; idx: number }[] = [];
    for (let offset = -2; offset <= 2; offset++) {
      const targetIdx = lightboxIndex + offset;
      if (targetIdx >= 0 && targetIdx < filteredPhotos.length) {
        thumbs.push({ photo: filteredPhotos[targetIdx], idx: targetIdx });
      }
    }
    return thumbs;
  };

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
    <div
      className="pg-list-row"
      onClick={() => openLightbox(photo)}
      onContextMenu={(e) => openContextMenu(e, photo)}
    >
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
    const pattern = [
      "pg-thumb-tall","pg-thumb-wide","pg-thumb-std","pg-thumb-std",
      "pg-thumb-std","pg-thumb-tall","pg-thumb-wide","pg-thumb-std",
      "pg-thumb-std","pg-thumb-tall","pg-thumb-std","pg-thumb-wide",
      "pg-thumb-std","pg-thumb-std","pg-thumb-tall","pg-thumb-wide",
      "pg-thumb-std","pg-thumb-tall","pg-thumb-wide","pg-thumb-std",
      "pg-thumb-std","pg-thumb-tall","pg-thumb-std","pg-thumb-wide",
    ];
    return pattern[idx % pattern.length];
  };

  const GridThumb = ({ photo, idx }: { photo: Photo; idx: number }) => {
    const isSelected = selectedPhotos.has(photo.id);
    return (
      <div
        className={`pg-thumb ${getSizeClass(idx)} ${isSelected ? "pg-thumb-selected" : ""}`}
        onClick={(e) => {
          if (e.altKey) {
            e.preventDefault();
            setSelectedPhotos(prev => {
              const next = new Set(prev);
              if (next.has(photo.id)) next.delete(photo.id);
              else next.add(photo.id);
              return next;
            });
          } else {
            openLightbox(photo);
          }
        }}
        onContextMenu={(e) => openContextMenu(e, photo)}
      >
        {isSelected && <div className="pg-thumb-sel-badge" />}
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
  };

  return (
    <div className="notes-backup-shell">
      <div className="notes-backup-shell__inner">
        <div className="heros-glass-card notes-unified-card">
          <div className="notes-unified-card__editor">
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
          display: flex; flex-direction: column;
          height: 100vh; height: 100dvh;
          background: var(--shell-outer-bg); overflow: hidden;
        }

        /* ── Title bar ────────────────────────────────────────────────────── */
        .pg-titlebar {
          display: flex; align-items: center; height: 36px; padding: 0 12px;
          background: var(--orch-bg-1); border-bottom: 1px solid var(--orch-line-1);
          flex-shrink: 0; gap: 8px; user-select: none;
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

        /* ── Sidebar — flat section inside the card surface ─────────────────── */
        .pg-sidebar {
          width: 200px; flex-shrink: 0;
          display: flex; flex-direction: column; overflow-y: auto;
          transition: width 200ms, opacity 200ms;
          border-right: 1px solid var(--orch-line-1);
          padding-top: 8px;
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

        /* ── Main content area ─────────────────────────────────────────────── */
        .pg-content { display: flex; flex: 1; min-width: 0; overflow: hidden; }
        .pg-main { flex: 1; min-width: 0; overflow-y: auto; padding: 16px; background: var(--orch-bg-0); }
        .pg-main::-webkit-scrollbar { width: 6px; }
        .pg-main::-webkit-scrollbar-track { background: transparent; }
        .pg-main::-webkit-scrollbar-thumb { background: var(--orch-bg-4); border-radius: 3px; }

        /* ── Date filter panel — Windows Photos vertical timeline ─────────── */
        .pg-date-panel {
          width: 52px; flex-shrink: 0; background: var(--orch-bg-1);
          border-left: 1px solid var(--orch-line-1);
          display: flex; flex-direction: column;
          transition: width 200ms, opacity 200ms;
        }
        .pg-date-panel.collapsed { width: 0; opacity: 0; overflow: hidden; }
        .pg-date-panel-hdr {
          display: none; /* Timeline header hidden — timeline self-contained */
        }
        .pg-date-clear {
          display: none; /* Clear button hidden — click active dot to deselect */
        }

        /* Vertical timeline — year labels + dots */
        .pg-timeline {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; padding: 12px 0; gap: 0;
          overflow-y: auto; overflow-x: hidden;
          position: relative;
        }
        .pg-timeline::-webkit-scrollbar { width: 0; }

        /* Each month is a dot on the timeline */
        .pg-tl-dot {
          position: relative; display: flex; align-items: center;
          justify-content: center; width: 100%; height: 32px;
          cursor: pointer; z-index: 1;
        }
        .pg-tl-dot::before {
          content: ""; position: absolute;
          left: 50%; top: 0; bottom: 0;
          width: 1px; background: var(--orch-line-2);
          transform: translateX(-50%);
        }
        .pg-tl-dot:last-child::before { bottom: 50%; }
        .pg-tl-dot:first-child::before { top: 50%; }

        .pg-tl-dot-inner {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--orch-bg-4); border: 2px solid var(--orch-bg-1);
          position: relative; z-index: 2;
          transition: background150ms, transform 150ms, box-shadow 150ms;
          box-shadow: 0 0 0 0 transparent;
        }
        .pg-tl-dot:hover .pg-tl-dot-inner {
          background: var(--orch-fg-3);
          transform: scale(1.3);
        }
        .pg-tl-dot.selected .pg-tl-dot-inner {
          background: var(--orch-acc-hi);
          transform: scale(1.4);
          box-shadow: 0 0 0 3px rgba(59, 111, 255, 0.25);
        }

        /* Tooltip on hover */
        .pg-tl-dot::after {
          content: attr(title);
          position: absolute; left: calc(100% + 10px); top: 50%;
          transform: translateY(-50%);
          background: rgba(20, 21, 26, 0.96);
          backdrop-filter: blur(10px) saturate(1.4);
          -webkit-backdrop-filter: blur(10px) saturate(1.4);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.9);
          font-size: 11px; font-weight: 500;
          padding: 4px 8px; border-radius: 6px;
          white-space: nowrap; pointer-events: none;
          opacity: 0; transition: opacity 120ms;
          z-index: 100;
        }
        .pg-tl-dot:hover::after { opacity: 1; }

        /* ── Context menu ─────────────────────────────────────────────────── */
        .pg-ctx-overlay {
          position: fixed; inset: 0; z-index: 199;
        }
        .pg-context-menu {
          position: fixed; z-index: 200;
          min-width: 188px; padding: 5px;
          background: rgba(16, 17, 20, 0.96);
          backdrop-filter: blur(20px) saturate(1.5);
          -webkit-backdrop-filter: blur(20px) saturate(1.5);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
          display: flex; flex-direction: column;
          animation: pg-ctx-in 120ms ease;
        }
        @keyframes pg-ctx-in {
          from { opacity: 0; transform: scale(0.94) translateY(-4px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .pg-ctx-item {
          display: flex; align-items: center; gap: 9px;
          padding: 7px 10px; border-radius: 6px;
          font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.85);
          cursor: pointer; transition: background 100ms, color 100ms;
        }
        .pg-ctx-item:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,1); }
        .pg-ctx-item svg { flex-shrink: 0; opacity: 0.7; }
        .pg-ctx-item:hover svg { opacity: 1; }
        .pg-ctx-sep { height: 1px; background: rgba(255,255,255,0.07); margin: 3px 6px; }
        .pg-ctx-danger { color: rgba(255, 80, 80, 0.9); }
        .pg-ctx-danger:hover { background: rgba(255, 50, 50, 0.1); color: rgba(255, 100, 100, 1); }
        .pg-ctx-submenu-parent { justify-content: flex-start; gap: 9px; position: relative; }
        .pg-submenu { display: none; }
        .pg-submenu-visible {
          display: block; position: absolute; left: 100%; top: 0;
          min-width: 200px; margin-left: 2px; padding: 5px; z-index: 201;
          background: rgba(16, 17, 20, 0.96);
          backdrop-filter: blur(20px) saturate(1.5);
          -webkit-backdrop-filter: blur(20px) saturate(1.5);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3);
        }
        .pg-submenu-search {
          display: flex; align-items: center; gap: 7px;
          padding: 5px 8px; margin-bottom: 4px;
          background: rgba(255,255,255,0.04); border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .pg-submenu-search svg { color: rgba(255,255,255,0.4); flex-shrink: 0; }
        .pg-submenu-search input {
          background: none; border: none; outline: none;
          font-size: 12px; color: rgba(255,255,255,0.85);
          width: 100%; caret-color: var(--orch-acc-hi);
        }
        .pg-submenu-search input::placeholder { color: rgba(255,255,255,0.3); }
        .pg-submenu-list { max-height: 200px; overflow-y: auto; }
        .pg-submenu-list::-webkit-scrollbar { width: 3px; }
        .pg-submenu-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        /* ── Selected photo badge ─────────────────────────────────────────── */
        .pg-thumb-selected { outline: 2px solid var(--orch-acc-hi); outline-offset: 1px; }
        .pg-thumb-sel-badge {
          position: absolute; top: 6px; left: 6px; z-index: 5;
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--orch-acc-hi);
          border: 2px solid rgba(255,255,255,0.8);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(59,111,255,0.5);
        }

        /* ── Masonry grid ──────────────────────────────────────────────────── */
        .pg-masonry { columns: 5 160px; column-gap: 4px; }
        .pg-masonry-item { break-inside: avoid; margin-bottom: 4px; display: inline-block; width: 100%; }
        .pg-masonry-dense { columns: 8 80px; column-gap: 2px; }
        .pg-masonry-dense .pg-masonry-item { margin-bottom: 2px; }
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

        /* ── Lightbox (inner styles preserved — Dialog handles overlay/animation) */

        /* Close button — circle with X at top right */
        .pg-lb-close {
          position: absolute; top: 16px; right: 16px; z-index: 10;
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px) saturate(1.5);
          -webkit-backdrop-filter: blur(12px) saturate(1.5);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 200ms, transform 200ms, border-color 200ms;
        }
        .pg-lb-close:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.22);
          transform: scale(1.08);
        }
        .pg-lb-close:active { transform: scale(0.95); }
        .pg-lb-close svg { width: 16px; height: 16px; stroke: rgba(255,255,255,0.85); stroke-width: 2; }

        /* Main image area */
        .pg-lb-body {
          flex: 1; display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden; cursor: default;
        }
        .pg-lb-img {
          max-width: 90%; max-height: 90%; object-fit: contain; border-radius: var(--orch-r-lg);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          transition: opacity 180ms ease, transform 180ms ease;
          user-select: none; pointer-events: none;
          animation: pg-img-reveal 180ms ease;
        }
        @keyframes pg-img-reveal {
          from { opacity: 0.4; transform: scale(0.98); }
          to   { opacity: 1;  transform: scale(1); }
        }

        /* Prev/Next arrows */
        .pg-lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          display: inline-flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px) saturate(1.4);
          -webkit-backdrop-filter: blur(12px) saturate(1.4);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.65); cursor: pointer;
          transition: background 150ms, color 150ms, transform 150ms, border-color 150ms;
        }
        .pg-lb-nav:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.2);
          color: #fff; transform: translateY(-50%) scale(1.06);
        }
        .pg-lb-nav:active { transform: translateY(-50%) scale(0.96); }
        .pg-lb-nav svg { width: 20px; height: 20px; stroke-width: 1.75; }
        .pg-lb-prev { left: 16px; }
        .pg-lb-next { right: 16px; }

        /* Image info overlay — bottom left of image */
        .pg-lb-info {
          position: absolute; bottom: 16px; left: 16px;
          display: flex; flex-direction: column; gap: 3px;
          pointer-events: none;
          background: rgba(8,9,11,0.5);
          backdrop-filter: blur(12px) saturate(1.5);
          -webkit-backdrop-filter: blur(12px) saturate(1.5);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 8px 12px;
          border-radius: var(--orch-r-md);
        }
        .pg-lb-info-name { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9); }
        .pg-lb-info-meta { font-size: 11px; color: rgba(255,255,255,0.55); }

        /* Keyboard hint */
        .pg-lb-hint {
          position: absolute; bottom: 16px; right: 16px;
          font-size: 10px; color: rgba(255,255,255,0.3);
          pointer-events: none;
        }

        /* Neighboring thumbnails strip */
        .pg-lb-strip {
          height: 90px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 0 16px;
          background: rgba(8,9,11,0.65);
          backdrop-filter: blur(16px) saturate(1.5);
          -webkit-backdrop-filter: blur(16px) saturate(1.5);
          border-top: 1px solid rgba(255,255,255,0.07);
          overflow-x: auto;
        }
        .pg-lb-strip::-webkit-scrollbar { height: 3px; }
        .pg-lb-strip::-webkit-scrollbar-track { background: transparent; }
        .pg-lb-strip::-webkit-scrollbar-thumb { background: var(--orch-bg-4); border-radius: 2px; }
        .pg-lb-strip-thumb {
          height: 72px; width: 96px; border-radius: var(--orch-r-sm); overflow: hidden;
          cursor: pointer; flex-shrink: 0; opacity: 0.45;
          transition: opacity 150ms, transform 150ms, box-shadow 150ms;
          border: 2px solid transparent;
        }
        .pg-lb-strip-thumb:hover { opacity: 0.85; transform: scale(1.04); }
        .pg-lb-strip-thumb.active { opacity: 1; border-color: var(--orch-acc-hi); transform: scale(1.06); }
        .pg-lb-strip-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pg-lb-strip-thumb.current { border-color: rgba(255,255,255,0.5); }
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
        <button className={`pg-toolbar-btn ${viewMode === "dense" ? "active" : ""}`} onClick={() => setViewMode("dense")} title="Dense grid"><Grid3x3 size={15} style={{ transform: "scale(0.8)" }} /></button>
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
          <div className="pg-main">
            {viewMode === "grid" ? (
              <div className="pg-masonry">
                {filteredPhotos.map((photo, idx) => (
                  <div key={photo.id} className="pg-masonry-item">
                    <GridThumb photo={photo} idx={idx} />
                  </div>
                ))}
              </div>
            ) : viewMode === "dense" ? (
              <div className="pg-masonry pg-masonry-dense">
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

          {/* Right date filter panel — Windows Photos style vertical timeline */}
          <div className={`pg-date-panel ${dateFilterOpen ? "" : "collapsed"}`}>
            <div className="pg-date-panel-hdr">
              <Calendar size={12} />
              <span>Date</span>
              {selectedMonths.size > 0 && (
                <span className="pg-date-clear" onClick={clearDateFilter}>Clear</span>
              )}
            </div>
            <div className="pg-timeline">
              {allMonthGroups.map((group) => {
                const yr = group.key.split(" ")[1];
                const mo = group.key.split(" ")[0];
                const isSelected = selectedMonths.has(group.key);
                return (
                  <div
                    key={group.key}
                    className={`pg-tl-dot ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleMonth(group.key)}
                    title={`${mo} ${yr}`}
                  >
                    <div className="pg-tl-dot-inner" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Status bar ──────────────────────────────────────────────────── */}
      <div className="pg-statusbar">
        <span><Image size={12} /> {filteredPhotos.length} items</span>
        {selectedMonths.size > 0 && <span><Calendar size={12} /> {selectedMonths.size} month{selectedMonths.size > 1 ? "s" : ""} selected</span>}
        <span style={{ marginLeft: "auto" }}>{viewMode === "dense" ? "Dense" : viewMode === "grid" ? "Grid" : "List"} · Sorted by {sortBy}</span>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      <Dialog open={lightboxOpen} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent
          fullscreen
          className="bg-transparent shadow-none border-0 p-0"
          onWheel={handleWheel}
        >
          {/* Close button — circle + X, top right */}
          <button className="pg-lb-close" onClick={closeLightbox} title="Close (Esc)">
            <X />
          </button>

          {/* Main image area */}
          <div className="pg-lb-body">
            <button className="pg-lb-nav pg-lb-prev" onClick={prevPhoto} title="Previous (←)">
              <ChevronLeft />
            </button>

            <img
              className="pg-lb-img"
              src={filteredPhotos[lightboxIndex]?.url}
              alt={filteredPhotos[lightboxIndex]?.name}
              draggable={false}
            />

            <button className="pg-lb-nav pg-lb-next" onClick={nextPhoto} title="Next (→)">
              <ChevronRight />
            </button>

            {/* Image info bottom left */}
            <div className="pg-lb-info">
              <span className="pg-lb-info-name">{filteredPhotos[lightboxIndex]?.name}</span>
              <span className="pg-lb-info-meta">{filteredPhotos[lightboxIndex]?.date} · {filteredPhotos[lightboxIndex]?.size}</span>
            </div>

            {/* Keyboard hint bottom right */}
            <span className="pg-lb-hint">← → scroll to navigate · Esc to close</span>
          </div>

          {/* Neighboring thumbnails strip */}
          <div className="pg-lb-strip">
            {getNeighborThumbs().map(({ photo, idx }) => {
              const isCurrent = idx === lightboxIndex;
              const isHovered = idx === hoveredNeighborIdx;
              return (
                <div
                  key={photo.id}
                  className={`pg-lb-strip-thumb ${isCurrent ? "current" : ""} ${isHovered && !isCurrent ? "active" : ""}`}
                  onClick={() => goToPhoto(idx)}
                  onMouseEnter={() => setHoveredNeighborIdx(idx)}
                  onMouseLeave={() => setHoveredNeighborIdx(null)}
                >
                  <img src={photo.url} alt={photo.name} draggable={false} />
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Context menu ─────────────────────────────────────────────────── */}
      {contextMenu && (
        <>
          <div className="pg-ctx-overlay" onClick={closeContextMenu} />
          <div className="pg-context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
            <div className="pg-ctx-item" onClick={() => contextAction("open", contextMenu.photo)}>
              <Maximize2 size={13} /> Open
            </div>
            <div className="pg-ctx-item" onClick={() => contextAction("open", contextMenu.photo)}>
              <FolderOpen size={13} /> Open file location
            </div>
            <div className="pg-ctx-sep" />
            <div className="pg-ctx-item" onClick={() => contextAction("select", contextMenu.photo)}>
              <CheckSquare size={13} /> {selectedPhotos.has(contextMenu.photo.id) ? "Deselect" : "Select"}
            </div>
            <div className="pg-ctx-sep" />
            <div className="pg-ctx-item" onClick={() => contextAction("copy_image", contextMenu.photo)}>
              <Image size={13} /> Copy image
            </div>
            <div className="pg-ctx-item" onClick={() => contextAction("copy_path", contextMenu.photo)}>
              <Share2 size={13} /> Copy path
            </div>
            <div className="pg-ctx-sep" />
            <div className="pg-ctx-item" onClick={() => contextAction("favorite", contextMenu.photo)}>
              <Heart size={13} /> {contextMenu.photo.rating === 5 ? "Unfavorite" : "Favorite"}
            </div>
            {/* Move to album — nested submenu, stays open on hover */}
            <div
              className="pg-ctx-sub-wrapper"
              onMouseEnter={() => {
                if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
                setContextSubmenu({ x: 0, y: 0 });
              }}
              onMouseLeave={() => {
                submenuTimeoutRef.current = setTimeout(() => setContextSubmenu(null), 120);
              }}
            >
              <div className="pg-ctx-item pg-ctx-submenu-parent">
                <FolderOpen size={13} /> Move to album
                <ChevronRight size={11} style={{ marginLeft: "auto" }} />
                <div
                  className={`pg-submenu${contextSubmenu ? " pg-submenu-visible" : ""}`}
                  onMouseEnter={() => {
                    if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
                  }}
                  onMouseLeave={() => {
                    submenuTimeoutRef.current = setTimeout(() => setContextSubmenu(null), 120);
                  }}
                >
                  <div className="pg-submenu-search">
                    <Search size={11} />
                    <input
                      type="text"
                      placeholder="Search albums..."
                      value={albumSearch}
                      onChange={(e) => setAlbumSearch(e.target.value)}
                      onMouseEnter={() => {
                        if (submenuTimeoutRef.current) clearTimeout(submenuTimeoutRef.current);
                      }}
                    />
                  </div>
                  <div className="pg-submenu-list">
                    {MOCK_ALBUMS.filter(a => a.name.toLowerCase().includes(albumSearch.toLowerCase())).map(album => (
                      <div key={album.id} className="pg-ctx-item">
                        <FolderOpen size={13} /> {album.name}
                        <span style={{ marginLeft: "auto", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{album.count}</span>
                      </div>
                    ))}
                    {MOCK_ALBUMS.filter(a => a.name.toLowerCase().includes(albumSearch.toLowerCase())).length === 0 && (
                      <div style={{ padding: "8px 12px", fontSize: "11px", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>No albums found</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="pg-ctx-sep" />
            <div className="pg-ctx-item pg-ctx-danger" onClick={() => contextAction("delete", contextMenu.photo)}>
              <Trash2 size={13} /> Delete
            </div>
          </div>
        </>
      )}
          </div>
        </div>
      </div>
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
