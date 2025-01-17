import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Ilink } from '../model/interface/links';

@Component({
  selector: 'app-navbar',
  imports: [MatTabsModule, RouterOutlet, RouterLink, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styles: 'nav {width: 100%}'
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
