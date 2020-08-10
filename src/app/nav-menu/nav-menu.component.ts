import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isCollapsed = true;

  collapse() {
    this.isCollapsed = false;
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
}
