const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Genre = sequelize.define('Genre', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama_genre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'genres',
  timestamps: true
});

module.exports = Genre;
