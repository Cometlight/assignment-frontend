export function es5() {
  function defaults(x) {
    var x = x || 12
    return x
  }

  function rest(x) {
    var args = Array.prototype.slice.call(arguments)
    args.shift()
    return x + ',' + args.join(',')
  }

  function spread(arr) {
    var x = 0
    var y = 0
    var z = 0

    if (arr.length > 0) {
      x = arr[0]
    }
    if (arr.length > 1) {
      y = arr[1]
    }
    if (arr.length > 2) {
      z = arr[2]
    }

    return x + y + z
  }

  return {
    defaults: defaults,
    rest: rest,
    spread: spread
  }
}

export function es6() {
  function defaults(x = 12) {
    return x;
  }

  function rest(...x) {
    return x.join(',');
  }

  function spread(arr) {
    let x, y, z;
    [x=0, y=0, z=0] = arr;
    return x + y + z;
  }

  // Incoming array is spread onto variables x, y, and z
  function spread2(x = 0, y = 0, z = 0) {
    return x + y + z;
  }

  return {
    defaults,
    rest,
    spread,
    spread2
  }
}
