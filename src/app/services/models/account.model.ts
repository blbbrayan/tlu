export class Account {
  id: string;
  characterId: string;

  constructor() {

  }

  init(id) {
    this.id = id;
    return this;
  }
}
