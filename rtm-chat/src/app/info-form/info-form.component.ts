import { ConnectionService } from '../connection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.css']
})
export class InfoFormComponent implements OnInit {

  public email = "";
  public query = "";

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
  }

  public submitDetails() {
    console.log("Email: " + this.email);
    console.log("Query: " + this.query);
    this.connectionService.setUserDetails(this.email);
    this.connectionService.startConnection().then(_ => {
      console.log("Connection Established");
      this.connectionService.connectToAgent(this.email, this.query).then(result => {
        if (this.query.charAt(0) == '#') {
          console.log("Getting conversation for " + this.query.substring(1));
          this.connectionService.GetPreviousConversation(this.query.substring(1));
        }
      });
    });
  }
}
