export const DEBIT_STATUS_NOT_PAID = 1;
export const DEBIT_STATUS_PAID = 3;
export const DEBIT_TYPE_COLLECT = 1; //thu nợ
export const DEBIT_TYPE_REMINDER = 3; //nhắc  đòi nợ

export const debitTypeList = [
  {
    value: DEBIT_TYPE_COLLECT,
    text: 'Thu nợ',
  },
  {
    value: DEBIT_TYPE_REMINDER,
    text: 'Nhắc trả nợ',
  },
];

export const debitStatusList = [
  {
    value: DEBIT_STATUS_NOT_PAID,
    text: 'Chưa trả',
  },
  {
    value: DEBIT_STATUS_PAID,
    text: 'Đã trả',
  },
];
