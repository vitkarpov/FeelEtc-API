"use strict";
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
const uuid = require("uuid/v4");

const usersTable = process.env.USERS_TABLE;

module.exports.addUser = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);
  const { name, age, sex } = reqBody;

  if (!name) {
    return callback(
      null,
      response(400, {
        error: "User must have at least name"
      })
    );
  }
  if (!validSex(sex)) {
    return callback(400, { error: "Sex must be either M or F" });
  }

  const record = {
    id: uuid(),
    createdAt: new Date().toISOString(),
    user_name: name,
    user_age: age,
    user_sex: sex
  };

  return db
    .put({
      TableName: usersTable,
      Item: record
    })
    .promise()
    .then(() => {
      callback(null, response(201, record));
    })
    .catch(err => callback(null, response(err.statusCode, err)));
};

module.exports.getUsers = (event, context, callback) => {
  return db
    .scan({
      TableName: usersTable
    })
    .promise()
    .then(res => {
      callback(null, response(200, (res.Items || []).sort(sortByDate)));
    })
    .catch(err => callback(null, response(err.statusCode, err)));
};

module.exports.getUser = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id
    },
    TableName: usersTable
  };

  return db
    .get(params)
    .promise()
    .then(res => {
      if (res.Item) {
        callback(null, response(200, res.Item));
      } else {
        callback(null, response(404, { error: "User not found" }));
      }
    })
    .catch(err => callback(null, response(err.statusCode, err)));
};

module.exports.updateUser = (event, context, callback) => {
  const id = event.pathParameters.id;
  const reqBody = JSON.parse(event.body);
  const { name, age, sex } = reqBody;

  if (!validSex(sex)) {
    return callback(
      null,
      response(400, { error: "Sex must be either M or F" })
    );
  }

  const params = {
    Key: {
      id: id
    },
    TableName: usersTable,
    ConditionExpression: "attribute_exists(id)",
    UpdateExpression: "SET user_name = :name, user_age = :age, user_sex = :sex",
    ExpressionAttributeValues: {
      ":name": name,
      ":age": age,
      ":sex": sex
    },
    ReturnValues: "ALL_NEW"
  };

  return db
    .update(params)
    .promise()
    .then(res => {
      callback(null, response(200, res.Attributes));
    })
    .catch(err => callback(null, response(err.statusCode, err)));
};

module.exports.deleteUser = (event, context, callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: usersTable
  };
  return db
    .delete(params)
    .promise()
    .then(() =>
      callback(null, response(200, { message: "User deleted successfully" }))
    )
    .catch(err => callback(null, response(err.statusCode, err)));
};

function sortByDate(a, b) {
  return a.createdAt - b.createdAt;
}

function response(statusCode, response) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(response)
  };
}

function validSex(sex) {
  return ["F", "M"].includes(sex);
}
