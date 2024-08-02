import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ColDef } from 'ag-grid-community';
import { TransactionsService } from 'src/app/Services/Transactions/transactions.service';
import { CustomButtonRendererComponent } from '../custom-button-renderer/custom-button-renderer.component';
import { AG_GRID_LOCALE_AR } from '../dashboard/Localisation';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../Dialog/delete/delete.component';
import { GenerateCouponComponent } from '../Dialog/generate-coupon/generate-coupon.component';
import { Clipboard } from '@angular/cdk/clipboard'; // Import Clipboard module

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  AG_GRID_LOCALE_AR = AG_GRID_LOCALE_AR;
  rowSelection: "single" | "multiple" = "multiple";
  paginationPageSize = 10;
  paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  themeClass: string = "ag-theme-quartz";
  role!: string;

  columnDefs: ColDef[] = [
    { headerName: 'الرمز التعريفي', field: 'id', flex: 2 },
    { headerName: 'المبلغ', field: 'amount', flex: 1 },
    { headerName: 'تاريخ الإنشاء', field: 'transactionDate', flex: 2 },
    { headerName: 'تاريخ الإنتهاء', field: 'expiryDate', flex: 2 }, // Fixed field name from 'transactionDate' to 'expiryDate'
    {
      headerName: 'وقف',
      cellRenderer: 'customButtonRenderer',
      flex: 1,
      cellRendererParams: {
        buttons: [
          {
            text: 'delete',
            icon: '<i class="fa fa-trash"></i>',
            action: (id: string) => this.openDeleteDialog(id, 'coupon')
          }
        ]
      }
    },
    {
      headerName: 'نسخ',
      cellRenderer: 'customButtonRenderer',
      flex: 1,
      cellRendererParams: {
        buttons: [
          {
            text: 'copy',
            icon: '<i class="fa-regular fa-copy"></i>',
            action: (id: string) => this.copyCoupon(id)
          }
        ]
      }
    },
  ];

  rowData: any[] = [];
  gridOptions: { components: { customButtonRenderer: typeof CustomButtonRendererComponent; }; };

  constructor(
    private transactionService: TransactionsService,
    private route: ActivatedRoute,
    private titleService: Title,
    public dialog: MatDialog,
    private clipboard: Clipboard // Inject Clipboard service
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

    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionService.getAllTransactions().subscribe(
      (data) => {
        this.rowData = data;
        // console.log(data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  openDeleteDialog(id: string, action: string): void {
    this.dialog.open(DeleteComponent, {
      width: '450px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        message: 'هل انت متاكد من حذف الكوبون',
        confirmButtonText: 'حذف الكوبون',
        action: action,
        id: id
      }
    });
  }

  openCreateDialog(): void {
    this.dialog.open(GenerateCouponComponent, {
      width: '450px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        // You can add any additional data if needed
      }
    });
  }

  copyCoupon(id: string): void {
    const coupon = this.rowData.find((coupon: any) => coupon.id === id);
    if (coupon) {
      this.clipboard.copy(coupon.id);
      // alert('Coupon code copied to clipboard!');
    }
  }

  defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };
}
