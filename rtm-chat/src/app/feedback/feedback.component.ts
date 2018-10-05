import { ConnectionService } from '../connection.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  @Input() type: string;

  constructor(private _connectionService: ConnectionService) { }

  ngOnInit() {
    console.log("Type of feedback request: " + this.type);
  }

  public submitPositiveFeedback() {
    this._connectionService.setFeedback(5);
  }

  public submitNegativeFeedback() {
    if (this.type === 'Bot') {
      console.log('1');
      this._connectionService.setFeedback(1);
    } else {
      console.log('-1');
      this._connectionService.setFeedback(-1);
    }
  }

}
