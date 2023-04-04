import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@Pipe({
  name: 'formatPhoneNumber',
})
export class FormatPhoneNumberPipe implements PipeTransform {
  transform(value: number): string {
    const valueString = value.toString();
    const phoneNumber = parsePhoneNumberFromString(valueString, 'AR');
    if (!phoneNumber) {
      return valueString;
    }
    return `+${phoneNumber.countryCallingCode} ${phoneNumber.formatNational()}`;
  }
}
