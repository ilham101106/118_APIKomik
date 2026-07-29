const { Genre } = require('../models');

// Create Genre
const createGenre = async (req, res) => {
  try {
    const { nama_genre, deskripsi } = req.body;

    if (!nama_genre) {
      return res.status(400).json({
        status: 'error',
        message: 'Nama genre wajib diisi'
      });
    }

    const newGenre = await Genre.create({
      nama_genre,
      deskripsi
    });

    return res.status(201).json({
      status: 'success',
      message: 'Genre berhasil ditambahkan',
      data: newGenre
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get All Genres
const getAllGenre = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    return res.status(200).json({
      status: 'success',
      message: 'Data genre berhasil diambil',
      data: genres
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

module.exports = {
  createGenre,
  getAllGenre
};
