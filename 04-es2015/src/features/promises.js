require('babel-polyfill')

export function es5(cb) {
  setTimeout(function() {
    cb(null, 10) // cb(err, val) ... callback
  }, 1)
}

export function es6() {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {
      resolve(10);
    }, 1);
  });
}
