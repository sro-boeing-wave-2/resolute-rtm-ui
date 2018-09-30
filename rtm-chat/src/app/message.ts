
export class Message {

  public name: string;
  public emailId: string;
  public messageText: string;
  public timestamp: Date;

  Message() {
    this.name = "";
    this.emailId = "";
    this.messageText = "";
    this.timestamp = null;
  }
}
