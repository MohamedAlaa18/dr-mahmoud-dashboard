import { Component, OnInit } from '@angular/core';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  ngOnInit() {
    $(document).ready(function() {
      $('#example').DataTable(); // Initialize DataTable
    });
  }
}
