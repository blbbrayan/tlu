import {Injectable} from '@angular/core';
import {Account} from './models/account.model';
import {Character} from './models/character.model';
import {DataService} from './data.service';
import {Router} from "@angular/router";
import {Room} from "./models/room.model";
import {AbilityService} from "./abilities.service";
import {ObjectUtil} from "../utils/object.util";
import {Item} from "./models/item.model";
import {Armor} from "./models/item-armor.model";
import {Weapon} from "./models/item-weapon.model";
import {Ability} from "./models/ability.model";

@Injectable()
export class AccountService {

  account: Account;
  character: Character;
  inventory: { item: Item, amount: number }[];
  equipped: { armor: Armor[], weapons: Weapon[] };
  abilities: Ability[] = [];
  room: Room;
  user: { email: string, id: string };

  constructor(private database: DataService, private abilityService: AbilityService, private router: Router) {
    database.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = {email: user.email, id: user.uid};
        user = this.user;

        database.get('account', user.id, account => {
          this.account = (account ? account : database.set('account', user.id, new Account().init(user.id)));
          if(this.account.characterId){
            database.get('characters', this.account.characterId, (obj)=>{
              let save = character => {
                this.character=character;
                this.loadCharacter();
              };
              database.subscribe('characters', this.account.characterId, character=>save(character));
              save(obj);
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

  saveCharacter(character?){
    character = character || ObjectUtil.clone(this.character);
    delete character.effects;
    this.database.save('characters', this.character.id, character);
  }

  reloadCharacter(){
    this.saveCharacter(this.character);
    this.loadCharacter();
  }

  loadCharacter(){
    this.getInventory();
    this.getEquipment();
  }

  getInventory(character?: Character){
    this.character = character ? character : this.character;
    let inventory = this.inventory;
    if(inventory === undefined){
      let ids = this.character.inventoryIds;
      if(ids === undefined) {
        this.character.inventoryIds = [];
        this.inventory = [];
        return null;
      }
      inventory = [];
      ids.forEach(id=>this.database.getItem(id.itemId, item=>{
        item.itemId = id.itemId;
        inventory.push({item: item, amount: id.amount});
      }));
      this.inventory = inventory;
    }
  }

  getEquipment(character?: Character){
    let equipmentLoaded = 0;
    let total = 0;
    if(this.character.equippedIds.weapons)
      total += this.character.equippedIds.weapons.length;
    if(this.character.equippedIds.armor)
      total += this.character.equippedIds.armor.length;
    this.character = character ? character : this.character;
    if(this.character.equippedIds === undefined) {
      this.character.equippedIds = {armor: [], weapons: []};
      this.equipped = {armor: [], weapons: []};
      return null;
    }
    let equipped = this.equipped;
    if(equipped === undefined){
      equipped = {armor: [], weapons: []};
      Object.keys(equipped).forEach(type => {
        let ar = this.character.equippedIds[type];
        if(ar !== undefined)
          ar.forEach(id=>this.database.getItem(id, item=>{
            console.log('loading item', item);
            item.itemId = id;
            equipped[type].push(item);
            equipmentLoaded++;
          }));
      });
    }
    this.equipped = equipped;
    let listener = setInterval(()=>{
      if(equipmentLoaded === total){
        clearInterval(listener);
        console.log('equipment loaded', this.equipped, this.character.equippedIds);
        this.getAbilities(this.character);
      }
    }, 100);
  }

  getAbilities(character?: Character){
    this.character = character ? character : this.character;
    let weapons = this.equipped.weapons;
    if(weapons)
      weapons.forEach(weapon => {
        this.abilities.push(this.abilityService.get(weapon.abilityName));
        console.log('ability', weapon.abilityName, this.abilityService.get(weapon.abilityName));
      });
    console.log('abilities loaded', this.abilities);
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
