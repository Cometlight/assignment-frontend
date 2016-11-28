export function es5() {
  var o = {}
  var consts = {}

  Object.defineProperty(consts, 'BASE', {
    value: 2
  })

  function constants(val) {
    return Math.pow(consts.BASE, val)
  }

  function scope(n) {
    var sum = 0
    for (var i = 0; i < n; i += 1) {
      sum += i
    }
    return sum
  }

  o.constants = constants
  o.scope = scope

  return o
}

export function es6() {
  let o = {};
  const BASE = 2;

  function constants(val) {
    return Math.pow(BASE, val);
  }

  function scope(n) {
    let sum = 0;
    for (let i = 0; i < n; i += 1) {
      sum += i;
    }
    return i; // return i instead of sum, because the goal of this function is to
              // show that i is out of scope; i is only defined inside the for loop
  }

  o.constants = constants;
  o.scope = scope;

  return o;
}
