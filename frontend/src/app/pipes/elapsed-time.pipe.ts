import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'elapsedTime' })
export class ElapsedTimePipe implements PipeTransform {
  transform(value: number): string {    
    const minutes = Math.floor(value / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} días, ${hours % 24} horas.`;
    } else if (hours > 0) {
      return `${hours} horas, ${minutes % 60} minutos.`;
    } else if (minutes > 0) {
      return `${minutes} minutos.`;
    } else {
      return 'menos de 1 minuto.';
    }
  }
}