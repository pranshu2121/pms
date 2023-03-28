import { userTypeList } from './../../../comman/User_Type.enum';
import { departmentList } from './../../../comman/Department.enum';
import { UserListService } from "./../services/user-list.service";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { catchError, debounceTime, switchMap } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import { EMPTY } from "rxjs";
import { Department } from "app/comman/Department.enum";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class UsersListComponent implements OnInit {
  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;
  rows: any;
  limit: number = 5;
  ColumnMode = ColumnMode;
  rowCount: number;
  searchBox = new FormControl();
  tableOffset = 0;
  selectRole = userTypeList
  selectDepartment = departmentList
  selectedRole = null;
  selectedDepartment = null
  searchValue = "";
  apiUpdateVal = "";
  columnSortBy;

  query = {
    user_type: null,
    limit: null,
    page: null,
    search: null,
    sortBy: null,
    department: null
  };

  constructor(private _userListService: UserListService) {}

  // set the data in ngx-datatable
  setval(data) {
    this.rows = data.data.data;
    this.rows.map((data:any)=>{return[ data.department = Department[data.department]]})
    this.rowCount = data.data.total;
    this.limit = data.data.limit;
  }

  // comman userlist service subscribe
  Userlistcomman(queryParams) {
    this._userListService.userList(queryParams).subscribe((data) => {
      this.setval(data);
    });
  }

  ngOnInit() {
    // for initial data showing
    this.Userlistcomman({ limit: 5 });

    // for search operatiom ans change offset value on search operatopn
    this.searchBox.valueChanges
      .pipe(
        debounceTime(1000),
        switchMap((changedValue) =>
          this._userListService.userList({
            search: changedValue,
            limit: this.limit,
            page: 1,
            user_type: this.selectedRole,
            sortBy:this.columnSortBy,
            department:this.selectedDepartment
          }).pipe(

            // if api get error then mycontrol will be fail so handle api call here 
            catchError((err) => {
              this.rows = []
              return EMPTY;
            })
          )
        )
      )
      .subscribe((data) => {
        this.tableOffset = 0;
        this.setval(data);
      });
  }

  // for change page in server side
  datatablePageData(queryParams: { [param: string]: any }, event) {
    queryParams.page = event.offset + 1;
    this.tableOffset = event.offset;
    this.Userlistcomman(queryParams);
  }

  // for set limit od data size
  setlimit() {
    this.tableOffset = 0
    this.query = {
      search: this.searchBox.value,
      user_type: this.selectedRole,
      limit: this.limit,
      page: 1,
      sortBy:this.columnSortBy,
      department:this.selectedDepartment
    };

    this.Userlistcomman(this.query );
  }

  filterByRole(event: any) {
    this.tableOffset = 0;
    this.query = {
      search: this.searchBox.value,
      user_type: event === undefined ? null : event?.value,
      limit: this.limit,
      page: 1,
      sortBy:this.columnSortBy,
      department:this.selectedDepartment
    };

    // selectedRole
    this.Userlistcomman(this.query);
  }

  // for sorting data in column
  onSortFile(event) {
    if (event) {
      this.columnSortBy = event.sorts[0].prop + ":" + event.newValue
      let query = {
        search: this.searchBox.value,
        user_type: this.selectedRole === undefined ? null : this.selectedRole,
        limit: this.limit,
        page: 1,
        sortBy: event.sorts[0].prop + ":" + event.newValue,
        department:this.selectedDepartment
      };

      this.Userlistcomman(query);
    }
  }

  // filter by department
  filterByDepartment(event){
    this.tableOffset = 0;
    this.query = {
      search: this.searchBox.value,
      user_type: this.selectedRole === undefined ? null : this.selectedRole,
      limit: this.limit,
      page: 1,
      sortBy:this.columnSortBy,
      department: event === undefined ? null : event?.value
    };

    // selectedRole
    this.Userlistcomman(this.query);
  }


}
