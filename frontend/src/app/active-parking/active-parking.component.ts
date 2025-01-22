import { Component, inject, Input } from '@angular/core';
import { Parking } from '../model/interface/parking.type';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

const MOTORCYCLE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
	<path fill="currentColor" d="M22.25 8a1.25 1.25 0 1 0 0 2.5h3.35c.677 0 1.293.39 1.582 1.002l3.213 6.79A4.7 4.7 0 0 0 28.75 18h-3.174a8.25 8.25 0 0 0-7.379 4.56L16.977 25H9.5a7.5 7.5 0 1 0 7.23 9.5h4.43a6.25 6.25 0 0 0 5.59-3.455l.773-1.545h-2.796l-.006.014a2 2 0 0 0-.221-.014h-8q-.062 0-.122.004A7.5 7.5 0 0 0 15.09 27.5h13.66a4.75 4.75 0 0 0 4.49-3.195l.967 2.044a7.5 7.5 0 1 0 2.26-1.07l-1.097-2.318q.309.039.63.039h3.75c.69 0 1.25-.56 1.25-1.25v-7.5c0-.69-.56-1.25-1.25-1.25H36c-1.784 0-3.35.935-4.235 2.341l-2.323-4.909A4.25 4.25 0 0 0 25.601 8zM4.5 32.5a5 5 0 1 1 10 0a5 5 0 0 1-10 0m30.8-3.842l2.07 4.377a1.25 1.25 0 1 0 2.26-1.07l-2.07-4.377q.457-.087.94-.088a5 5 0 1 1-3.2 1.158M33.5 18a2.5 2.5 0 0 1 2.5-2.5h2.5v5H36a2.5 2.5 0 0 1-2.5-2.5" />
</svg>`;

@Component({
  selector: 'app-active-parking',
  imports: [
    MatCardModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './active-parking.component.html',
  styleUrl: './active-parking.component.css'
})
export class ActiveParkingComponent {

  @Input() parking!: Parking;

  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIconLiteral('motorcycle', sanitizer.bypassSecurityTrustHtml(MOTORCYCLE_ICON));
  }
}
