import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Message } from '../message';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-message-text',
  templateUrl: './message-text.component.html',
  styleUrls: ['./message-text.component.css']
})
export class MessageTextComponent implements OnInit {

  @Input()
  _connectionId: string;

  @Input()
  message: Message;

  constructor(private _connection: ConnectionService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer)
  {
    iconRegistry.addSvgIcon(
      'send',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icon-send.svg'));
  }

  ngOnInit() {
    this._connectionId = this._connection.getClientEmail();
    console.log("My Email: " + this._connectionId);
    console.log("Recieved message into message box: " + JSON.stringify(this.message));
  }

}
