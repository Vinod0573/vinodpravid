export interface props {
  title: string;
  data: string[];
  handleSubmit: (data: string[]) => void;
  selected: string[];
}
