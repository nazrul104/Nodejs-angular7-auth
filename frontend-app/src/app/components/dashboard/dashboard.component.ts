import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userList: Observable<any[]>;

  constructor(private  http: HttpService) {
  }

  ngOnInit() {
  }

  onChange($e) {
    if ($e.target.value !== '') {
      this.http.getUserList($e.target.value).subscribe(result => {
        this.userList = result;
      });
    }
  }
}
