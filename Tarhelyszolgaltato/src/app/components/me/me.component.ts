import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule, ConfirmPopupModule],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss',
  providers: [MessageService, ConfirmationService]
})

export class MeComponent implements OnInit {
  user:any = [];
  sajatom:any = [];
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  clonedProducts: { [s: string]: any } = {};
  vanadat:boolean = false

  constructor(private api: ApiService, private messageService: MessageService, private auth: AuthService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
   
    this.api.select("users", "profile").subscribe((res:any)=>{
      this.user = [res];
    })
    try {
      this.getOrder();
    } catch (error) {
      this.vanadat = false
    }
}

getOrder(){
  let en = this.auth.loggedUser();
  this.api.select("orders/byid", en.data.id).subscribe((res:any)=>{
    this.sajatom = [res.results];
    this.vanadat = true
  })
}

accept() {
  this.confirmPopup.accept();
}

reject() {
  this.confirmPopup.reject();
}

confirm(event: Event, order:any) {
  this.confirmationService.confirm({
    target: event.currentTarget as EventTarget,
      message: 'Delete order?',
      accept: () => {
          this.api.delete("orders", order.id).subscribe(res=>{
            if (res) {
              this.api.delete2("deletedb", order.user.name).subscribe(res2=>{
                if (res2) {
                  this.api.delete2("deleteuser", order.user.name).subscribe(res3=>{
                    if (res3) {
                      
                      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Order deleted'});
                      this.sajatom = []
                    }
                  })
                }
              })
            }
          })

      },
      reject: () => {
        this.confirmationService.close();
      }
  });
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
