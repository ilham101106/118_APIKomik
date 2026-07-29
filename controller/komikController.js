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
          message: 'Genre ID tidak valid atau tidak ditemukan'
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

// Get Komik By ID
const getKomikById = async (req, res) => {
  try {
    const { id } = req.params;
    const komik = await Komik.findByPk(id, {
      include: [{ model: Genre, as: 'genre', attributes: ['id', 'nama_genre', 'deskripsi'] }]
    });

    if (!komik) {
      return res.status(404).json({
        status: 'error',
        message: 'Komik tidak ditemukan'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Detail komik berhasil diambil',
      data: komik
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update Komik
const updateKomik = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, pengarang, penerbit, tahun_terbit, genre_id } = req.body;

    const komik = await Komik.findByPk(id);
    if (!komik) {
      return res.status(404).json({
        status: 'error',
        message: 'Komik tidak ditemukan'
      });
    }

    if (genre_id !== undefined) {
      if (genre_id !== null) {
        const genreExists = await Genre.findByPk(genre_id);
        if (!genreExists) {
          return res.status(400).json({
            status: 'error',
            message: 'Genre ID tidak valid atau tidak ditemukan'
          });
        }
      }
      komik.genre_id = genre_id;
    }

    if (judul !== undefined) komik.judul = judul;
    if (pengarang !== undefined) komik.pengarang = pengarang;
    if (penerbit !== undefined) komik.penerbit = penerbit;
    if (tahun_terbit !== undefined) komik.tahun_terbit = tahun_terbit;

    await komik.save();

    const updatedKomik = await Komik.findByPk(id, {
      include: [{ model: Genre, as: 'genre', attributes: ['id', 'nama_genre', 'deskripsi'] }]
    });

    return res.status(200).json({
      status: 'success',
      message: 'Komik berhasil diperbarui',
      data: updatedKomik
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete Komik
const deleteKomik = async (req, res) => {
  try {
    const { id } = req.params;
    const komik = await Komik.findByPk(id);

    if (!komik) {
      return res.status(404).json({
        status: 'error',
        message: 'Komik tidak ditemukan'
      });
    }

    await komik.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'Komik berhasil dihapus'
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
  getAllKomik,
  getKomikById,
  updateKomik,
  deleteKomik
};
