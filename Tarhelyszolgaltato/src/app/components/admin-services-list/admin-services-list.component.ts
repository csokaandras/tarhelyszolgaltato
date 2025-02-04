import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-services-list',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, DropdownModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './admin-services-list.component.html',
  styleUrl: './admin-services-list.component.scss',
  providers: [MessageService]
})
export class AdminServicesListComponent implements OnInit {

  products:any = [];


  clonedProducts: { [s: string]: any } = {};

  constructor(private api: ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
   
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

}
