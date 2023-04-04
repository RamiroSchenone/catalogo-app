import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Pipe({
  name: 'formatPhoneNumber',
})
export class FormatPhoneNumberPipe implements PipeTransform {
  transform(value: string): string {
    const phoneNumber = parsePhoneNumberFromString(value, 'AR');
    if (!phoneNumber) {
      return value;
    }
    return `+${phoneNumber.countryCallingCode} ${phoneNumber.formatNational()}`;
  }
}
