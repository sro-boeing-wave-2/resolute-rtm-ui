import { ConnectionService } from '../connection.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Message } from '../message';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  public _text: string;

  constructor(private _connection: ConnectionService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'send',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icon-send.svg'));
  }

  ngOnInit() {
  }

  public sendMessage() {
    console.log("Sending message: " + this._text );
    let message = new Message();
    message.MessageText = this._text;
    message.EmailId = this._connection.getClientEmail();
    message.Name = this._connection.getClientName();
    message.Timestamp = new Date();
    this._connection.sendMessage(message);
    this._text = "";
  }

}
