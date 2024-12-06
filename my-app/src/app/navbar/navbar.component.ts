import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Ilink } from '../model/interface/links';

@Component({
  selector: 'app-navbar',
  imports: [MatTabsModule, RouterOutlet, RouterLink],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  links: Ilink[] = [
    {section: 'Registrar', url: '/register'},
    {section: 'Parqueadero', url: '/parking-lot'},
    {section: 'Historial', url: '/history'}, 
    {section: 'Ajustes', url: '/settings'}
  ];
  activeLink = '';
}
