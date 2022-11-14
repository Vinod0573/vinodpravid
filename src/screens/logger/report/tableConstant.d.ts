import React from "react";
import { columnInterface } from "./type";
interface argInterface {
    limit: number;
    columnSchema: Array<columnInterface>;
    handleAudioClick: (e: React.MouseEvent<HTMLElement>, url: string) => void;
    handleSummaryClick: any;
    handleSortClick: any;
    tableSortingColumn: Record<string, "desc" | "asc">;
}
export declare const tableConstant: ({ limit, columnSchema, handleAudioClick, handleSummaryClick, handleSortClick, tableSortingColumn, }: argInterface) => any[];
export {};
