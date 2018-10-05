import { ConnectionService } from '../connection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(private _connectionService: ConnectionService) { }

  ngOnInit() {
  }

  public submitPositiveFeedback() {
    this._connectionService.setFeedback(5);
  }

  public submitNegativeFeedback() {
    this._connectionService.setFeedback(1);
  }

}
