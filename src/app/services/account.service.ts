import {Injectable} from '@angular/core';
import {Account} from './models/account.model';
import {Character} from './models/character.model';
import {DataService} from './data.service';
import {Router} from "@angular/router";
import {variable} from "@angular/compiler/src/output/output_ast";

// import {ObjectUtil} from '../utils/object.util';

@Injectable()
export class AccountService {

  account: Account;
  character: Character;
  user: { email: string, id: string };

  constructor(private database: DataService, private router: Router) {
    database.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = {email: user.email, id: user.uid};
        user = this.user;

        database.get('account', user.id, account => {
          this.account = (account ? account : database.set('account', user.id, new Account().init(user.id)));
          if(this.account.characterId){
            database.get('characters', this.account.characterId, character=>{
              this.character=character;
              this.getInventory();
              this.getEquipment();
              router.navigate(['/home']);
            });
          }
          else
            router.navigate(['/create-character']);
          console.log('account', this.account);
        });
      }
    });
  }

  saveCharacter(){
    delete this.character.inventory;
    delete this.character.effects;
    delete this.character.equipped;
    this.database.save('characters', this.character.id, this.character);
    this.getInventory();
    this.getEquipment();
  }

  getInventory(character?: Character){
    this.character = character ? this.character : this.character;
    let inventory = this.character.inventory;
    if(inventory === undefined){
      let ids = this.character.inventoryIds;
      if(ids === undefined) {
        this.character.inventoryIds = [];
        this.character.inventory = [];
        return null;
      }
      inventory = [];
      ids.forEach(id=>this.database.getItem(id.itemId, item=>{
        item.itemId = id.itemId;
        inventory.push({item: item, amount: id.amount});
      }));
      this.character.inventory = inventory;
    }
  }

  getEquipment(character?: Character){
    this.character = character ? this.character : this.character;
    if(this.character.equippedIds === undefined) {
      this.character.equippedIds = {armor: [], weapons: []};
      this.character.equipped = {armor: [], weapons: []};
      return null;
    }
    let equipped = this.character.equipped;
    if(equipped === undefined){
      equipped = {armor: [], weapons: []};
      Object.keys(equipped).forEach(type => {
        let ar = this.character.equippedIds[type];
        if(ar !== undefined)
          ar.forEach(id=>this.database.getItem(id, item=>{
            item.itemId = id;
            equipped[type].push(item)
          }));
      });
    }
    this.character.equipped = equipped;
  }

  addItem(key, amount){
    if(this.character.inventoryIds === undefined)
      this.character.inventoryIds = [];
    let invItem = this.character.inventoryIds.find(e=>e.itemId === key);
    if(invItem)
      invItem.amount += amount;
    else
      this.character.inventoryIds.push({amount: amount, itemId: key});
    this.saveCharacter();
  }

  createCharacter(characterId: string) {
    this.account.characterId = characterId;
    this.database.save('account', this.account.id, this.account);
  }

  createAccount(email: string, password: string, onfinish: any, onerror: any): void {
    this.database.firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => onfinish())
      .catch(error => onerror({code: error.code, message: error.message}));
  }

  signIn(email: string, password: string, onerror: any) {
    this.database.firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => onerror({code: error.code, message: error.message}));
  }
}
