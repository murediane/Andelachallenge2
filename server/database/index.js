import Joi from 'joi';
import { Pool } from 'pg';
import dbConfig from '../config/db';

export default class Database {
  constructor(schema, tableName, configs = dbConfig.dev) {
    this.pool = new Pool(configs);
    this.table = tableName;
    this.schema = schema;
  }

  end() {
    return this.pool.end();
  }

  createError(err) {
    const { detail: message, name, ...rest } = err;
    return { message, name: 'ValidationError', ...rest };
  }

  connect() {
    return this.pool.connect();
  }

  // createCond(args, operator = 'AND') {
  //   const argsKeys = Object.keys(args);
  //   const values = [];
  //   let keys = '';
  //   argsKeys.map((key, index) => {
  //     values.push(args[key]);
  //     keys += `${key}=$${index + 1}`;
  //     if (index !== argsKeys.length - 1) keys += ` ${operator} `;
  //   });
  //   return { keys, values };
  // }

  createCond(args, operator = 'AND', prevIndex = 0) {
    const argsKeys = Object.keys(args);
    const lastIndex = argsKeys.length - 1;
    const values = [];
    let keys = '';
    argsKeys.map((key, index) => {
      values.push(args[key]);
      keys += `${key}=$${prevIndex + index + 1}`;
      if (index !== lastIndex) keys += ` ${operator} `;
    });
    return { keys, values, lastIndex: lastIndex + 1 };
  }

  // METHOD TO SAVE THE NEW INCOMING DATA

  save(data) {
    return new Promise((resolve, reject) => {
      Joi.validate(data, this.schema)
        .then(res => {
          this.connect()
            .then(client => {
              const resKeys = Object.keys(res);
              const values = [];
              let keys = '';
              let nspace = '';
              resKeys.map((key, index) => {
                values.push(res[key]);
                keys += `${key}`;
                nspace += `$${index + 1}`;
                if (index !== resKeys.length - 1) {
                  keys += ',';
                  nspace += ',';
                }
              });
              client
                .query(
                  `INSERT INTO ${this.table}(${keys}) values(${nspace}) returning*`,
                  values
                )
                .then(response => resolve(response.rows[0]))
                .catch(err => reject(this.createError(err)));
            })
            .catch(err => reject(this.createError(err)));
        })
        .catch(err => {
          const { details, name } = err;
          return reject({ name, ...details[0] });
        });
    });
  }

  // METHOD TO SEARCH FOR DATA IN THE COLLECTION FOR ANY GIVEN SEARCH QUERIES

  find(args = {}) {
    const { keys, values } = this.createCond(args);
    const condition = Object.keys(args).length ? ` WHERE ${keys}` : '';
    return new Promise((resolve, reject) => {
      this.connect()
        .then(client => {
          client
            .query(`SELECT * FROM ${this.table}${condition}`, values)
            .then(data => resolve(data.rows))
            .catch(err => reject(this.createError(err)));
        })
        .catch(err => {
          reject(this.createError(err));
        });
    });
  }

  // METHOD TO SEARCH FOR SPECIFIC DATA IN THE COLLECTION FOR A GIVEN ID //

  findById(id) {
    return new Promise((resolve, reject) => {
      this.find({ id })
        .then(res => {
          res.length
            ? resolve(res[0])
            : reject({ message: ' Item not  found', name: 'QueryError' });
        })
        .catch(err => reject(this.createError(err)));
    });
  }

  // METHOD TO UPDATE SPECIFIC DATA IN THE COLLECTION FOR A GIVEN ID //

  findByIdAndUpdate(id, args = {}) {
    const { keys, values } = this.createCond(args, ',');
    return new Promise((resolve, reject) => {
      this.findById(id)
        .then(found => {
          this.connect()
            .then(client =>
              client.query(
                `UPDATE ${this.table} SET ${keys} WHERE id=${
                  found[0].id
                } returning*`,
                values
              )
            )
            .then(res => resolve(res.rows))
            .catch(err => reject(this.createError(err)));
        })
        .catch(err => reject(this.createError(err)));
    });
  }

  // METHOD TO REMOVE SPECIFIC DATA IN THE COLLECTION FOR A GIVEN ID //

  findByIdAndRemove(id) {
    return new Promise((resolve, reject) => {
      this.findById(id)
        .then(found => {
          this.connect()
            .then(client =>
              client.query(
                `DELETE FROM ${this.table} WHERE id=${found[0]}LIMIT 1 returning*`
              )
            )
            .then(res => resolve(res.rows))
            .catch(err => reject(this.createError(err)));
        })
        .catch(err => reject(this.createError(err)));
    });
  }

  // DELETE ALL RECORDS FROM THE TABLE

  remove(args = null) {
    return new Promise((resolve, reject) => {
      this.find(args)
        .then(found => {
          found.map(elmt => this.store.splice(this.store.indexOf(elmt), 1));
          if (found === this.store) this.index = 0;
          resolve(this.store.sort((a, b) => a.updatedAt < b.updatedAt));
        })
        .catch(err => reject(err));
    });
  }
  update(args = {}, conditions = {}) {
    const { keys, values, lastIndex } = this.createCond(args, ',');
    const { keys: condKeys, values: condValues } = this.createCond(
      conditions,
      'AND',
      lastIndex
    );
    const condition = Object.keys(conditions).length ? `WHERE ${condKeys}` : '';
    return new Promise((resolve, reject) => {
      this.connect()
        .then(client => {
          client
            .query(
              `UPDATE ${this.table} SET ${keys} ${condition} returning*`,
              values.concat(condValues)
            )
            .then(res => resolve(res.rows))
            .catch(err => reject(this.createError(err)));
        })
        .catch(err => reject(this.createError(err)));
    });
  }
}
