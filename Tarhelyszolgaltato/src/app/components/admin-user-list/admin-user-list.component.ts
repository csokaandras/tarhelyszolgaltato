import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../services/api.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.scss'
})


export class AdminUserListComponent {

  users:any = [];

  cols!: Column[];

  constructor(private api:ApiService) {}

  ngOnInit() {

    this.api.selectAll("users").subscribe(res=>{
      this.users = res
    })

      this.cols = [
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'address', header: 'address' },
        { field: 'phone', header: 'Phone' }
    ];
  }
}
