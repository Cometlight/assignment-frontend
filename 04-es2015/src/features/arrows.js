export function es5() {
  var o = {
    list: [1, 2, 3, 4, 5],
    result: 0,
    sum: function() {
      var that = this
      this.list.forEach(function(val) {
        that.result += val
      })
    }
  }

  o.sum()

  return o
}

export function es6() {
  var o = {
    list: [1, 2, 3, 4, 5],
    result: 0,
    sum() {
      this.result = this.list.reduce((sum, i) => sum += i, 0);
    }
  };

  o.sum();

  return o;
}

// More concise version:
// export function es6() {
//   let o = {
//     result: [1, 2, 3, 4, 5].reduce((sum, i) => sum += i, 0)
//   };
//   return o;
// }
