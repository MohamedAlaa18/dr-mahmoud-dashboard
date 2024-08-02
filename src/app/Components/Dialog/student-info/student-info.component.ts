import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/Services/student/student.service';
import { ColDef } from 'ag-grid-community';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AG_GRID_LOCALE_AR } from '../../dashboard/Localisation';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  AG_GRID_LOCALE_AR = AG_GRID_LOCALE_AR;
  rowSelection: "single" | "multiple" = "multiple";
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  themeClass: string = "ag-theme-quartz";

  columnDefs: ColDef[] = [
    { headerName: 'الامتحان', field: 'exam', flex: 2 },
    { headerName: 'الدرجات', field: 'examDegrees', flex: 2 },
    { headerName: 'تاريخ بدء الامتحان', field: 'examStartDate', flex: 2 },
    { headerName: 'تاريخ تسليم الامتحان', field: 'examSubmitDate', flex: 2 },
    { headerName: 'الدورات', field: 'courses', flex: 2 },
    { headerName: 'تاريخ الانضمام', field: 'joinDate', flex: 2 },
  ];

  rowData: any[] = [];

  constructor(
    private stdService: StudentService,
    private route: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.stdService.getAllStudent().subscribe(
      (data) => {
        this.rowData = data;
        // console.log(data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };
}
