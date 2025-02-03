import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule, FloatLabelModule, FormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:[MessageService]
})
export class LoginComponent {

  constructor(private api:ApiService,
    private messageService: MessageService){}

  user:any = {
    email:"",
    password:""
  }

  Login(){
    if (this.user.email == "" || this.user.password =="") {
      this.messageService.add({severity: 'error', summary:'Fail', detail:"Hiányzó adatok"})
      return;   
    }
    this.api.login(this.user).subscribe(res=>{
      if (res) {
        this.messageService.add({severity: 'success', summary:'Success', detail:"Sikeres belépés"}) 
      }
    })
    
  }
}
