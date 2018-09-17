import { Message } from './message';
import { ConnectionService } from './connection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rtm-chat';
  public _conversation = [];
  public _connectionId = "";
  public name = "Sankalp Johri";
  public color = "#000a12";

  constructor(private _connectionService: ConnectionService) {
    this._connectionId = this._connectionService.getConnectionId();
    console.log("ConnectionId: " + this._connectionId);
  }

  ngOnInit() {
    console.log("app init called.")
    this._connectionService.getConversation().subscribe(conversation => {
      console.log("Conversation: " + JSON.stringify(conversation));
      this._conversation = conversation;
    });
  }
}
