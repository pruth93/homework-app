import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RepoSearchService } from '../repo-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  public loading: boolean | undefined;;
  public searchResults: any;
  public paginationElements: any;
  public errorMessage: any;
  public page: number = 1;
  public keyWord: string = "";

  constructor(private searchService: RepoSearchService) { }

  public searchForm = new FormGroup({
    search: new FormControl('', Validators.required),
  });

  public search(e: any) {
    if (e != "") {
      this.loading = true;
      //this.keyWord = e.target.value;      
      this.getData(this.keyWord);
    }
  }

  public getData(term: string) {
    let data = this.searchService._searchEntries(term, this.page).then(result => {
      this.paginationElements = result;
      console.log(result);
      this.loading = false;
      this.searchResults = true;
    });
  }

  public nextPage(e: any) {
    this.loading = true;
    this.page = this.page + 1;
    this.getData(this.keyWord)
  }

  public prevPage(e: any) {
    if (this.page  > 1) {
      this.loading = true;
      this.page = this.page - 1;
      this.getData(this.keyWord)
    }


  }

  public columnDefs = [
    { field: 'name' },
    { field: 'description', width: "480px" },
    { field: 'stargazers_count', width: "145px" },
    { field: 'stargazers_rating', width: "145px" }
  ];

  public defaultColDef = {

    wrapText: true,
    autoHeight: true,
    sortable: true,
    resizable: true,
  }

  ngOnInit() {
    this.search("");
  }
}
