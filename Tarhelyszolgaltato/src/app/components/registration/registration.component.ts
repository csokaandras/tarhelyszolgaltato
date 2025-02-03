import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [DividerModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  user:any={
    name:"",
    email:"",
    password:"",
    confirm:""
  }


  Registration(){
    
  }
}
