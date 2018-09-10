import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { UserInfo } from '../user-info';
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
  }

}
