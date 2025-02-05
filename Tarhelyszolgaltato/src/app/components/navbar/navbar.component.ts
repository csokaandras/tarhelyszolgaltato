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
                label: 'Services',
                icon: 'pi pi-shopping-cart',
                routerLink: '/service'
              },
              {
                label: 'Manage Services',
                icon: 'pi pi-cog',
                routerLink: '/admin/service'
              },
              {
                label: 'Users',
                icon: 'pi pi-users',
                routerLink: '/admin/users'
            },            
            {
              label: 'Profile',
              icon: 'pi pi-user',
              routerLink: '/me'
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => this.Logout()
            }
            ] : [
              {
                label: 'Services',
                icon: 'pi pi-shopping-cart',
                routerLink: '/service'
            },
            {
              label: 'Profile',
              icon: 'pi pi-user',
              routerLink: '/me'
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => this.Logout()
            }
            ]

          ] : [
            {
              label: 'Login',
              icon: 'pi pi-sign-in',
              routerLink: '/login'
          },
          {
              label: 'Registration',
              icon: 'pi pi-clipboard',
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
