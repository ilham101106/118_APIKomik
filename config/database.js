const { Sequelize } = require('sequelize');
const { Client } = require('pg');
require('dotenv').config();

const dbName = process.env.DB_NAME || 'api_komik_db';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || 5432;

// Function to automatically create database in PostgreSQL if it doesn't exist
const ensureDatabaseExists = async () => {
  const client = new Client({
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    port: dbPort,
    database: 'postgres'
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    }
  } catch (err) {
    console.log(`Note: PostgreSQL direct connection check skipped or unavailable (${err.message}).`);
  } finally {
    await client.end().catch(() => {});
  }
};

let sequelize;

if (process.env.USE_SQLITE === 'true') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  });
} else {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: false,
  });
}

module.exports = { sequelize, ensureDatabaseExists };
