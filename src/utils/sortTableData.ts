import { getValueByReferenceKey } from "./getValueByReferenceKey";

export const sortTableData = (
  tableData: any,
  tableSortingColumn: { referenceKey: string; direction: string }
) => {
  const referenceKey = tableSortingColumn.referenceKey;
  const newData = [...tableData];
  if (tableSortingColumn.direction === "asc") {
    newData.sort((a, b) =>
      getValueByReferenceKey(a, referenceKey)?.localeCompare(
        getValueByReferenceKey(b, referenceKey)
      )
    );
  } else {
    newData.sort((a, b) =>
      getValueByReferenceKey(b, referenceKey)?.localeCompare(
        getValueByReferenceKey(a, referenceKey)
      )
    );
  }
  return newData;
};
