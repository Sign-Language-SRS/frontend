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

export class Card {
  next_review: Date;
  id: number;
  from_review: string;
  to_review: string;
  constructor(json_data) {
    // json_data is a json object, really any type
    this.next_review = new Date(json_data["next_review"]);
    this.id = json_data["id"];
  
    // for space efficiency, we'll just run through the vocabularies
    const get_vocab_from_id = (review_type_id: number) => {
      for (let i = 0; i < json_data["vocabs"].length; i++) {
        const vocab = json_data["vocabs"][i];
        if (review_type_id == vocab["review_type_id"]) {
          return vocab["vocab"];
        }
      }
      return null;
    }

    this.from_review = get_vocab_from_id(json_data["bin"]["from_review_type_id"]);
    this.to_review = get_vocab_from_id(json_data["bin"]["to_review_type_id"]);
  }
};
