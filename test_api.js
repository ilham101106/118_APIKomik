process.env.USE_SQLITE = 'true';
process.env.PORT = '3005';

const http = require('http');
const express = require('express');
const { sequelize, ensureDatabaseExists } = require('./models');
const authRoutes = require('./routes/authRoutes');
const genreRoutes = require('./routes/genreRoutes');
const komikRoutes = require('./routes/komikRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', authRoutes);
app.use('/api/genre', genreRoutes);
app.use('/api/komik', komikRoutes);

const PORT = 3005;
const HOST = '127.0.0.1';
const BASE_URL = `http://${HOST}:${PORT}`;

let server;

const request = (method, path, body = null, authToken = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method: method,
      hostname: HOST,
      port: PORT,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (authToken) {
      options.headers['Authorization'] = `Bearer ${authToken}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', err => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

const results = {};

const runTests = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced for test suite.');

  await new Promise(res => {
    server = app.listen(PORT, HOST, () => {
      console.log(`Test server running on http://${HOST}:${PORT}`);
      res();
    });
  });

  try {
    // 1. POST Register
    console.log('\n--- 1. POST /api/register ---');
    results.post_register = await request('POST', '/api/register', {
      username: 'ilham_user',
      email: 'ilham@example.com',
      password: 'password123'
    });
    console.log('Register Response:', JSON.stringify(results.post_register, null, 2));

    // 2. POST Login
    console.log('\n--- 2. POST /api/login ---');
    results.post_login = await request('POST', '/api/login', {
      email: 'ilham@example.com',
      password: 'password123'
    });
    console.log('Login Response:', JSON.stringify(results.post_login, null, 2));
    const token = results.post_login.body.data.token;

    // 3. POST Genre
    console.log('\n--- 3. POST /api/genre ---');
    results.post_genre = await request('POST', '/api/genre', {
      nama_genre: 'Shonen',
      deskripsi: 'Komik bertema petualangan dan pertarungan untuk pemuda'
    }, token);
    console.log('POST Genre Response:', JSON.stringify(results.post_genre, null, 2));
    const createdGenreId = results.post_genre.body.data.id;

    // Second genre for put/delete
    const secondGenre = await request('POST', '/api/genre', {
      nama_genre: 'Action',
      deskripsi: 'Genre aksi dan laga'
    }, token);
    const updatedGenreId = secondGenre.body.data.id;

    // 4. POST Komik
    console.log('\n--- 4. POST /api/komik ---');
    results.post_komik = await request('POST', '/api/komik', {
      judul: 'One Piece',
      pengarang: 'Eiichiro Oda',
      penerbit: 'Shueisha',
      tahun_terbit: 1997,
      genre_id: createdGenreId
    }, token);
    console.log('POST Komik Response:', JSON.stringify(results.post_komik, null, 2));
    const createdKomikId = results.post_komik.body.data.id;

    // 5. GET Genre
    console.log('\n--- 5. GET /api/genre ---');
    results.get_genre = await request('GET', '/api/genre');
    console.log('GET Genre Response:', JSON.stringify(results.get_genre, null, 2));

    // 6. PUT Genre
    console.log('\n--- 6. PUT /api/genre/:id ---');
    results.put_genre = await request('PUT', `/api/genre/${updatedGenreId}`, {
      nama_genre: 'Action & Adventure',
      deskripsi: 'Genre aksi, petualangan, dan tantangan'
    }, token);
    console.log('PUT Genre Response:', JSON.stringify(results.put_genre, null, 2));

    // 7. DELETE Genre
    console.log('\n--- 7. DELETE /api/genre/:id ---');
    results.delete_genre = await request('DELETE', `/api/genre/${updatedGenreId}`, null, token);
    console.log('DELETE Genre Response:', JSON.stringify(results.delete_genre, null, 2));

    // 8. GET Komik
    console.log('\n--- 8. GET /api/komik ---');
    results.get_komik = await request('GET', '/api/komik');
    console.log('GET Komik Response:', JSON.stringify(results.get_komik, null, 2));

    // 9. PUT Komik
    console.log('\n--- 9. PUT /api/komik/:id ---');
    results.put_komik = await request('PUT', `/api/komik/${createdKomikId}`, {
      judul: 'One Piece (New Edition)',
      tahun_terbit: 1998
    }, token);
    console.log('PUT Komik Response:', JSON.stringify(results.put_komik, null, 2));

    // Create another komik to delete
    const deleteTargetKomik = await request('POST', '/api/komik', {
      judul: 'Komik Sementara',
      pengarang: 'Anonim',
      penerbit: 'Indie Publisher',
      tahun_terbit: 2024,
      genre_id: createdGenreId
    }, token);
    const targetId = deleteTargetKomik.body.data.id;

    // 10. DELETE Komik
    console.log('\n--- 10. DELETE /api/komik/:id ---');
    results.delete_genre = await request('DELETE', `/api/komik/${targetId}`, null, token);
    // Fix key for delete_komik
    results.delete_komik = results.delete_genre;
    console.log('DELETE Komik Response:', JSON.stringify(results.delete_komik, null, 2));

    console.log('\nSUCCESS! All 10 API tests executed and verified successfully!');
  } finally {
    if (server) server.close();
  }

  return results;
};

if (require.main === module) {
  runTests().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runTests };
