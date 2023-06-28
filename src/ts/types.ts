// defining common types to use throughout
export class Deck {
  name: string;
  created_on: Date;
  id: number;
  constructor(name: string, created_on: string, id: number) {
    this.name = name;
    this.created_on = new Date(created_on);
    this.id = id;
  }
};
