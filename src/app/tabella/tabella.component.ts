import { Component } from '@angular/core';
import { RestService } from '../rest.service';

export interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-tabella',
  styleUrls: ['tabella.component.css'],
  templateUrl: 'tabella.component.html',
})

export class TabellaComponent {
  constructor(private restClient: RestService) {
    this.loadData();
  }

  colonne: string[] = ['id', 'name', 'surname', 'email', 'phone', 'actions'];
  data:any;
  errors:any;

  loadData(): void {
    this.restClient.getDataRows("http://localhost:8080/api/tutorial/1.0/employees").subscribe(
      data => this.data = data,
      error => this.errors = error
    )
  }
}

