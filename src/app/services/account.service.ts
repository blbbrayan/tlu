import {Injectable} from '@angular/core';
import {Account} from './models/account.model';
import {Character} from './models/character.model';
import {DataService} from './data.service';
import {Router} from "@angular/router";

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
          console.log('raw account', account, user.id);
          this.account = (account ? account : database.set('account', user.id, new Account().init(user.id)));
          if(this.account.characterId){
            database.get('characters', this.account.characterId, character=>{
              this.character=character;
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
