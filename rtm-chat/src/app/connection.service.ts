import { Message } from './message';
import { Observable, Subject } from 'rxjs';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private _connectionId;
  private _connection;
  private _conversation = [];
  private _conversationSubject = new Subject<Message[]>();

  constructor() {
    this._connection = new HubConnectionBuilder()
      .withUrl("http://172.23.238.239:1234/ChatHub")
      .build();
    this._connection.start()
    .then(_ => {
      this._connection.invoke('Config', 'niki@gmail.com', 'user', 'Login not working.');
    });
    this._connection.on('ReceiveMessage', data => {
      console.log("Received message: " + data);
      this._conversation.push(data as Message);
      this._conversationSubject.next(this._conversation);
    });
  }

  public sendMessage(message: string) {
    this._connection.invoke('SendMessage', message);
  }

  public getConversation(): Observable<Message[]> {
    return this._conversationSubject.asObservable();
  }

  public getConnectionId(): string {
    return this._connectionId;
  }
}
