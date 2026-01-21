import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineclamp',
  standalone: true
})
export class LineclampPipe implements PipeTransform {

 transform(value: string, maxCharsPerLine = 45, maxLines = 3): string {
    if (!value) return '';

    const maxLength = maxCharsPerLine * maxLines;

    if (value.length <= maxLength) {
      return value;
    }

    return value.substring(0, maxLength).trim() + '...';
  }

}
