import { UserInfo } from "./user-info";

export class Message {

  to: UserInfo;
  from: UserInfo;
  text: string;
  timestamp: Date;

  Message() {
    this.to = null;
    this.from = null;
    this.text = "";
    this.timestamp = null;
  }
}
