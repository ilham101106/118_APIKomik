const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Komik = sequelize.define('Komik', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pengarang: {
    type: DataTypes.STRING,
    allowNull: false
  },
  penerbit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tahun_terbit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genre_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'genres',
      key: 'id'
    }
  }
}, {
  tableName: 'komik',
  timestamps: true
});

module.exports = Komik;
