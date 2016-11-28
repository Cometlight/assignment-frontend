import {uuid} from '../utils/index'

export function es5() {
  var module = require('../utils')
  return module.uuid()
}

export function es6() {
  return uuid();
}

/* Alternative:
  import * as Utils from '../utils/index'
  export function es6_alternative() {
    return Utils.uuid();
  }
*/
