export declare namespace UITether {
    type Position = "tl" | "tr" | "bl" | "br" | "tc" | "bc";
    interface Tether {
        dispose(): void;
        updatePosition(newAnchor?: Element): void;
    }
    interface TetherConfig {
        resize?: boolean;
        attachToViewport?: boolean;
        position?: Position;
        anchorPosition?: Position;
    }
    function tether(anchorEl: Element, dropdownEl: HTMLDivElement, config?: TetherConfig): {
        dispose: () => void;
        updatePosition: (newAnchorEl?: Element) => void;
    };
}
