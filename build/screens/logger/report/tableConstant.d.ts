import React from "react";
import { columnInterface } from "./type";
interface argInterface {
    limit: number;
    columnSchema: Array<columnInterface>;
    handleAudioClick: (e: React.MouseEvent<HTMLElement>, url: string, tab: string) => void;
    handleSummaryClick: any;
    handleSortClick: any;
    tableSortingColumn: Record<string, "desc" | "asc">;
    currentAudioState: {
        currentTab: string | undefined;
        isPlaying: boolean;
    };
}
export declare const tableConstant: ({ limit, columnSchema, handleAudioClick, handleSummaryClick, handleSortClick, currentAudioState, tableSortingColumn, }: argInterface) => any[];
export {};
