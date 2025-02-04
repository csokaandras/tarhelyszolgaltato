import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router:Router,
    private auth:AuthService
  ){}

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe(res=>{
      this.Menu(res)
    })
   
    }

    Menu(isLoggedIn:boolean){

          this.items = [ ...(isLoggedIn) ? [
            ...(this.auth.isAdmin()) ? [

              {
                label: 'Szolgáltatások',
                icon: 'pi pi-building',
                routerLink: '/admin/service'
              },
              {
                label: 'Felhasználók',
                icon: 'pi pi-building',
                routerLink: '/admin/users'
            },
            {
              label: 'Logout',
              icon: 'pi pi-ban',
              command: () => this.Logout()
            }
            ] : [
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
              command: () => this.Logout()
            }
            ]

          ] : [
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
        ]
        
        
    }

    Logout(){
      this.auth.logout();
      this.router.navigateByUrl("/login")
      this.auth.isLoggedIn$.subscribe(res=>{
        this.Menu(res)
        
      })
    
}

}
