export class Activity {
  id: number;
  date: string;
  type: string;
  subject: string;
  note: string;
  documents: string;
  participantEmails: string[];

  constructor(id: number, date: string, type: string, subject: string, note: string, documents: string,participantEmails: string[]) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.subject = subject;
    this.note = note;
    this.documents = documents;
    this.participantEmails = participantEmails;
  }
}
