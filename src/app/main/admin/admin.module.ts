import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ContentHeaderModule } from "../../layout/components/content-header/content-header.module";
import { CardSnippetModule } from "../../../@core/components/card-snippet/card-snippet.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { CoreSidebarModule } from "../../../@core/components/core-sidebar/core-sidebar.module";

@NgModule({
  declarations: [
  ],
  imports: [
    AdminRoutingModule,
    NgxDatatableModule,
    ContentHeaderModule,
    CardSnippetModule,
    SharedModule,
    NgSelectModule,
    CoreSidebarModule,
  ],
})
export class AdminModule {}
