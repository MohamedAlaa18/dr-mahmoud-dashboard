import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { UserService } from 'src/app/Services/user/user.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DeleteComponent } from '../Dialog/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomButtonRendererComponent } from '../custom-button-renderer/custom-button-renderer.component';
import { AG_GRID_LOCALE_AR } from '../dashboard/Localisation';
import { CreateUserComponent } from '../Dialog/create-user/create-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  AG_GRID_LOCALE_AR = AG_GRID_LOCALE_AR;
  rowSelection: "single" | "multiple" = "multiple";
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  themeClass: string = "ag-theme-quartz";

  // Pagination state
  currentPage: number = 1;
  totalPages: number = 1;
  totalCount: number = 0;

  // Role ID to Name Mapping
  roleMapping: { [key: number]: string } = {
    1: 'SystemAdmin',
    2: 'ContentManager',
    3: 'Assistant',
    4: 'Student'
  };

  columnDefs: ColDef[] = [
    { headerName: 'الرمز التعريفي', field: 'id', flex: 2 },
    { headerName: 'أسم المستخدم', field: 'fullName', flex: 2 },
    { headerName: 'البريد الإلكتروني', field: 'email', flex: 2 },
    { headerName: 'الهاتف', field: 'mobileNo', flex: 2 },
    { headerName: 'نوع المستخدم', field: 'roles', flex: 2, valueFormatter: this.roleFormatter.bind(this) },
  ];

  rowData: any[] = [];
  gridOptions: { components: { customButtonRenderer: typeof CustomButtonRendererComponent; }; };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private titleService: Title,
    public dialog: MatDialog
  ) {
    this.gridOptions = {
      components: {
        customButtonRenderer: CustomButtonRendererComponent,
      },
    };
  }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.getAllUsers();
  }

  getAllUsers(pageNumber: number = this.currentPage, pageSize: number = this.paginationPageSize, searchQuery?: string) {
    this.userService.getRestUsers(pageNumber, pageSize, searchQuery).subscribe(
      (response) => {
        if (response && response.content.data) {
          console.log(response.content.data);
          this.rowData = response.content.data.filter((user: any) => !user.roles.includes(4));
          this.currentPage = response.content.currentPage || 1;
          this.totalPages = response.content.totalPages || 1;
          this.totalCount = response.content.totalCount || 0;
        } else {
          console.error('Response or response.content.data is undefined');
          this.rowData = [];
        }
      },
      (error) => {
        console.error('Error:', error);
        this.rowData = [];
      }
    );
  }

  openDeleteDialog(id: string, action: string): void {
    this.dialog.open(DeleteComponent, {
      width: '450px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        message: 'هل انت متاكد من حذف المستخدم',
        confirmButtonText: 'حذف المستخدم',
        action: action,
        id: id
      }
    });
  }

  openCreateDialog(): void {
    this.dialog.open(CreateUserComponent, {
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {}
    });
  }

  // Formatter to convert role IDs to role names, handling arrays of role IDs
  roleFormatter(params: any): string {
    const roleIds: number[] = Array.isArray(params.value) ? params.value : [params.value];

    return roleIds.map((id: number) => this.roleMapping[id] || 'Unknown').join(', ');
  }

  defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };
}
