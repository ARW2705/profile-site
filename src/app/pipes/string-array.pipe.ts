import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringArray'
})
export class StringArrayPipe implements PipeTransform {

  transform(value: string[]): string {
    return (value.length > 1) ? value.join(' / '): value[0];
  }

}
