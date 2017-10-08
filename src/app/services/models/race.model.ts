export class Race {
  id: string;
  name: string;
  desc: string;
  red: number;
  blue: number;
  yellow: number;

  constructor() {
    this.name = "";
    this.desc = "";
    this.red = 0;
    this.blue = 0;
    this.yellow = 0;
  }

  init(name: string, desc: string, red: number, blue: number, yellow: number) {
    this.name = name;
    this.desc = desc;
    this.red = red;
    this.blue = blue;
    this.yellow = yellow;
    return this;
  }

}
