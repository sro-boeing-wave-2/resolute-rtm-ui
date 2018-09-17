import { Message } from './message';
import { Observable, Subject } from 'rxjs';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private _clientEmail = 'niki@gmail.com';
  private _connection;
  private _conversation = [];
  private _conversationSubject = new Subject<Message[]>();

  constructor() {
    this._connection = new HubConnectionBuilder()
      .withUrl("http://localhost:8084/ChatHub")
      .build();
    this._connection.start()
    .then(_ => {
      console.log("Connection: " + JSON.stringify(this._connection))
      this._connection.invoke('Config', this._clientEmail, 'user', 'Login not working').then(result => {
        console.log("Config Result: " + result);
      });
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
    return this._clientEmail;
  }
}
