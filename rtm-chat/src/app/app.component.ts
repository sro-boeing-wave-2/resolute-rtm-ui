import { Message } from './message';
import { ConnectionService } from './connection.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, Input } from '@angular/core';

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
  @Input() @Output() public email = "";
  public type;
  @Input() @Output() public query = "";

  constructor(private _connectionService: ConnectionService, private activatedRoute: ActivatedRoute) {
    console.log("Type: " + this.type);
    this.activatedRoute.queryParams.subscribe(params => {
      this._connectionId = params['ticketId'];
      this.type = params['type'] != null ? params['type'] : "user";
      if (this._connectionId != null && this.type == "agent") {
        this._connectionService.startConnection().then(_ => {
          this.configChatAgent(this._connectionId);
        })
      }
    });
  }

  ngOnInit() {
    console.log("app init called.")
    this._connectionService.getConversation().subscribe(conversation => {
      console.log("Conversation: " + JSON.stringify(conversation));
      this._conversation = conversation;
    });
  }

  private configChatAgent(_connectionId: String) {

    this._connectionService.config(this._connectionId);
    console.log("ConnectionId: " + this._connectionId); // Print the parameter to the console.
  }
}
