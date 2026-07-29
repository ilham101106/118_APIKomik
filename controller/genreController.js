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

// Get Genre By ID
const getGenreById = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);

    if (!genre) {
      return res.status(404).json({
        status: 'error',
        message: 'Genre tidak ditemukan'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Detail genre berhasil diambil',
      data: genre
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update Genre
const updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_genre, deskripsi } = req.body;

    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({
        status: 'error',
        message: 'Genre tidak ditemukan'
      });
    }

    if (nama_genre !== undefined) genre.nama_genre = nama_genre;
    if (deskripsi !== undefined) genre.deskripsi = deskripsi;

    await genre.save();

    return res.status(200).json({
      status: 'success',
      message: 'Genre berhasil diperbarui',
      data: genre
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete Genre
const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findByPk(id);

    if (!genre) {
      return res.status(404).json({
        status: 'error',
        message: 'Genre tidak ditemukan'
      });
    }

    await genre.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'Genre berhasil dihapus'
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
  getAllGenre,
  getGenreById,
  updateGenre,
  deleteGenre
};
