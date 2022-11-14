export interface transcriptInterface {
  allPhoneNumberList: [];
  phoneNumber: string;
  isPhoneNumberLoading: boolean;
  isLoggerOrReport: boolean;
  totalPages: number;
  conversationId: string;
  currentSession: {
    accountName: string;
    conversationId: string;
    phoneNo: string;
    sessionId: string;
  };
}
