import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string) {
    if (value === '0001-01-01T00:00:00' || value === null) {
      return 'N/A';
    }
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'dd/MM/yy');
    return value;
 }

}
