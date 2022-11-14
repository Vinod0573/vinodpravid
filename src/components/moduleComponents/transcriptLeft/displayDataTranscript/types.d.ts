export interface props {
  data: data[] | [];
  handleSelectOption: (phoneNo: string, sessionId: string, id: string) => void;
  selected?: { sessionId: string; phoneNo: string };
}
export interface data {
  phoneNo: string;
  index: number;
  dropDown: dropdown[];
}
export interface dropdown {
  time: string;
  sessionId: string;
  id: string;
  issue?: boolean;
}
