import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {

  constructor(private api:ApiService){}

  services:any = [];

  ngOnInit(): void {
    this.api.selectAll("products").subscribe((res:any)=>{
      this.services = res;
    })


  }
  
}
