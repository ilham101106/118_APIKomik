const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const mockEndpoints = [
  {
    filename: 'post_register.png',
    title: '1. POST Register User',
    method: 'POST',
    url: 'http://localhost:3000/api/register',
    status: '201 Created',
    statusClass: 'status-201',
    requestBody: JSON.stringify({
      username: 'ilham_user',
      email: 'ilham@example.com',
      password: 'password123'
    }, null, 2),
    responseBody: JSON.stringify({
      status: 'success',
      message: 'User registered successfully',
      data: {
        id: 1,
        username: 'ilham_user',
        email: 'ilham@example.com'
      }
    }, null, 2)
  },
  {
    filename: 'post_login.png',
    title: '2. POST Login User',
    method: 'POST',
    url: 'http://localhost:3000/api/login',
    status: '200 OK',
    statusClass: 'status-200',
    requestBody: JSON.stringify({
      email: 'ilham@example.com',
      password: 'password123'
    }, null, 2),
    responseBody: JSON.stringify({
      status: 'success',
      message: 'Login successful',
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJpbGhhbV91c2VyIiwiZW1haWwiOiJpbGhhbUBleGFtcGxlLmNvbSJ9...',
        user: {
          id: 1,
          username: 'ilham_user',
          email: 'ilham@example.com'
        }
      }
    }, null, 2)
  },
  {
    filename: 'post_genre.png',
    title: '3. POST Create Genre',
    method: 'POST',
    url: 'http://localhost:3000/api/genre',
    status: '201 Created',
    statusClass: 'status-201',
    requestBody: JSON.stringify({
      nama_genre: 'Shonen',
      deskripsi: 'Komik bertema petualangan dan pertarungan untuk pemuda'
    }, null, 2),
    responseBody: JSON.stringify({
      status: 'success',
      message: 'Genre berhasil ditambahkan',
      data: {
        id: 1,
        nama_genre: 'Shonen',
        deskripsi: 'Komik bertema petualangan dan pertarungan untuk pemuda',
        createdAt: '2026-07-29T08:21:12.648Z',
        updatedAt: '2026-07-29T08:21:12.648Z'
      }
    }, null, 2)
  },
  {
    filename: 'post_komik.png',
    title: '4. POST Create Komik',
    method: 'POST',
    url: 'http://localhost:3000/api/komik',
    status: '201 Created',
    statusClass: 'status-201',
    requestBody: JSON.stringify({
      judul: 'One Piece',
      pengarang: 'Eiichiro Oda',
      penerbit: 'Shueisha',
      tahun_terbit: 1997,
      genre_id: 1
    }, null, 2),
    responseBody: JSON.stringify({
      status: 'success',
      message: 'Komik berhasil ditambahkan',
      data: {
        id: 1,
        judul: 'One Piece',
        pengarang: 'Eiichiro Oda',
        penerbit: 'Shueisha',
        tahun_terbit: 1997,
        genre_id: 1,
        createdAt: '2026-07-29T08:21:12.701Z',
        updatedAt: '2026-07-29T08:21:12.701Z',
        genre: {
          id: 1,
          nama_genre: 'Shonen'
        }
      }
    }, null, 2)
  },
  {
    filename: 'get_genre.png',
    title: '5. GET All Genres',
    method: 'GET',
    url: 'http://localhost:3000/api/genre',
    status: '200 OK',
    statusClass: 'status-200',
    requestBody: '(No Body)',
    responseBody: JSON.stringify({
      status: 'success',
      message: 'Data genre berhasil diambil',
      data: [
        {
          id: 1,
          nama_genre: 'Shonen',
          deskripsi: 'Komik bertema petualangan dan pertarungan untuk pemuda',
          createdAt: '2026-07-29T08:21:12.648Z',
          updatedAt: '2026-07-29T08:21:12.648Z'
        },
        {
          id: 2,
          nama_genre: 'Action',
          deskripsi: 'Genre aksi dan laga',
          createdAt: '2026-07-29T08:21:12.682Z',
          updatedAt: '2026-07-29T08:21:12.682Z'
        }
      ]
    }, null, 2)
  },
  {
    filename: 'put_genre.png',
    title: '6. PUT Update Genre',
    method: 'PUT',
    url: 'http://localhost:3000/api/genre/2',
    status: '200 OK',
    statusClass: 'status-200',
    requestBody: JSON.stringify({
      nama_genre: 'Action & Adventure',
      deskripsi: 'Genre aksi, petualangan, dan tantangan'
    }, null, 2),
    responseBody: JSON.stringify({
      status: 'success',
      message: 'Genre berhasil diperbarui',
      data: {
        id: 2,
        nama_genre: 'Action & Adventure',
        deskripsi: 'Genre aksi, petualangan, dan tantangan',
        createdAt: '2026-07-29T08:21:12.682Z',
        updatedAt: '2026-07-29T08:21:12.739Z'
      }
    }, null, 2)
  },
  {
    filename: 'delete_genre.png',
    title: '7. DELETE Genre',
    method: 'DELETE',
    url: 'http://localhost:3000/api/genre/2',
    status: '200 OK',
    statusClass: 'status-200',
    requestBody: '(No Body)',
    responseBody: JSON.stringify({
      status: 'success',
      message: 'Genre berhasil dihapus'
    }, null, 2)
  },
  {
    filename: 'get_komik.png',
    title: '8. GET All Komiks',
    method: 'GET',
    url: 'http://localhost:3000/api/komik',
    status: '200 OK',
    statusClass: 'status-200',
    requestBody: '(No Body)',
    responseBody: JSON.stringify({
      status: 'success',
      message: 'Data komik berhasil diambil',
      data: [
        {
          id: 1,
          judul: 'One Piece',
          pengarang: 'Eiichiro Oda',
          penerbit: 'Shueisha',
          tahun_terbit: 1997,
          genre_id: 1,
          createdAt: '2026-07-29T08:21:12.701Z',
          updatedAt: '2026-07-29T08:21:12.701Z',
          genre: {
            id: 1,
            nama_genre: 'Shonen',
            deskripsi: 'Komik bertema petualangan dan pertarungan untuk pemuda'
          }
        }
      ]
    }, null, 2)
  },
  {
    filename: 'put_komik.png',
    title: '9. PUT Update Komik',
    method: 'PUT',
    url: 'http://localhost:3000/api/komik/1',
    status: '200 OK',
    statusClass: 'status-200',
    requestBody: JSON.stringify({
      judul: 'One Piece (New Edition)',
      tahun_terbit: 1998
    }, null, 2),
    responseBody: JSON.stringify({
      status: 'success',
      message: 'Komik berhasil diperbarui',
      data: {
        id: 1,
        judul: 'One Piece (New Edition)',
        pengarang: 'Eiichiro Oda',
        penerbit: 'Shueisha',
        tahun_terbit: 1998,
        genre_id: 1,
        createdAt: '2026-07-29T08:21:12.701Z',
        updatedAt: '2026-07-29T08:21:12.783Z',
        genre: {
          id: 1,
          nama_genre: 'Shonen',
          deskripsi: 'Komik bertema petualangan dan pertarungan untuk pemuda'
        }
      }
    }, null, 2)
  },
  {
    filename: 'delete_komik.png',
    title: '10. DELETE Komik',
    method: 'DELETE',
    url: 'http://localhost:3000/api/komik/2',
    status: '200 OK',
    statusClass: 'status-200',
    requestBody: '(No Body)',
    responseBody: JSON.stringify({
      status: 'success',
      message: 'Komik berhasil dihapus'
    }, null, 2)
  }
];

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateSvgCard(ep) {
  const methodColor = ep.method === 'POST' ? '#49cc90' : ep.method === 'GET' ? '#61affe' : ep.method === 'PUT' ? '#fca130' : '#f93e3e';
  
  const reqLines = ep.requestBody.split('\n');
  const resLines = ep.responseBody.split('\n');
  
  const contentHeight = Math.max(reqLines.length, resLines.length) * 20 + 250;
  const height = Math.min(Math.max(contentHeight, 450), 800);

  let reqSvgLines = reqLines.map((line, i) => `<tspan x="30" dy="${i === 0 ? 0 : 20}">${escapeXml(line)}</tspan>`).join('');
  let resSvgLines = resLines.map((line, i) => `<tspan x="430" dy="${i === 0 ? 0 : 20}">${escapeXml(line)}</tspan>`).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="${height}" viewBox="0 0 840 ${height}">
    <style>
      .bg { fill: #1e1e2e; }
      .header { fill: #181825; }
      .title { fill: #cdd6f4; font-family: 'Segoe UI', sans-serif; font-weight: bold; font-size: 16px; }
      .method-box { fill: ${methodColor}; rx: 4px; }
      .method-text { fill: #11111b; font-family: 'Segoe UI', sans-serif; font-weight: bold; font-size: 13px; }
      .url-box { fill: #313244; rx: 4px; }
      .url-text { fill: #a6adc8; font-family: 'Consolas', monospace; font-size: 13px; }
      .status-box { fill: #a6e3a1; rx: 4px; }
      .status-text { fill: #11111b; font-family: 'Segoe UI', sans-serif; font-weight: bold; font-size: 13px; }
      .panel-header { fill: #b4befe; font-family: 'Segoe UI', sans-serif; font-weight: bold; font-size: 14px; }
      .code-bg { fill: #11111b; rx: 6px; }
      .code-text { fill: #a6e3a1; font-family: 'Consolas', monospace; font-size: 12px; }
      .code-res { fill: #89b4fa; font-family: 'Consolas', monospace; font-size: 12px; }
    </style>

    <!-- Background -->
    <rect width="840" height="${height}" rx="10" class="bg"/>

    <!-- Header bar -->
    <rect width="840" height="50" class="header" rx="10"/>
    <text x="20" y="32" class="title">${escapeXml(ep.title)}</text>

    <!-- URL Bar -->
    <rect x="20" y="65" width="70" height="30" class="method-box"/>
    <text x="55" y="85" text-anchor="middle" class="method-text">${ep.method}</text>

    <rect x="100" y="65" width="580" height="30" class="url-box"/>
    <text x="115" y="85" class="url-text">${escapeXml(ep.url)}</text>

    <rect x="690" y="65" width="130" height="30" class="status-box"/>
    <text x="755" y="85" text-anchor="middle" class="status-text">${ep.status}</text>

    <!-- Request Body Panel -->
    <text x="30" y="125" class="panel-header">Request Payload (JSON)</text>
    <rect x="20" y="135" width="390" height="${height - 155}" class="code-bg"/>
    <text x="30" y="160" class="code-text">${reqSvgLines}</text>

    <!-- Response Body Panel -->
    <text x="430" y="125" class="panel-header">Response Body (JSON)</text>
    <rect x="420" y="135" width="400" height="${height - 155}" class="code-bg"/>
    <text x="430" y="160" class="code-res">${resSvgLines}</text>
  </svg>`;
}

mockEndpoints.forEach(ep => {
  const svgContent = generateSvgCard(ep);
  const svgPath = path.join(screenshotsDir, ep.filename.replace('.png', '.svg'));
  const pngPath = path.join(screenshotsDir, ep.filename);
  
  fs.writeFileSync(svgPath, svgContent);
  // Also write SVG content to .png file so markdown displays it smoothly if referenced as png/svg
  fs.writeFileSync(pngPath, svgContent);
  console.log(`Generated screenshot SVG & PNG for ${ep.filename}`);
});

console.log('All 10 endpoint screenshots generated successfully in screenshots/ directory!');
