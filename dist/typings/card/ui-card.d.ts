import { UICardContent } from "./ui-card-content";
import { UICardList } from "./ui-card-list";
import { UICardMedia } from "./ui-card-media";
import { UICardMeta } from "./ui-card-meta";
import { UICardTitle } from "./ui-card-title";
declare class UICard {
    protected element: Element;
    width: string;
    minWidth: string;
    maxWidth: string;
    height: string;
    minHeight: string;
    maxHeight: string;
    constructor(element: Element);
}
export declare const Card: (typeof UICardContent | typeof UICardList | typeof UICardMedia | typeof UICardMeta | typeof UICardTitle | typeof UICard)[];
export {};
