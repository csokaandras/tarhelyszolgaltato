import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService, SelectItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss',
  providers: [MessageService]
})

export class MeComponent implements OnInit {
  user:any = [];


  clonedProducts: { [s: string]: any } = {};

  constructor(private api: ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
   
    this.api.select("users", "profile").subscribe((res:any)=>{
      this.user = [res];
    })

}

onRowEditInit(user: any) {
  this.clonedProducts[user.id as string] = { ...user };
}

onRowEditSave(user: any) {
  this.clonedProducts[user.id as string] = { ...user };
  this.api.update('users', user.id, user).subscribe(res => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is updated' });
  });
}

onRowEditCancel(user: any, index: number) {
  this.user[index] = this.clonedProducts[user.id as string];
  delete this.clonedProducts[user.id as string];
}
}
