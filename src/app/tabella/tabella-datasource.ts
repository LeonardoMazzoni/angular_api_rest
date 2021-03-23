import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface TabellaItem {
  employeeId: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
}

// TODO: replace this with real data from your application
var x: any;
var xhr = new XMLHttpRequest()
xhr.open("GET", "http://localhost:8080/api/tutorial/1.0/employees", true);
xhr.setRequestHeader("Accept" ,"*/*");
xhr.onreadystatechange = function() {
  if (xhr.readyState === xhr.DONE && xhr.status === 200) {
    const dati: TabellaItem[] = JSON.parse(xhr.response);
    x = dati;
  }
};




/**
 * Data source for the Tabella view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TabellaDataSource extends DataSource<TabellaItem> {
  data: TabellaItem[] = x;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TabellaItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TabellaItem[]): TabellaItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TabellaItem[]): TabellaItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'email': return compare(+a.email, +b.email, isAsc);
        case 'lastName': return compare(+a.lastName, +b.lastName, isAsc);
        case 'phone': return compare(+a.phone, +b.phone, isAsc);
        case 'employeeId': return compare(+a.employeeId, +b.employeeId, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
