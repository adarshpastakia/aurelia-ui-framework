/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

Object.defineProperty(Object.prototype, "forEach", {
  writable: true,
  value: function(callback) {
    Object.entries(this).forEach(entry => callback(entry[1], entry[0]));
  }
});

Object.defineProperty(Array.prototype, "last", {
  writable: true,
  value: function() {
    return this.length > 0 ? this[this.length - 1] : null;
  }
});

Object.defineProperty(Array.prototype, "index", {
  writable: true,
  value: function(matcher) {
    let index = -1;
    [...this].reverse().forEach((o,i) => {
      if(matcher(o)) index = i;
    });
    return this.length - index - 1;;
  }
});

Object.defineProperty(Array.prototype, "lastIndex", {
  writable: true,
  value: function(matcher) {
    let index = -1;
    this.forEach((o,i) => {
      if(matcher(o)) index = i;
    });
    return index;
  }
});

Object.defineProperty(Array.prototype, "remove", {
  writable: true,
  value: function(obj) {
    const idx = this.indexOf(obj);
    if (idx !== -1) {
      this.splice(idx, 1);
    }
    return idx !== -1;
  }
});

Object.defineProperty(Array.prototype, "groupBy", {
  writable: true,
  value: function(property) {
    if (isEmpty(property)) {
      throw new Error("Missing property to groupBy");
    }
    if (isEmpty(this)) {
      return new Map();
    }
    return this.reduce((a, b) => {
      const key = eval(`ev = ${JSON.stringify(b)}.${property}`);
      if (!a.has(key)) {
        a.set(key, []);
      }
      a.get(key).push(b);
      return a;
    }, new Map());
  }
});
Object.defineProperty(Array.prototype, "sortBy", {
  writable: true,
  value: function(property, isAscending = true) {
    if (isEmpty(this)) {
      return [];
    }
    let sorter = (a, b) => ((a < b && isAscending) || (a > b && !isAscending) ? -1 : 1);
    if (typeof property === "string") {
      sorter = (a, b) =>
        a[property].toString().localeCompare(b[property].toString()) * (isAscending ? 1 : -1) === -1 ? -1 : 1;
    } else if (isArray(property)) {
      sorter = (a, b) => {
        for (const p of property) {
          if (a[p] !== undefined && b[p] !== undefined) {
            if (a[p].toString().localeCompare(b[p].toString()) !== 0) {
              return a[p].toString().localeCompare(b[p].toString()) * (isAscending ? 1 : -1) === -1 ? -1 : 1;
            }
          }
        }
      };
    }
    return this.sort(sorter);
  }
});
