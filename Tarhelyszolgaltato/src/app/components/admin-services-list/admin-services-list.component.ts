import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-admin-services-list',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule, FloatLabelModule, ConfirmPopupModule],
  templateUrl: './admin-services-list.component.html',
  styleUrl: './admin-services-list.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class AdminServicesListComponent implements OnInit {

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  products:any = [];
  newproduct:any = {
    name:"",
    category:"",
    description:"",
    price:0
  };

  clonedProducts: { [s: string]: any } = {};

  constructor(private api: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
   this.getProducts();


  }

accept() {
  this.confirmPopup.accept();
}

reject() {
  this.confirmPopup.reject();
}

confirm(event: Event, product:any) {
  this.confirmationService.confirm({
    target: event.currentTarget as EventTarget,
      message: 'Delete product?',
      accept: () => {
          this.api.delete("products", product.id).subscribe(res=>{
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Product deleted'});
            this.getProducts();
          })

      },
      reject: () => {
        this.confirmationService.close();
      }
  });
}

getProducts(){
  this.api.selectAll("products").subscribe((res:any)=>{
    this.products = res;
  })
}

onRowEditInit(product: any) {
  this.clonedProducts[product.id as string] = { ...product };
}

onRowEditSave(product: any) {
  if (product.price > 0) {
      delete this.clonedProducts[product.id as string];
      this.api.update('products', product.id, product).subscribe(res =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });

      });
  } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
  }
}

onRowEditCancel(product: any, index: number) {
  this.products[index] = this.clonedProducts[product.id as string];
  delete this.clonedProducts[product.id as string];
}
  onRowDelete(product:any){
    
  }

newProduct(){

  if (this.newproduct.name == "" || this.newproduct.category == "" || this.newproduct.description == "" || this.newproduct.price == 0) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Missing data' });
  }

  this.api.insert("products", this.newproduct).subscribe(res=>{
    this.messageService.add({ severity: 'success', summary: 'OK', detail: 'New product added' });
    this.getProducts();
  })

}

}
