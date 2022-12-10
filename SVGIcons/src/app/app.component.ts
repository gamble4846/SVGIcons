import { Component } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GoogleAppScriptsService } from './Services/GoogleAppScriptsService/google-app-scripts.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SVGIcons';

  AllIconsData:any = [];
  AllIconsTotal:number = 0;
  AllIconsPageSize:number = 10;
  AllIconsPageIndex:number = 1;
  ShowIconModal:boolean = false;
  IconStyleData:any = [];
  OpenedIcon:any = "";

  constructor(private GoogleAppScripts:GoogleAppScriptsService, private NzMessage:NzMessageService) { }

  ngOnInit(): void {
    this.GetAllIcons();
  }

  IconsTableOnQueryParamsChange(params: NzTableQueryParams): void {
    this.AllIconsPageIndex = params.pageIndex;
    this.AllIconsPageSize = params.pageSize;
    this.GetAllIcons();
  }

  GetAllIcons(){
    this.GoogleAppScripts.GetALLICONS(this.AllIconsPageIndex,this.AllIconsPageSize).subscribe((response:any) => {
      if(response.status == "200"){
        this.AllIconsData = response.data.Data;
        this.AllIconsTotal = response.data.TotalRecords;
        this.AllIconsPageSize = response.data.ResultsPerPage;
        this.AllIconsPageIndex = response.data.Page;
      }
    })
  }

  GetIconStyleByIconId(){
    this.GoogleAppScripts.GetICONSTYLEBYICONID(this.OpenedIcon.IconId).subscribe((response:any) => {
      if(response.status == "200"){
        this.IconStyleData = response.data;
        console.log(this.IconStyleData);
      }
    })
  }

  OpenIcon(IconData:any){
    this.OpenedIcon = IconData;
    this.ShowIconModal = true;
    this.GetIconStyleByIconId();
  }

  HideIconModal(){
    this.ShowIconModal = false;
  }

  IconStyleClicked(IconStyleData:any){
    navigator.clipboard.writeText(IconStyleData.SVG);
    this.NzMessage.success("SVG Copied");
  }
}
