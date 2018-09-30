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
  public static num = 0;

  public email = "";
  public type;
  public query = "";

  constructor(private _connectionService: ConnectionService, private activatedRoute: ActivatedRoute) {
    AppComponent.num++;
    console.log("Invocation count: " + AppComponent.num);
    this.activatedRoute.queryParams.subscribe(params => {
      this._connectionId = params['ticketId'];
      this.type = params['type'] != null ? params['type'] : "user";
      this.email = params['email'] != null ? params['email'] : _connectionService.getClientEmail();
      this.name = params['name'] != null ? params['name'] : _connectionService.getClientName();
      if (this.email != null && this.email != "" && this.name != null && this.name != "") {
        this._connectionService.setAgentDetails(this.email, this.name);
      }
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
