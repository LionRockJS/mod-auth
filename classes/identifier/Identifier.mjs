import { ORM } from '@lionrockjs/central';

export default class Identifier {
  static Model = ORM.require('IdentifierUser');

  static isPostDataContainsIdentifierField(postData){
    return true;
  }

  static async getName(postData) {
    return postData.username;
  }

  // eslint-disable-next-line class-methods-use-this
  static async registerFilter(modelInstance, postData, state={}) {}

  // eslint-disable-next-line class-methods-use-this
  static async loginFilter(modelInstance, postData, state={}) {}
}