export interface props {
  conversation: conversations[];
}
export interface conversations {
  message: string;
  user: "bot" | "customer";
  time: Date;
  intents?: intents[];
}
export interface intents {
  title: string;
  data: string;
  variable?: string;
}
