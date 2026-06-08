import React, { useState, useMemo } from "react";
import {
  Image,
  Heart,
  Star,
  Video,
  FolderOpen,
  Calendar,
  ChevronRight,
  User,
  SlidersHorizontal,
  Grid3x3,
  List,
  Maximize2,
  Download,
  Trash2,
  Share2,
  MoreHorizontal,
  Check,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  Layers,
} from "lucide-react";

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

interface PhotosCollection {
  id: string;
  label: string;
  icon: React.ReactNode;
  count?: number;
  accent?: boolean;
}

// ─── Local screenshot photos ─────────────────────────────────────────────────
const SCREENSHOT_PHOTOS: Photo[] = [
  {
    id: 101,
    url: "/src/assets/Screenshot From 2026-06-06 14-06-03.png",
    date: "June 06, 2026",
    name: "Screenshot From 2026-06-06 14-06-03.png",
    size: "1.9 MB",
    rating: 0,
    w: 1920,
    h: 1080,
  },
  {
    id: 102,
    url: "/src/assets/Screenshot From 2026-06-06 02-19-54.png",
    date: "June 06, 2026",
    name: "Screenshot From 2026-06-06 02-19-54.png",
    size: "128 KB",
    rating: 0,
    w: 1920,
    h: 1080,
  },
  {
    id: 103,
    url: "https://picsum.photos/seed/photo1/800/600",
    date: "June 06, 2026",
    name: "Screenshot From 2026-04-26 22-25-58.png",
    size: "320 KB",
    rating: 0,
    w: 1920,
    h: 1080,
  },
  {
    id: 104,
    url: "https://picsum.photos/seed/photo2/600/900",
    date: "June 06, 2026",
    name: "Screenshot From 2026-04-26 00-18-19.png",
    size: "280 KB",
    rating: 0,
    w: 1920,
    h: 1080,
  },
  {
    id: 105,
    url: "https://picsum.photos/seed/photo3/900/600",
    date: "May 28, 2026",
    name: "Screenshot From 2026-04-26 23-01-32.png",
    size: "310 KB",
    rating: 0,
    w: 1920,
    h: 1080,
  },
  {
    id: 106,
    url: "https://picsum.photos/seed/photo4/600/600",
    date: "May 28, 2026",
    name: "Screenshot From 2026-04-25 19-01-32.png",
    size: "180 KB",
    rating: 0,
    w: 1920,
    h: 1080,
  },
  {
    id: 107,
    url: "https://picsum.photos/seed/photo5/800/500",
    date: "May 15, 2026",
    name: "Screenshot From 2026-05-01 15-21-44.png",
    size: "220 KB",
    rating: 0,
    w: 1920,
    h: 1080,
  },
];

const COLLECTIONS: PhotosCollection[] = [
  { id: "all", label: "All Photos", icon: <Image size={15} />, count: 7 },
  { id: "favorites", label: "Favorites", icon: <Heart size={15} />, count: 0 },
  { id: "videos", label: "Videos", icon: <Video size={15} />, count: 0 },
  { id: "recent", label: "Recent", icon: <Calendar size={15} />, count: 3 },
  { id: "screenshots", label: "Screenshots", icon: <Grid3x3 size={15} />, count: 6 },
  { id: "albums", label: "Albums", icon: <FolderOpen size={15} /> },
  { id: "onedrive", label: "OneDrive", icon: <Layers size={15} />, accent: true },
  { id: "folder", label: "Import from disk", icon: <Download size={15} /> },
];

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

// ─── Thumbnail component ─────────────────────────────────────────────────────
function PhotoThumb({ photo, selected, onSelect, onClick }: {
  photo: Photo;
  selected: boolean;
  onSelect: (id: number) => void;
  onClick: (photo: Photo) => void;
}) {
  return (
    <div className="photos-thumb" onClick={() => onClick(photo)}>
      <div className="photos-thumb-inner">
        <img
          src={photo.url}
          alt={photo.name}
          loading="lazy"
          draggable={false}
        />
        {selected && (
          <div className="photos-thumb-check">
            <Check size={12} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Lightbox component ─────────────────────────────────────────────────────
function PhotosLightbox({ photo, photos, onClose, onNext, onPrev }: {
  photo: Photo;
  photos: Photo[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="photos-lb" onClick={onClose}>
      <button className="photos-lb-close" onClick={onClose}><X size={18} /></button>
      <button className="photos-lb-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}><ChevronRight size={24} style={{ transform: "rotate(180deg)" }} /></button>
      <div className="photos-lb-body" onClick={(e) => e.stopPropagation()}>
        <img src={photo.url} alt={photo.name} />
      </div>
      <button className="photos-lb-next" onClick={(e) => { e.stopPropagation(); onNext(); }}><ChevronRight size={24} /></button>
      <div className="photos-lb-info">
        <span className="photos-lb-name">{photo.name}</span>
        <span className="photos-lb-meta">{photo.date} · {photo.size}</span>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export function PhotosPage() {
  const [activeCollection, setActiveCollection] = useState("all");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const photos = SCREENSHOT_PHOTOS;

  const filteredPhotos = useMemo(() => {
    if (activeCollection === "favorites") return photos.filter(p => p.rating > 0);
    if (activeCollection === "recent") return photos.slice(0, 3);
    if (activeCollection === "screenshots") return photos.filter(p => p.name.toLowerCase().includes("screenshot"));
    return photos;
  }, [activeCollection, photos]);

  const monthGroups = useMemo(() => groupByMonth(filteredPhotos), [filteredPhotos]);

  const toggleSelect = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openLightbox = (photo: Photo) => {
    const idx = filteredPhotos.findIndex(p => p.id === photo.id);
    setLightboxIdx(idx);
  };
  const closeLightbox = () => setLightboxIdx(null);
  const goNext = () => setLightboxIdx(i => i !== null ? Math.min(i + 1, filteredPhotos.length - 1) : null);
  const goPrev = () => setLightboxIdx(i => i !== null ? Math.max(i - 1, 0) : null);

  const handleKey = (e: KeyboardEvent) => {
    if (lightboxIdx === null) return;
    if (e.key === "ArrowRight") goNext();
    else if (e.key === "ArrowLeft") goPrev();
    else if (e.key === "Escape") closeLightbox();
  };
  React.useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIdx]);

  return (
    <div className="photos-page">
      {/* ── Left collection rail ───────────────────────────────────── */}
      <div className="photos-sidebar">
        <div className="photos-sidebar-hdr">Library</div>
        <nav className="photos-col-list">
          {COLLECTIONS.map(col => (
            <div
              key={col.id}
              className={`photos-col-item ${activeCollection === col.id ? "active" : ""}`}
              onClick={() => setActiveCollection(col.id)}
            >
              <span className="photos-col-icon">{col.icon}</span>
              <span className="photos-col-label">{col.label}</span>
              {col.count !== undefined && (
                <span className="photos-col-count">{col.count}</span>
              )}
              {col.id === "onedrive" && (
                <ChevronRight size={12} className="photos-col-arrow" />
              )}
            </div>
          ))}
        </nav>

        <div className="photos-sidebar-divider" />

        {/* People placeholder */}
        <div className="photos-sidebar-hdr" style={{ padding: "8px 16px 4px" }}>People</div>
        <div className="photos-people-empty">
          <User size={20} />
          <span>No people to show</span>
        </div>
      </div>

      {/* ── Center content ─────────────────────────────────────────── */}
      <div className="photos-content">
        {/* Top bar */}
        <div className="photos-topbar">
          <div className="photos-topbar-left">
            <span className="photos-title">
              {COLLECTIONS.find(c => c.id === activeCollection)?.label ?? "Photos"}
            </span>
            <span className="photos-count">{filteredPhotos.length} items</span>
          </div>
          <div className="photos-topbar-right">
            <button className="photos-icon-btn" title="Info"><Info size={15} /></button>
            <button className="photos-icon-btn" title="Zoom out" onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.25))}><ZoomOut size={15} /></button>
            <button className="photos-icon-btn" title="Zoom in" onClick={() => setZoomLevel(z => Math.min(2, z + 0.25))}><ZoomIn size={15} /></button>
            <div className="photos-sep" />
            <button className="photos-icon-btn" title="Select"><Check size={15} /></button>
          </div>
        </div>

        {/* Month groups — Microsoft Photos style */}
        <div className="photos-scroll">
          {monthGroups.map(group => (
            <div key={group.key} className="photos-month-group">
              <div className="photos-month-label">
                {group.label}
              </div>
              <div
                className="photos-grid"
                style={{ "--photos-zoom": zoomLevel } as React.CSSProperties}
              >
                {group.photos.map(photo => (
                  <PhotoThumb
                    key={photo.id}
                    photo={photo}
                    selected={selected.has(photo.id)}
                    onSelect={toggleSelect}
                    onClick={openLightbox}
                  />
                ))}
              </div>
            </div>
          ))}

          {filteredPhotos.length === 0 && (
            <div className="photos-empty">
              <Image size={48} style={{ opacity: 0.2 }} />
              <p>No photos in this collection</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────── */}
      {lightboxIdx !== null && filteredPhotos[lightboxIdx] && (
        <PhotosLightbox
          photo={filteredPhotos[lightboxIdx]}
          photos={filteredPhotos}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </div>
  );
}