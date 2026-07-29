const { sequelize, ensureDatabaseExists } = require('../config/database');
const User = require('./user');
const Genre = require('./genre');
const Komik = require('./komik');

// Associations
Genre.hasMany(Komik, { foreignKey: 'genre_id', as: 'komiks', onDelete: 'SET NULL' });
Komik.belongsTo(Genre, { foreignKey: 'genre_id', as: 'genre' });

const db = {
  sequelize,
  ensureDatabaseExists,
  User,
  Genre,
  Komik
};

module.exports = db;
