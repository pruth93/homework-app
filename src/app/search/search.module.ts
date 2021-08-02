import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
    imports:[
        SearchRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        AgGridModule.withComponents([])
    ],
    declarations: [SearchComponent],
    bootstrap: [SearchComponent]
})
export class SearchModule{}