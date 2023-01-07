export const TRANSACTION_PAYMENT_TYPE_PAID_RECIPIENTS = 1;
export const TRANSACTION_PAYMENT_TYPE_PAID_SENDER = 3;

export const TRANSACTION_TYPE_RECEIVE = 1;
export const TRANSACTION_TYPE_SEND = 3;
export const TRANSACTION_TYPE_PAY_DEBIT = 5;

export const transactionTypeList = [
  {
    value: TRANSACTION_TYPE_RECEIVE,
    text: 'Nạp tiền',
  },
  {
    value: TRANSACTION_TYPE_SEND,
    text: 'Chuyển khoản',
  },
  {
    value: TRANSACTION_TYPE_PAY_DEBIT,
    text: 'Thanh toán nợ',
  },
];

export const transactionPaymentTypeList = [
  {
    value: TRANSACTION_PAYMENT_TYPE_PAID_RECIPIENTS,
    text: 'Người nhận trả',
  },
  {
    value: TRANSACTION_PAYMENT_TYPE_PAID_SENDER,
    text: 'Người chuyển trả',
  },
];
