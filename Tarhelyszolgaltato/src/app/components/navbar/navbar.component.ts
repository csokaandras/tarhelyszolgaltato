import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
            label: 'Login',
            icon: 'pi pi-turkish-lira',
            routerLink: '/login'
        },
        {
            label: 'Regisztráció',
            icon: 'pi pi-crown',
            routerLink: "/register"
        },

    ]
}
}
