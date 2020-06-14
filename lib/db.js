"use strict";

const utils = require("./utils/utils.js");
const MongoClient = require("mongodb").MongoClient;

const collection =
  process.env.NODE_ENV === "production"
    ? process.env.ANDAGA_DB_COLLECTION
    : process.env.ANDAGA_TEST_COLLECTION;

const mongo = {
  name: process.env.ANDAGA_DB_NAME,
  collection: collection,
  url: process.env.ANDAGA_DB_URL,
};

const storeLog = (log) => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(mongo.url, { useNewUrlParser: true });
    client.connect((err) => {
      err
        ? reject(err)
        : console.info("Connected successfully to server to store log");
      const db = client.db(mongo.name);

      insertDocument(db, mongo.collection, log)
        .then((result) => {
          client.close();
          console.info("Log storred successfully");
          resolve(result);
        })
        .catch((err) => {
          client.close();
          reject(err);
        });
    });
  });
};

const insertDocument = (db, collectionName, log) => {
  return new Promise((resolve, reject) => {
    const collection = db.collection(collectionName);
    collection
      .insertOne(log)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getCategories = () => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(mongo.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    client.connect((err) => {
      err
        ? reject(err)
        : console.info(
            "Connected successfully to server to retrieve categories"
          );
      const db = client.db(mongo.name);
      const collection = db.collection(mongo.collection);
      collection
        .distinct("category")
        .then((categories) => {
          client.close();
          resolve(categories.sort());
        })
        .catch((err) => {
          client.close();
          reject(err);
        });
    });
  });
};

const getTags = () => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(mongo.url, { useNewUrlParser: true });
    client.connect((err) => {
      err
        ? reject(err)
        : console.info("Connected successfully to server to retrieve tags");
      const db = client.db(mongo.name);
      const collection = db.collection(mongo.collection);
      collection
        .distinct("tags")
        .then((tags) => {
          client.close();
          resolve(tags.sort());
        })
        .catch((err) => {
          client.close();
          reject(err);
        });
    });
  });
};

const getProjects = () => {
  return new Promise((resolve, reject) => {
    const client = new MongoClient(mongo.url, { useNewUrlParser: true });
    client.connect((err) => {
      err
        ? reject(err)
        : console.info("Connected successfully to server to retrieve projects");
      const db = client.db(mongo.name);
      const collection = db.collection(mongo.collection);
      collection
        .distinct("project")
        .then((projects) => {
          client.close();
          resolve(projects.sort());
        })
        .catch((err) => {
          client.close();
          reject(err);
        });
    });
  });
};

const retrieveLogs = (amount) => {
  return new Promise((resolve, reject) => {
    if (utils.isNumeric(amount)) {
      const client = new MongoClient(mongo.url, { useNewUrlParser: true });
      client.connect((err) => {
        err
          ? reject(err)
          : console.info("Connected successfully to server to retrieve logs");
        const db = client.db(mongo.name);
        const collection = db.collection(mongo.collection);
        collection
          .find({})
          .limit(Number(amount))
          .sort({ _id: -1 })
          .toArray(function (err, logs) {
            client.close();
            if (err) {
              reject(err);
            } else {
              resolve(logs);
            }
          });
      });
    } else {
      reject(new Error("Not a number"));
    }
  });
};

module.exports = {
  getCategories,
  getProjects,
  getTags,
  storeLog,
  retrieveLogs,
};
