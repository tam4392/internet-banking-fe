import { Pipe } from '@angular/core';

@Pipe({
  name: 'currencyVnd',
})
export class CurrencyVndPipe {
  transform(money: any) {
    if (!money) money = 0;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(money);
  }
}
