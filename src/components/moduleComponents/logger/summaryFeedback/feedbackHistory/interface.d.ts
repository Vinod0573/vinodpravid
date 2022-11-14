export interface feedbackBodyDataType {
  flow: string;
  category?: string;
  userId: string;
  language: string;
  phoneNo: string;
  sessionId: string;
  conversationId: string;
  accountName: string;
}

export interface summaryDataInterface {
  status: string;
  conversationId: string;
  information: { [key: string]: string };
  id: string;
}
