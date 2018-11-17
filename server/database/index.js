import { validate } from 'joi';

export default class Collection {
  constructor(name, schema) {
    this.name = name && name.endsWith('s') ? name : `${name}s`;
    this.schema = schema;
    this.store = [];
    this.index = 0;
    this.error = new Error();
  }

  // METHOD TO SAVE THE NEW INCOMING DATA //

  save(data) {
    return new Promise((resolve, reject) => {
      // validate the incoming data to match the schema
      validate(data, this.schema)
        .then((res) => {
          // set some meta information for every saved record
          res.id = this.index.toString();
          this.index++;
          res.createdAt = new Date();
          res.updatedAt = new Date();

          // check whether the collection exists
          if (this.name) {
            this.store.push(res);
            resolve(this.store.sort((a, b) => a.updatedAt < b.updatedAt));
          } else {
            this.error.message = `the ${this.store} collection not found`;
            this.error.name = 'ValidationError';
            reject(this.error);
          }
        })
        .catch((err) => {
          const { details, name } = err;
          reject({ name, ...details[0] });
        });
    });
  }

  // METHOD TO SEARCH FOR DATA IN THE COLLECTION FOR ANY GIVEN SEARCH QUERIES //

  find(args = {}) {
    return new Promise((resolve, reject) => {
      // check whether the collection exists
      if (this.name) {
        // create the found variable and initiate it with the store value
        let found = this.store;
        /**
         * loop through the args object keys and for every key,
         * filter our found to find the items matching the key
         */

        for (const key in args) {
          found = found.filter(elmt => (typeof elmt[key] === 'string'
            ? elmt[key].toLowerCase() === args[key].toLowerCase()
            : elmt[key] === args[key]));
        }
        resolve(found.sort((a, b) => a.updatedAt < b.updatedAt));
      } else {
        this.error.message = `the ${this.store} collection not found`;
        reject(this.error);
      }
    });
  }

  // METHOD TO SEARCH FOR SPECIFIC DATA IN THE COLLECTION FOR A GIVEN ID //

  findById(id) {
    return new Promise((resolve, reject) => {
      const found = this.store.find(order => order.id === id);
      this.error.message = `id ${id}  not found`;
      this.error.name = 'ValidationError';
      found ? resolve(found) : reject(this.error);
    });
  }

  // METHOD TO UPDATE SPECIFIC DATA IN THE COLLECTION FOR A GIVEN ID //

  findByIdAndUpdate(id, args = {}) {
    return new Promise((resolve, reject) => {
      this.findById(id)
        .then((found) => {
          // validate the incoming args to match the schema [not yet covered]

          /**
           * loop through the properties of the matched object
           * for every property of the object matched the given args,
           * replace it with that new args' object value
           */
          for (const key in args) if (args.hasOwnProperty(key)) found[key] = args[key];
          found.updatedAt = new Date();
          resolve(this.store.sort((a, b) => a.updatedAt < b.updatedAt));
        })
        .catch(err => reject({ ...err }));
    });
  }

  // METHOD TO REMOVE SPECIFIC DATA IN THE COLLECTION FOR A GIVEN ID //

  findByIdAndRemove(id) {
    return new Promise((resolve, reject) => {
      // look up in the collection to find the matching item
      this.findById(id)
        .then((res) => {
          // delete the matched item from the collection by splice method
          this.store.splice(this.store[res], 1);
          resolve(this.store.sort((a, b) => a.updatedAt < b.updatedAt));
        })
        .catch(err => reject({ ...err, name: 'not deleted' }));
    });
  }

  /**
   * METHOD TO REMOVE DATA MATCHING THE GIVE SEARCH ARGS OR
   * WIPE THE WHOLE COLLECTION WHEN NOTHING PASSED IN
   */

  remove(args = null) {
    return new Promise((resolve, reject) => {
      // find the data matching the search args
      this.find(args)
        .then((found) => {
          // remove data matched the search args
          found.map(elmt => this.store.splice(this.store.indexOf(elmt), 1));
          if (found === this.store) this.index = 0;
          resolve(this.store.sort((a, b) => a.updatedAt < b.updatedAt));
        })
        .catch(err => reject(err));
    });
  }
}

// END OF THE COLLECTIONS CLASS //
