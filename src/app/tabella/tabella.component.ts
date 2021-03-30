import { Component } from '@angular/core';
import { RestService } from '../rest.service';

export interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/* const dati: Employee[] = [
  {employeeId: 1, firstName: 'Hydrogen', lastName: '1.0079', email: 'H', phone: 'sdj'},
  {employeeId: 2, firstName: 'Helium', lastName: '4.0026', email: 'He', phone: 'sdj'},
  {employeeId: 3, firstName: 'Lithium', lastName: '6.941', email: 'Li', phone: 'sdj'},
  {employeeId: 4, firstName: 'Beryllium', lastName: '9.0122', email: 'Be', phone: 'sdj'},
  {employeeId: 5, firstName: 'Boron', lastName: '10.811', email: 'B', phone: 'sdj'},
  {employeeId: 6, firstName: 'Carbon', lastName: '12.0107', email: 'C', phone: 'sdj'},
  {employeeId: 7, firstName: 'Nitrogen', lastName: '14.0067', email: 'N', phone: 'sdj'},
  {employeeId: 8, firstName: 'Oxygen', lastName: '15.9994', email: 'O', phone: 'sdj'},
  {employeeId: 9, firstName: 'Fluorine', lastName: '18.9984', email: 'F', phone: 'sdj'},
  {employeeId: 10, firstName: 'Neon', lastName: '20.1797', email: 'Ne', phone: 'sdj'},
]; */

@Component({
  selector: 'app-tabella',
  styleUrls: ['tabella.component.css'],
  templateUrl: 'tabella.component.html',
})
export class TabellaComponent {
  constructor(private restClient: RestService) {
    this.loadData();
  }

  colonne: string[] = ['id', 'name', 'surname', 'email', 'phone'];
  data:any;
  errors:any;

  loadData(): void {
    this.restClient.getDataRows("http://localhost:8080/api/tutorial/1.0/employees").subscribe(
      data => this.data = data,
      error => this.errors = error
    )
  }

}