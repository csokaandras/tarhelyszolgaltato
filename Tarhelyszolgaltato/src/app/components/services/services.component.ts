import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, FormsModule, ConfirmDialogModule, ToastModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  providers:[ConfirmationService, MessageService]
})
export class ServicesComponent implements OnInit {

  constructor(private api:ApiService, private confirmationService: ConfirmationService, private messageService: MessageService, private auth:AuthService
  ){}

  services:any = [];

  ngOnInit(): void {
    this.api.selectAll("products").subscribe((res:any)=>{
      this.services = res;
    })
  }

  confirm(service:any) {
    this.confirmationService.confirm({
        header: 'Confirmation',
        message: 'Do you want to buy it?',
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
            let user = this.auth.loggedUser();
            let data = {
              username: user.data.name,
              dbname: user.data.name,
              privileges: "ALL"
            }
            this.api.post('create-database', data).subscribe(res=>{
              if (res) {
                this.api.post('create-user', data).subscribe((res2:any)=>{
                  if (res2) {
                    this.api.post('grant-privileges', data).subscribe(res3=>{
                      if (res3) {
                        let post = {
                          productId: service.id,
                          userId: user.data.id,
                          domainname: user.data.name,
                          password: res2.password
                        }
                        this.api.insert("orders/", post).subscribe(res4=>{
                          if (res4) {
                            
                            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'You have successfully bought it' });  
                          }
                        })
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
  
}
