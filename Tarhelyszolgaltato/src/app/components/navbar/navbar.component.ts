import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router:Router){}

  ngOnInit() {

    this.Menu()
   
    }

    Menu(){
      if(sessionStorage.getItem("Kurvaanyád"))
        {
          this.items = [
            {
              label: 'Szolgáltatások',
              icon: 'pi pi-building',
              routerLink: '/service'
          },
          {
            label: 'Saját profil',
            icon: 'pi pi-apple',
            routerLink: '/me'
          },
          {
            label: 'Logout',
            icon: 'pi pi-ban',
            command: this.Logout
          }
          ]
        }
        else{
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

    Logout(){
    sessionStorage.removeItem("Kurvaanyád");
    this.router.navigateByUrl("/login");
    this.Menu();
}

}
