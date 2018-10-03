import { Message } from './message';
import { Observable, Subject } from 'rxjs';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private _clientEmail = "";
  private _clientName = "";
  private _connection;
  private _conversation = [];
  private _conversationSubject = new Subject<Message[]>();

  constructor() {
    this._connection = new HubConnectionBuilder()
      .withUrl("http://13.126.8.255/rtm/ChatHub")
      .build();
    this._connection.on('message', data => {
      console.log("Received message: " + data);
      this._conversation.push(data as Message);
      this._conversationSubject.next(this._conversation);
    });
    this._connection.on('GetFeedback', data => {
      console.error('Received feedback message.');
      var feedbackMessage: Message = new Message();
      feedbackMessage.emailId = "feedbackBot";
      this._conversation.push(feedbackMessage);
      this._conversationSubject.next(this._conversation);
    });
  }

  public startConnection() {
    return this._connection.start();
  }

  public config(query: String) {
    this._connection.invoke('AssignMeToUser', query).then(result => {
      this._connection.invoke('GetConversation', query).then(result => {
        this._conversationSubject.next(result);
      });
      console.log("Config Result: " + result);
    });
  }

  public setUserDetails(email: string) {
    this._clientEmail = email;
    this._clientName = email.split("@")[0];
  }

  public setAgentDetails(email: string, name: string) {
    this._clientEmail = email;
    this._clientName = name;
  }

  public getClientName() {
    return this._clientName;
  }

  public getClientEmail() {
    return this._clientEmail;
  }

  public connectToAgent(email: String, query: String) {
    this._connection.invoke('AllocateMeAnAgent', email, query);
  }

  public sendMessage(message: Message) {
    this._connection.invoke('SendMessage', message);
    this._conversation.push(message);
    this._conversationSubject.next(this._conversation);
  }

  public getConversation(): Observable<Message[]> {
    return this._conversationSubject.asObservable();
  }

  public getConnectionId(): string {
    return this._clientEmail;
  }

  public setFeedback(feedback) {
    return this._connection.invoke('SetFeedback', feedback);
  }
}
