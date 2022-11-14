export interface props {
  data: { name: string; id: string }[];
  handleChange: (name: string, id: string) => void;
  title: string;
}
