import React, { useState, useMemo } from "react";
import {
  Image,
  Heart,
  Video,
  FolderOpen,
  Calendar,
  ChevronRight,
  User,
  Grid3x3,
  Download,
  Check,
  ZoomIn,
  ZoomOut,
  Info,
  Layers,
  X,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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
  { id: "onedrive", label: "OneDrive", icon: <Layers size={15} /> },
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
function PhotoThumb({ photo, selected, onClick }: {
  photo: Photo;
  selected: boolean;
  onClick: (photo: Photo) => void;
}) {
  return (
    <div
      className="relative overflow-hidden rounded cursor-pointer group"
      style={{ aspectRatio: "16/9" }}
      onClick={() => onClick(photo)}
    >
      <img
        src={photo.url}
        alt={photo.name}
        loading="lazy"
        draggable={false}
        className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-[1.03] select-none"
      />
      {selected && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[--orch-acc-hi] flex items-center justify-center">
          <Check size={11} className="text-white" />
        </div>
      )}
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

  const colBase = "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer text-sm transition-colors duration-100";
  const colInactive = cn(colBase, "text-[--orch-fg-2] hover:bg-white/5 hover:text-[--orch-fg-1]");
  const colActive = cn(colBase, "bg-[--orch-acc-hi]/15 text-[--orch-acc-hi]");

  const thumbCols = `grid gap-1 ${zoomLevel >= 1.5 ? "grid-cols-3" : zoomLevel >= 1 ? "grid-cols-4" : "grid-cols-5"}`;

  return (
    <TooltipProvider>
    <div className="flex w-full h-full overflow-hidden bg-[--orch-bg-0]">

      {/* ── Left collection rail ───────────────────────────────────── */}
      <div className="w-[200px] flex-shrink-0 flex flex-col border-r border-white/[0.06] overflow-y-auto pb-4">
        <div className="px-4 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-[--orch-fg-3]">
          Library
        </div>
        <nav className="flex flex-col gap-0.5 px-2">
          {COLLECTIONS.map(col => (
            <div
              key={col.id}
              className={activeCollection === col.id ? colActive : colInactive}
              onClick={() => setActiveCollection(col.id)}
            >
              <span className="flex-shrink-0">{col.icon}</span>
              <span className="flex-1 truncate text-[13px]">{col.label}</span>
              {col.count !== undefined && (
                <span className="text-[11px] text-[--orch-fg-3]">{col.count}</span>
              )}
              {col.id === "onedrive" && (
                <ChevronRight size={11} className="opacity-40 flex-shrink-0" />
              )}
            </div>
          ))}
        </nav>

        <div className="h-px bg-white/[0.06] my-3 mx-4" />

        <div className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-[--orch-fg-3]">
          People
        </div>
        <div className="flex flex-col items-center gap-2 px-4 py-5 text-[--orch-fg-3]">
          <User size={20} />
          <span className="text-[12px] text-center">No people to show</span>
        </div>
      </div>

      {/* ── Center content ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-baseline gap-3">
            <span className="text-[17px] font-semibold text-[--orch-fg-1]">
              {COLLECTIONS.find(c => c.id === activeCollection)?.label ?? "Photos"}
            </span>
            <span className="text-[12px] text-[--orch-fg-3]">{filteredPhotos.length} items</span>
          </div>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8 text-[--orch-fg-2]">
                  <Info size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Info</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8 text-[--orch-fg-2]" onClick={() => setZoomLevel(z => Math.max(0.5, z - 0.25))}>
                  <ZoomOut size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Zoom out</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8 text-[--orch-fg-2]" onClick={() => setZoomLevel(z => Math.min(2, z + 0.25))}>
                  <ZoomIn size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Zoom in</TooltipContent>
            </Tooltip>

            <div className="w-px h-4 bg-white/[0.08] mx-1" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8 text-[--orch-fg-2]">
                  <Check size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Select</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Scrollable photo grid */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {monthGroups.map(group => (
            <div key={group.key} className="mb-7">
              <div className="pb-2.5 text-[13px] font-semibold text-[--orch-fg-2] tracking-wide">
                {group.label}
              </div>
              <div className={thumbCols}>
                {group.photos.map(photo => (
                  <PhotoThumb
                    key={photo.id}
                    photo={photo}
                    selected={selected.has(photo.id)}
                    onClick={openLightbox}
                  />
                ))}
              </div>
            </div>
          ))}

          {filteredPhotos.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-[--orch-fg-3]">
              <Image size={44} className="opacity-20" />
              <p className="text-[13px]">No photos in this collection</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Lightbox via shadcn Dialog ─────────────────────────────── */}
      <Dialog open={lightboxIdx !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent
          fullscreen
          className="bg-black/90 border-0 p-0"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={17} />
          </button>

          {/* Prev */}
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={22} className="rotate-180" />
          </button>

          {/* Image */}
          {lightboxIdx !== null && filteredPhotos[lightboxIdx] && (
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={filteredPhotos[lightboxIdx].url}
                alt={filteredPhotos[lightboxIdx].name}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded"
                draggable={false}
              />
            </div>
          )}

          {/* Next */}
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={22} />
          </button>

          {/* Info */}
          {lightboxIdx !== null && filteredPhotos[lightboxIdx] && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 pointer-events-none">
              <span className="text-[13px] text-white/80 font-medium">{filteredPhotos[lightboxIdx].name}</span>
              <span className="text-[11px] text-white/40">{filteredPhotos[lightboxIdx].date} · {filteredPhotos[lightboxIdx].size}</span>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
    </TooltipProvider>
  );
}