import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'browse'
})
export class BrowsePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
