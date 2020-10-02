import { Component, OnInit } from '@angular/core';
import { VkcNgDef } from '@devvikash/vkc-ng-grid';
import { Subject } from 'rxjs';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'vkc-ng-grid-testing';
  public dataSource = [];
  public inlineEditFlag = true;
  gridOptions: VkcNgDef = new VkcNgDef();
  public genderList = [
    { code: 'm', name: 'Male' },
    { code: 'f', name: 'Female' },
    { code: 'o', name: 'Others' }
  ];
  public statesList = [];
  public citiesList = [];
  public changeDetection: Subject<any> = new Subject();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getUserList()
    this.gridOptions = {
      searchPlaceholder: 'Search by name , email or address',
      pageSize: 10,
      dateFormat: 'yyyy-MM-dd',
      keyCodeForNextCell: 13,
      showInlineEdit: this.inlineEditFlag,
      titleForMobileView: 'name',
      pageSizeArray: [5, 10, 20],
      showDeleteButton: false,
      showActivateDeactivateButton: true,
      activateDeactivateCondition: { conditionalProperty: 'status', valueForActivation: 'active', valueForDeactivation: 'inactive' },
      columns: [
        {
          name: '_id',
          label: 'id',
          enable: false,
          searchable: true,
          sortable: true,
          type: 'text',
          editable: false,
          isRequired: false,
        },
        {
          name: 'status',
          label: 'status',
          enable: false,
          searchable: true,
          sortable: true,
          type: 'text',
          editable: false,
          isRequired: false,
        },
        {
          name: 'name',
          label: 'Name',
          enable: true,
          searchable: true,
          sortable: true,
          type: 'text',
          editable: true,
          isRequired: true,
          shouldBeUnique: true,
          min: 10,
          max: 100,
          pattern: '[A-Za-z ]*',
          columnPlaceholder: 'Enter name',
          requiredLabel: 'Please enter name',
          patternLabel: 'Please match the requested format.'
        },
        {
          name: 'email',
          label: 'Email',
          enable: true,
          searchable: true,
          sortable: true,
          type: 'text',
          editable: true,
          isRequired: true,
          columnPlaceholder: 'Enter email',
          pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
          shouldBeUnique: true,
          min: 10,
          max: 100,
          requiredLabel: 'Please enter email',
          patternLabel: 'Please match the requested format.'
        },
        {
          name: 'gender_code',
          label: 'Gender',
          enable: true,
          searchable: false,
          sortable: false,
          type: 'select',
          selectionList: { data: this.genderList, key: 'code', value: 'name' },
          dropdownSelectedValue: 'gender_name',
          editable: true,
          isRequired: true,
          columnPlaceholder: 'Choose Gender',
          requiredLabel: 'Please choose gender'
        },
        {
          name: 'address',
          label: 'Address',
          enable: true,
          searchable: true,
          sortable: false,
          type: 'text',
          editable: true,
          isRequired: true,
          pattern: '[A-Za-z ]*',
          min: 10,
          max: 100,
          columnPlaceholder: 'Enter address',
          requiredLabel: 'Please enter address',
          patternLabel: 'Please match the requested format.'
        },
        {
          name: 'mobile',
          label: 'Mobile',
          enable: true,
          searchable: true,
          sortable: false,
          type: 'text',
          editable: true,
          isRequired: true,
          pattern: '[6-9]{1}[0-9]{9}',
          min: 10,
          max: 10,
          columnPlaceholder: 'Enter mobile',
          requiredLabel: 'Please enter mobile',
          patternLabel: 'Please match the requested format.'
        },
        {
          name: 'dob',
          label: 'Date of birth',
          enable: true,
          searchable: false,
          sortable: false,
          type: 'date',
          editable: true,
          isRequired: true,
          columnPlaceholder: 'Enter your DOB',
          requiredLabel: 'Please enter dob',
          max: new Date()
        },
        {
          name: 'isActive',
          label: 'Active',
          enable: true,
          searchable: false,
          sortable: false,
          type: 'boolean',
          editable: true,
          isRequired: false
        }
      ]
    } as VkcNgDef;
  }

  getUserList() {
    this.dataService.fetchUserList().subscribe((users: any) => {
      this.dataSource = users.data;
    })
  }

  addNewUser(item) {
    setTimeout(() => {
      item.status = 'active';
      this.changeDetection.next(item);
    }, 200);
  }

  updateUser(item) {
    setTimeout(() => {
      this.changeDetection.next(item);
    }, 200);
  }

  onChangeOfDropdown(event) {
    console.log(event);
  }

  initiateAddRecord(event) {
    if (event === null) {
      alert('Custom code goes here');
    } else {
      // call api for dropdown
    }
  }

  initiateUpdateRecord(event) {
    if (this.inlineEditFlag) {
      // call api for dropdown
    } else {
      alert('Custom code goes here');
    }
  }

  addRecord(event) {
    this.addNewUser(event);
  }

  updateRecord(event) {
    this.updateUser(event);
  }

  deleteRecord(event) {
    console.log(event);
  }

  activateRecord(item) {
    item._status = 'active';
    setTimeout(() => {
      this.changeDetection.next(item);
    }, 200);
  }

  deactivateRecord(item) {
    item._status = 'inactive';
    setTimeout(() => {
      this.changeDetection.next(item);
    }, 200);
  }
}

