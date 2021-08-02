import { Injectable } from '@angular/core';

//import { Octokit, App } from "octokit";
import { Octokit } from "@octokit/rest";


@Injectable({
  providedIn: 'root'
})
export class RepoSearchService {

  //const { Octokit, App, Action } = require("octokit");
  private octokit = new Octokit({ auth: `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` });
  public searchResults: Array<any> = [];
  public pageVal: number = 1;

  constructor() { }

  async searchEntries(term: string,page:number) {
    console.log(page)
    if (term == "") {
      console.log("Not defined");
      return [];
    } else {
      let params = {
        q: term,
        per_page: 10,
        page: page
      }
      let promise = await this.octokit.rest.search.repos(params)
        .then(
          result => {
            this.searchResults.forEach(function (item) {
              let rating = Math.floor(item.stargazers_count / 3000);
              item.stargazers_rating = rating > 10 ? 10 : rating;
              item = null;
            })
            let items:any = [];
            result.data.items.forEach((element) => {
              let rating = Math.floor(element.stargazers_count/3000);              
              items.push( {
                name:element.name,
                description:element.description,
                stargazers_count:element.stargazers_count,
                stargazers_rating:rating>10?10:rating
              });

            });
            this.searchResults = items;
            return this.searchResults;
          });

      return promise;
    }
  }

  //returns the response for the initial render
  public _searchEntries(term: any,page:number) {
    return this.searchEntries(term,page);
  }
}
