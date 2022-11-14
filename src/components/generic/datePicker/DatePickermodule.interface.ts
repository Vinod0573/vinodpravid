export interface props {
  range?: range;
  startDate?: Date;
  onChange: any;
}

export interface range {
  startDate: Date;
  endDate: Date;
}
export interface rangeForCalender extends range {
  key: string;
}
export interface ref {
  getNumberOfDays: any;
  getUpdatedRange: () => {
    startDate: Date;
    endDate: Date;
    totalDays: number;
  };
}
