import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule, FormsModule, FloatLabelModule, PasswordModule, ToastModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  providers:[MessageService]
})
export class RegistrationComponent {

  constructor(private api:ApiService,
    private messageService: MessageService,
    private router:Router){}

  value!: string;

  user:any={
    name:"",
    email:"",
    password:"",
    confirm:""
  }


  Registration(){
    if (this.user.name == "" || this.user.email == "" || this.user.password == "" || this.user.confirm == "") 
    {
        this.messageService.add({severity: 'error', summary:'Fail', detail:"Missing data"})
        return;   
    }

    if (this.user.password != this.user.confirm) 
    {
        this.messageService.add({severity: 'error', summary:'Fail', detail:"Password doesn't match"})
        return;   
    }

    this.api.registration(this.user).subscribe(res=>{
      if (res) {
        this.messageService.add({severity: 'success', summary:'Success', detail:"Successful registration"})   
        this.router.navigateByUrl("/login")
      }
    })

  }
}
