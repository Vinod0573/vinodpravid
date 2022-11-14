import { toast } from "react-toastify";
import { setTableSortingColumn } from "../../../redux/logger/report/actions";
import { getValueByReferenceKey } from "../../../utils/getValueByReferenceKey";
import { AppDispatch } from "../../../redux";
import { throtle } from "../../../utils/debounceAndThrotle";
const throtledToast = throtle((e: any) => toast.success(e), 3000);
export const handleAudioClickFunction = (
  e: React.MouseEvent<HTMLElement>,
  url: string,
  setAudioUrl: React.Dispatch<React.SetStateAction<string>>,
  ref: any
) => {
  switch ((e.target as HTMLElement).dataset.type) {
    case "play": {
      setAudioUrl(url);
      if (ref.current) {
        ref.current.playPause();
      }
      break;
    }
    case "replay": {
      if (ref.current) {
        ref.current.replay();
      }
      break;
    }
    case "copy-link": {
      navigator.clipboard.writeText(url);
      throtledToast("Audio URL Copied");
      break;
    }
  }
};

export const handleSortClickFunction = (
  e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  tableSortingColumn: Record<string, "asc" | "desc">,
  dispatch: AppDispatch
) => {
  const key = (e.target as HTMLElement).dataset.referenceKey as string;
  if (Object.keys(tableSortingColumn).length > 0) {
    if (Object.keys(tableSortingColumn)[0] === key)
      if (tableSortingColumn[key] === "asc")
        dispatch(setTableSortingColumn(key, "desc"));
      else dispatch(setTableSortingColumn(key, "asc"));
    else dispatch(setTableSortingColumn(key, "asc"));
  } else dispatch(setTableSortingColumn(key, "asc"));
};

export const getLimitFunc = () => {
  const wrapperElm = document
    .querySelector(".wrapper__table-pravid")
    ?.getBoundingClientRect().height;
  console.log("wrapperElm", wrapperElm);
  return Math.floor(((wrapperElm as number) - 72) / 25);
};

// export const sortTableData = (
//   tableSortingColumn: Record<string, "asc" | "desc">,
//   tableData: any,
//   dispatch: AppDispatch
// ) => {
//   const key = Object.keys(tableSortingColumn)[0];
//   if (key) {
//     const newData = [...tableData];
//     newData.sort((a, b) =>
//       getValueByReferenceKey(a, key)?.localeCompare(
//         getValueByReferenceKey(b, key)
//       )
//     );
//     dispatch(setReportTableData(newData));
//   }
// };
