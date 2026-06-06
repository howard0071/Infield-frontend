import { createRoot } from "react-dom/client";
import { FilePlus, Keyboard, Search, X } from "lucide-react";

const shortcutRows = [
  {
    keys: "Ctrl + N",
    label: "Create a new note",
  },
  {
    keys: "Ctrl + T",
    label: "Open a new empty tab",
  },
  {
    keys: "Ctrl + W",
    label: "Close the active tab",
  },
  {
    keys: "Ctrl + 1...9",
    label: "Switch between open tabs",
  },
  {
    keys: "Ctrl + Shift + J",
    label: "Open today's daily note",
  },
];

function ShortcutDemo() {
  return (
    <div className="notes-backup-shell">
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
          --orch-sh-1:
            0 1px 0 rgba(255, 255, 255, 0.03) inset,
            0 1px 2px rgba(0, 0, 0, 0.4);

          --note-bg: var(--orch-bg-0);
          --note-bg-tree: var(--orch-bg-1);
          --note-text-h1: var(--orch-fg-1);
          --note-text-h2: var(--orch-fg-2);
          --note-text-h3: var(--orch-fg-3);
          --note-text-body: var(--orch-fg-2);

          --shell-main-bg: #0d0d0d;
          --shell-main-border: rgba(255, 255, 255, 0.13);
          --shell-main-highlight: rgba(255, 255, 255, 0.045);
          --shell-main-shadow:
            -10px 0 28px rgba(0, 0, 0, 0.28),
            0 22px 52px rgba(0, 0, 0, 0.42),
            0 2px 8px rgba(0, 0, 0, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.045);
          --shell-main-radius: 12px;

          --primitive-black-raised: #151515;
          --primitive-surface-embedded: #1d1d1d;
          --primitive-surface-border: rgba(255, 255, 255, 0.13);
          --on-surface: #eef0f5;
          --heros-text-muted: rgba(255, 255, 255, 0.62);
          --heros-text-faint: rgba(255, 255, 255, 0.56);
          --heros-text-dim: rgba(245, 245, 245, 0.56);
          --heros-editor-font:
            Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
            Helvetica, Arial, sans-serif;
          --heros-editor-body-size: 15px;
          --heros-editor-body-leading: 1.7;
          --font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

          --primitive-menu-bg: rgba(24, 25, 29, 0.96);
          --primitive-menu-border: rgba(255, 255, 255, 0.08);
          --primitive-menu-item-fg: rgba(245, 245, 245, 0.88);
          --primitive-menu-item-fg-hover: #ffffff;
          --primitive-menu-item-bg-hover: rgba(255, 255, 255, 0.07);
          --primitive-menu-muted: rgba(255, 255, 255, 0.38);
          --primitive-menu-divider: rgba(255, 255, 255, 0.07);
          --primitive-menu-radius: 12px;
          --primitive-menu-item-radius: 8px;
          --primitive-menu-padding: 6px;
          --primitive-menu-shadow:
            0 18px 50px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.04);
          --primitive-menu-blur: 18px;
        }

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          width: 100%;
          min-height: 100%;
        }

        body {
          margin: 0;
          background: var(--shell-outer-bg);
          color: var(--orch-fg-1);
        }

        .notes-backup-shell {
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: stretch;
          padding: 14px;
          background: var(--shell-outer-bg);
        }

        .notes-backup-shell__inner {
          width: min(100%, 1140px);
          display: flex;
          align-items: stretch;
          min-height: 100%;
          min-height: calc(100dvh - 28px);
        }

        .notes-backup-shell .notes-unified-card {
          flex: 1;
          min-width: 0;
          min-height: 0;
          overflow: hidden;
          border: 1px solid var(--shell-main-border);
          border-radius: var(--shell-main-radius);
          background: var(--shell-main-bg);
          box-shadow:
            var(--shell-main-shadow),
            inset 0 1px 0 var(--shell-main-highlight);
          font-family: var(--heros-editor-font);
        }

        .primitive-menu-surface {
          background: var(--primitive-menu-bg);
          backdrop-filter: blur(var(--primitive-menu-blur))
            saturate(140%);
          -webkit-backdrop-filter: blur(var(--primitive-menu-blur))
            saturate(140%);
          border: 1px solid var(--primitive-menu-border);
          border-radius: var(--primitive-menu-radius);
          box-shadow: var(--primitive-menu-shadow);
          padding: var(--primitive-menu-padding);
        }

        .notes-backup-shell .notes-unified-card__editor {
          flex: 1;
          min-width: 0;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: var(--note-bg);
          position: relative;
        }

        .notes-empty-tab-view {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
          background: transparent;
          padding: clamp(16px, 3vh, 28px) var(--space-4, 24px);
        }

        .notes-empty-tab-view__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: min(100%, 390px);
          gap: clamp(12px, 2vh, 20px);
          text-align: center;
          color: var(--orch-fg-1);
        }

        .notes-empty-tab-view__header h1 {
          margin: 0;
          color: var(--orch-fg-1);
          font-family: var(--heros-editor-font);
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 760;
          line-height: 1.12;
          letter-spacing: 0.01em;
        }

        .notes-empty-tab-view__header p {
          margin: 8px 0 0;
          color: var(--orch-fg-3);
          font-family: var(--heros-editor-font);
          font-size: clamp(12px, 1.2vw, 14px);
          font-weight: 450;
          line-height: 1.4;
          letter-spacing: 0;
        }

        .notes-empty-tab-view__actions {
          display: grid;
          align-items: stretch;
          width: min(100%, 320px);
          overflow: hidden;
          padding: 0;
        }

        .notes-empty-tab-view__action {
          display: grid;
          grid-template-columns: 30px minmax(0, 1fr) auto;
          align-items: center;
          gap: 11px;
          min-height: 48px;
          background: transparent;
          border: 0;
          color: var(--primitive-menu-item-fg);
          font-family: var(--heros-editor-font);
          cursor: pointer;
          padding: 9px 14px;
          transition:
            color 150ms ease,
            background 150ms ease;
          user-select: none;
          text-align: left;
        }

        .notes-empty-tab-view__action + .notes-empty-tab-view__action {
          border-top: 1px solid var(--primitive-menu-divider);
        }

        .notes-empty-tab-view__action:hover {
          background: var(--primitive-menu-item-bg-hover);
          color: var(--primitive-menu-item-fg-hover);
        }

        .notes-empty-tab-view__action-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border: 1px solid var(--primitive-menu-border);
          border-radius: var(--primitive-menu-item-radius);
          background: color-mix(in srgb, var(--primitive-menu-bg) 82%, transparent);
          color: var(--primitive-menu-item-fg-hover);
        }

        .notes-empty-tab-view__action-icon svg {
          width: 14px;
          height: 14px;
          stroke-width: 1.7;
        }

        .notes-empty-tab-view__action-copy {
          display: grid;
          min-width: 0;
          gap: 3px;
          text-align: left;
        }

        .notes-empty-tab-view__action-copy > span:first-child {
          min-width: 0;
          color: var(--orch-fg-1);
          font-size: 13px;
          font-weight: 720;
          line-height: 1.15;
        }

        .notes-empty-tab-view__action-copy > span:last-child {
          min-width: 0;
          color: var(--primitive-menu-muted);
          font-size: 11px;
          font-weight: 450;
          line-height: 1.25;
        }

        .notes-empty-tab-view__action kbd,
        .notes-empty-tab-view__shortcut kbd {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 18px;
          padding: 0 7px;
          border: 0;
          border-radius: var(--primitive-menu-item-radius);
          background: color-mix(in srgb, var(--primitive-surface-embedded) 90%, transparent);
          color: var(--primitive-menu-item-fg);
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0;
          white-space: nowrap;
        }

        .notes-empty-tab-view__shortcuts {
          width: min(100%, 340px);
          color: var(--primitive-menu-muted);
        }

        .notes-empty-tab-view__shortcuts h2 {
          display: grid;
          grid-template-columns: minmax(12px, 1fr) auto auto minmax(12px, 1fr);
          align-items: center;
          gap: 8px;
          margin: 0 0 8px;
          color: var(--primitive-menu-item-fg-hover);
          font-family: var(--heros-editor-font);
          font-size: 12px;
          font-weight: 720;
          letter-spacing: 0;
        }

        .notes-empty-tab-view__shortcuts h2 svg {
          color: var(--primitive-menu-item-fg-hover);
          stroke-width: 1.8;
        }

        .notes-empty-tab-view__shortcut-heading-line {
          height: 1px;
          background: var(--primitive-menu-divider);
        }

        .notes-empty-tab-view__shortcuts dl {
          display: grid;
          margin: 0;
          overflow: hidden;
          padding: 0;
        }

        .notes-empty-tab-view__shortcut {
          display: grid;
          grid-template-columns: minmax(105px, 0.48fr) minmax(0, 1fr);
          align-items: center;
          gap: 14px;
          min-height: 27px;
          padding: 0 9px;
          border-top: 1px solid var(--primitive-menu-divider);
          text-align: left;
        }

        .notes-empty-tab-view__shortcut:first-child {
          border-top: 0;
        }

        .notes-empty-tab-view__shortcut dt,
        .notes-empty-tab-view__shortcut dd {
          margin: 0;
        }

        .notes-empty-tab-view__shortcut dd {
          min-width: 0;
          color: var(--primitive-menu-muted);
          font-size: 11px;
          font-weight: 450;
          line-height: 1.4;
        }

        @media (max-width: 720px) {
          .notes-backup-shell {
            padding: 9px;
          }

          .notes-empty-tab-view {
            padding: 16px 12px;
          }

          .notes-empty-tab-view__content {
            gap: 14px;
          }

          .notes-empty-tab-view__action {
            grid-template-columns: 30px minmax(0, 1fr);
            gap: 10px;
            min-height: 52px;
            padding: 10px;
          }

          .notes-empty-tab-view__action > kbd {
            grid-column: 2;
            justify-self: start;
            min-height: 18px;
            font-size: 10px;
          }

          .notes-empty-tab-view__shortcut {
            grid-template-columns: 1fr;
            gap: 4px;
            padding: 7px 9px;
          }
        }
      `}</style>

      <div className="notes-backup-shell__inner">
        <div className="heros-glass-card notes-unified-card">
          <div className="notes-unified-card__editor">
            <div className="notes-empty-tab-view">
              <div className="notes-empty-tab-view__content">
                <header className="notes-empty-tab-view__header">
                  <h1>Welcome to your notes</h1>
                  <p>Create a new note or open a file to get started.</p>
                </header>

                <div className="notes-empty-tab-view__actions primitive-menu-surface">
                  <button type="button" className="notes-empty-tab-view__action">
                    <span className="notes-empty-tab-view__action-icon">
                      <FilePlus />
                    </span>
                    <span className="notes-empty-tab-view__action-copy">
                      <span>Create new note</span>
                      <span>Start writing something new.</span>
                    </span>
                    <kbd>Ctrl + N</kbd>
                  </button>

                  <button type="button" className="notes-empty-tab-view__action">
                    <span className="notes-empty-tab-view__action-icon">
                      <Search />
                    </span>
                    <span className="notes-empty-tab-view__action-copy">
                      <span>Go to file</span>
                      <span>Search and open any file.</span>
                    </span>
                    <kbd>Ctrl + O</kbd>
                  </button>

                  <button type="button" className="notes-empty-tab-view__action">
                    <span className="notes-empty-tab-view__action-icon">
                      <X />
                    </span>
                    <span className="notes-empty-tab-view__action-copy">
                      <span>Close</span>
                      <span>Close the active tab.</span>
                    </span>
                    <kbd>Ctrl + W</kbd>
                  </button>
                </div>

                <div className="notes-empty-tab-view__shortcuts">
                  <h2>
                    <span className="notes-empty-tab-view__shortcut-heading-line" />
                    <Keyboard />
                    <span>Note page shortcuts</span>
                    <span className="notes-empty-tab-view__shortcut-heading-line" />
                  </h2>
                  <dl>
                    {shortcutRows.map((row) => (
                      <div className="notes-empty-tab-view__shortcut" key={row.keys}>
                        <dt>
                          <kbd>{row.keys}</kbd>
                        </dt>
                        <dd>{row.label}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

if (typeof window !== "undefined") {
  const mountEl = document.getElementById("root");
  if (mountEl) {
    const root = createRoot(mountEl);
    root.render(<ShortcutDemo />);
  }
}

export default ShortcutDemo;
