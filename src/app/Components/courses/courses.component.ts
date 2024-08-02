import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ColDef } from 'ag-grid-community';
import { CustomButtonRendererComponent } from '../custom-button-renderer/custom-button-renderer.component';
import { AG_GRID_LOCALE_AR } from '../dashboard/Localisation';
import { MatDialog } from '@angular/material/dialog';
import { CreateCourseComponent } from '../Dialog/create-course/create-course.component';
import { CourseService } from 'src/app/Services/course/course.service';
import { DeleteComponent } from '../Dialog/delete/delete.component';
import { CustomImageRendererComponent } from '../custom-image-renderer/custom-image-renderer.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  AG_GRID_LOCALE_AR = AG_GRID_LOCALE_AR;
  rowSelection: "single" | "multiple" = "multiple";
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  themeClass: string = "ag-theme-quartz";
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  title: string = '';
  description: string = '';
  code: string = '';
  courses: any[] = [];

  columnDefs: ColDef[] = [
    { headerName: 'الصوره', field: 'photoLink', flex: 2, cellRenderer: 'customImageRenderer' },
    { headerName: 'الكود', field: 'code', flex: 2 },
    { headerName: 'السعر', field: 'price', flex: 1 },
    { headerName: 'عنوان الكورس', field: 'title', flex: 2 },
    { headerName: 'الوصف', field: 'description', flex: 2 },
    {
      headerName: 'تعديل',
      cellRenderer: 'customButtonRenderer',
      flex: 1,
      cellRendererParams: {
        buttons: [
          {
            text: 'info',
            icon: '<i class="fa-solid fa-edit"></i>',
            action: (id: string) => this.openUpdate(id)
          }
        ]
      }
    }
  ];

  rowData: any[] = [];
  gridOptions = {
    components: {
      customButtonRenderer: CustomButtonRendererComponent,
      customImageRenderer: CustomImageRendererComponent
    },
    rowHeight: 75,
  };

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private titleService: Title,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses(this.currentPage, this.pageSize, this.title, this.description, this.code)
      .subscribe(
        (response) => {
          this.courses = response.content.data;
          this.totalPages = response.content.totalPages;
          this.rowData = this.courses;
          // console.log(response);
        },
        (error) => {
          console.error('Error fetching courses:', error);
        }
      );
  }

  openGetByIdDialog(id: string): void {
    // Your logic to open dialog with course details by ID
  }

  openDeleteDialog(id: string, action: string): void {
    this.dialog.open(DeleteComponent, {
      width: '450px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        message: 'هل أنت متأكد من حذف الدورة',
        confirmButtonText: 'حذف الدورة',
        action: action,
        id: id
      }
    });
  }

  openCreateDialog(): void {
    this.dialog.open(CreateCourseComponent, {
      // width: '450px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        action: "create"
      }
    });
  }

  openUpdate(id: string): void {
    this.dialog.open(CreateCourseComponent, {
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        action: "update",
        courseId: id,
      }
    });
  }

  defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };
}
