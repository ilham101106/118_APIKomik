const { Komik, Genre } = require('../models');

// Create Komik
const createKomik = async (req, res) => {
  try {
    const { judul, pengarang, penerbit, tahun_terbit, genre_id } = req.body;

    if (!judul || !pengarang || !penerbit || !tahun_terbit) {
      return res.status(400).json({
        status: 'error',
        message: 'Judul, pengarang, penerbit, dan tahun_terbit wajib diisi'
      });
    }

    if (genre_id) {
      const genreExists = await Genre.findByPk(genre_id);
      if (!genreExists) {
        return res.status(400).json({
          status: 'error',
          message: 'Genre ID tidak valid or tidak ditemukan'
        });
      }
    }

    const newKomik = await Komik.create({
      judul,
      pengarang,
      penerbit,
      tahun_terbit,
      genre_id: genre_id || null
    });

    const result = await Komik.findByPk(newKomik.id, {
      include: [{ model: Genre, as: 'genre', attributes: ['id', 'nama_genre'] }]
    });

    return res.status(201).json({
      status: 'success',
      message: 'Komik berhasil ditambahkan',
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get All Komiks
const getAllKomik = async (req, res) => {
  try {
    const komiks = await Komik.findAll({
      include: [{ model: Genre, as: 'genre', attributes: ['id', 'nama_genre', 'deskripsi'] }]
    });
    return res.status(200).json({
      status: 'success',
      message: 'Data komik berhasil diambil',
      data: komiks
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

module.exports = {
  createKomik,
  getAllKomik
};
