export class Account {
  id: string;
  email: string;
  password: string;
  characterId: string;

  constructor() {

  }

  init(email, password, characterId) {
    this.email = email;
    this.password = password;
    this.characterId = characterId;
    return this;
  }
}
