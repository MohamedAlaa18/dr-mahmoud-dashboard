import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../Dialog/delete/delete.component';
import { CustomButtonRendererComponent } from '../custom-button-renderer/custom-button-renderer.component';
import { AG_GRID_LOCALE_AR } from '../dashboard/Localisation';
import { StudentInfoComponent } from '../Dialog/student-info/student-info.component';
import { DepositComponent } from '../Dialog/deposit/deposit.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  AG_GRID_LOCALE_AR = AG_GRID_LOCALE_AR;
  rowSelection: "single" | "multiple" = "multiple";
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  themeClass: string = "ag-theme-quartz";
  students: any[] = [];
  currentPage = 1;
  totalPages = 1;
  totalCount = 0;

  columnDefs: ColDef[] = [
    { headerName: 'الرمز التعريفي', field: 'id', flex: 3 },
    {
      headerName: 'أسم الطالب', field: 'fullName', flex: 2
    },
    { headerName: 'رقم الطالب', field: 'mobileNo', flex: 2 },
    { headerName: 'رقم الوتساب', field: 'whatsAppNo', flex: 2 },
    // { headerName: 'رقم ولي الأمر', field: '', flex: 2 },
    // {
    //   headerName: 'حذف',
    //   cellRenderer: 'customButtonRenderer',
    //   flex: 1,
    //   cellRendererParams: {
    //     buttons: [
    //       {
    //         text: 'delete',
    //         icon: '<i class="fa fa-trash"></i>',
    //         action: (id: string) => this.openDeleteDialog(id, 'student')
    //       }
    //     ]
    //   }
    // },
    {
      headerName: 'معلومات',
      cellRenderer: 'customButtonRenderer',
      flex: 1,
      cellRendererParams: {
        buttons: [
          {
            text: 'info',
            icon: '<i class="fa-solid fa-info"></i>',
            action: (id: string) => this.openGetByIdDialog(id)
          }
        ]
      }
    },
    {
      headerName: 'شحن',
      cellRenderer: 'customButtonRenderer',
      flex: 1,
      cellRendererParams: {
        buttons: [
          {
            text: 'deposit',
            icon: '<i class="fa-solid fa-money-bill-transfer"></i>',
            action: (id: string) => this.openDeposit(id)
          }
        ]
      }
    },
  ];

  rowData: any[] = [];
  gridOptions: GridOptions = {
    components: {
      customButtonRenderer: CustomButtonRendererComponent,
    },
    onPaginationChanged: this.onPaginationChanged.bind(this)
  };

  constructor(
    private userData: UserService,
    private route: ActivatedRoute,
    private titleService: Title,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);
    this.getStudents();
  }

  getStudents(pageNumber: number = 1, pageSize: number = 10, searchQuery?: string): void {
    this.userData.getStudentUsers(pageNumber, pageSize, searchQuery).subscribe(response => {
      this.students = response.content.data;
      this.rowData = response.content.data;
      this.currentPage = response.content.currentPage;
      this.totalPages = response.content.totalPages;
      this.totalCount = response.content.totalCount;
    }, error => {
      console.error('Error fetching student users:', error);
    });
  }

  onPaginationChanged(params: any): void {
    if (params.newPage || params.newPage === 0) {
      this.getStudents(params.newPage + 1, this.paginationPageSize);
    }
  }

  // openDeleteDialog(id: string, action: string): void {
  //   this.dialog.open(DeleteComponent, {
  //     width: '450px',
  //     panelClass: 'dialog-container',
  //     autoFocus: false,
  //     data: {
  //       message: 'هل انت متاكد من حذف الطالب',
  //       confirmButtonText: 'حذف الطالب',
  //       action: action,
  //       id: id
  //     }
  //   });
  // }

  openGetByIdDialog(id: string): void {
    this.dialog.open(StudentInfoComponent, {
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {}
    });
  }

  openDeposit(id: string): void {
    this.dialog.open(DepositComponent, {
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        stdId: id
      }
    });
  }

  defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };
}
