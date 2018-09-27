
export class Message {

  public Name: string;
  public EmailId: string;
  public MessageText: string;
  public Timestamp: Date;

  Message() {
    this.Name = "";
    this.EmailId = "";
    this.MessageText = "";
    this.Timestamp = null;
  }
}
