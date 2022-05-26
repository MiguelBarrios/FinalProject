import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Trade } from "./trade";

export class User {

  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  enabled: boolean;
  role: string;
  email: string;
  biography: string;
  createdAt: Date;
  profilePicture: string;
  account: string;
  trades: Trade[];
  comments: Comment[];
  sentMessages: Message[];
  recMessages: Message[];

  constructor(  id: number = 0, username: string = "", firstName: string = "", lastName: string = "",
   password: string = "", enabled: boolean = true, role: string = "", email: string = "",
   biography: string = "", createdAt: Date, profilePicture: string = "", account: string = "",
    trades: Trade[], comments: Comment[], sentMessages: Message[], recMessages: Message[]) {

      this.id = id,
      this.username = username;
      this.firstName = firstName;
      this.lastName = lastName;
      this.password = password;
      this.enabled = enabled;
      this.role = role;
      this.email = email;
      this.biography = biography;
      this.createdAt = createdAt;
      this.profilePicture = profilePicture;
      this.account = account;
      this.trades = trades;
      this.comments = comments;
      this.sentMessages = sentMessages;
      this.recMessages = recMessages;
  }

}
