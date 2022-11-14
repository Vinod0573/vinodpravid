import { AppDispatch } from "../../../redux";
export declare const handleAudioClickFunction: (e: React.MouseEvent<HTMLElement>, url: string, setAudioUrl: React.Dispatch<React.SetStateAction<string>>, ref: any) => void;
export declare const handleSortClickFunction: (e: React.MouseEvent<HTMLImageElement, MouseEvent>, tableSortingColumn: Record<string, "asc" | "desc">, dispatch: AppDispatch) => void;
export declare const getLimitFunc: () => number;
