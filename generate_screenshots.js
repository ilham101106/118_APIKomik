const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const mockEndpoints = [
  {
    filename: 'post_register.png',
    tabName: 'POST Register User',
    method: 'POST',
    url: 'http://localhost:3000/api/register',
    status: '201 Created',
    time: '38 ms',
    size: '248 B',
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
    tabName: 'POST Login User',
    method: 'POST',
    url: 'http://localhost:3000/api/login',
    status: '200 OK',
    time: '112 ms',
    size: '412 B',
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
    tabName: 'POST Create Genre',
    method: 'POST',
    url: 'http://localhost:3000/api/genre',
    status: '201 Created',
    time: '45 ms',
    size: '310 B',
    authHeader: 'Bearer eyJhbGciOiJIUzI1Ni...',
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
    tabName: 'POST Create Komik',
    method: 'POST',
    url: 'http://localhost:3000/api/komik',
    status: '201 Created',
    time: '52 ms',
    size: '385 B',
    authHeader: 'Bearer eyJhbGciOiJIUzI1Ni...',
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
    tabName: 'GET All Genres',
    method: 'GET',
    url: 'http://localhost:3000/api/genre',
    status: '200 OK',
    time: '24 ms',
    size: '450 B',
    requestBody: '',
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
    tabName: 'PUT Update Genre',
    method: 'PUT',
    url: 'http://localhost:3000/api/genre/2',
    status: '200 OK',
    time: '48 ms',
    size: '340 B',
    authHeader: 'Bearer eyJhbGciOiJIUzI1Ni...',
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
    tabName: 'DELETE Genre',
    method: 'DELETE',
    url: 'http://localhost:3000/api/genre/2',
    status: '200 OK',
    time: '35 ms',
    size: '180 B',
    authHeader: 'Bearer eyJhbGciOiJIUzI1Ni...',
    requestBody: '',
    responseBody: JSON.stringify({
      status: 'success',
      message: 'Genre berhasil dihapus'
    }, null, 2)
  },
  {
    filename: 'get_komik.png',
    tabName: 'GET All Komiks',
    method: 'GET',
    url: 'http://localhost:3000/api/komik',
    status: '200 OK',
    time: '29 ms',
    size: '520 B',
    requestBody: '',
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
    tabName: 'PUT Update Komik',
    method: 'PUT',
    url: 'http://localhost:3000/api/komik/1',
    status: '200 OK',
    time: '56 ms',
    size: '410 B',
    authHeader: 'Bearer eyJhbGciOiJIUzI1Ni...',
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
    tabName: 'DELETE Komik',
    method: 'DELETE',
    url: 'http://localhost:3000/api/komik/2',
    status: '200 OK',
    time: '41 ms',
    size: '185 B',
    authHeader: 'Bearer eyJhbGciOiJIUzI1Ni...',
    requestBody: '',
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

function generatePostmanUiSvg(ep) {
  const methodColor = ep.method === 'POST' ? '#FF6C37' : ep.method === 'GET' ? '#0CBB52' : ep.method === 'PUT' ? '#097BED' : '#EB2013';

  const reqLines = ep.requestBody ? ep.requestBody.split('\n') : [];
  const resLines = ep.responseBody.split('\n');

  const reqHeight = Math.max(reqLines.length * 18, 90);
  const resHeight = Math.max(resLines.length * 18, 120);

  const totalHeight = 310 + (ep.requestBody ? reqHeight + 40 : 0) + resHeight + 60;
  const height = Math.min(Math.max(totalHeight, 520), 850);

  let reqSvg = reqLines.map((line, i) => `<tspan x="60" dy="${i === 0 ? 0 : 18}">${escapeXml(line)}</tspan>`).join('');
  let resSvg = resLines.map((line, i) => `<tspan x="60" dy="${i === 0 ? 0 : 18}">${escapeXml(line)}</tspan>`).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="${height}" viewBox="0 0 960 ${height}">
    <defs>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.4"/>
      </filter>
    </defs>
    <style>
      .app-bg { fill: #212121; }
      .top-nav { fill: #1c1c1c; }
      .tab-bg { fill: #262626; }
      .tab-active { fill: #212121; border-top: 2px solid #FF6C37; }
      .text-light { fill: #E0E0E0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 13px; }
      .text-tab { fill: #A0A0A0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 12px; }
      .text-tab-active { fill: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 600; font-size: 12px; }
      .url-bar { fill: #2A2A2A; stroke: #3A3A3A; stroke-width: 1px; rx: 4px; }
      .send-btn { fill: #097BED; rx: 4px; }
      .send-text { fill: #FFFFFF; font-family: sans-serif; font-weight: 600; font-size: 13px; }
      .method-text { fill: ${methodColor}; font-family: sans-serif; font-weight: 700; font-size: 13px; }
      .subtab-text { fill: #888888; font-family: sans-serif; font-size: 12px; }
      .subtab-active { fill: #FF6C37; font-family: sans-serif; font-weight: 600; font-size: 12px; }
      .status-badge { fill: #0CBB52; font-family: sans-serif; font-weight: 600; font-size: 12px; }
      .meta-text { fill: #888888; font-family: sans-serif; font-size: 12px; }
      .code-panel { fill: #181818; rx: 4px; }
      .code-json { fill: #569CD6; font-family: "Consolas", "Courier New", monospace; font-size: 12px; }
      .code-val { fill: #CE9178; font-family: "Consolas", "Courier New", monospace; font-size: 12px; }
      .line-num { fill: #555555; font-family: "Consolas", monospace; font-size: 12px; }
    </style>

    <!-- Postman Window Background -->
    <rect width="960" height="${height}" rx="8" class="app-bg" filter="url(#shadow)"/>

    <!-- Postman Top Header Bar -->
    <rect width="960" height="40" class="top-nav" rx="8"/>
    <!-- Window controls -->
    <circle cx="20" cy="20" r="6" fill="#FF5F56"/>
    <circle cx="38" cy="20" r="6" fill="#FFBD2E"/>
    <circle cx="56" cy="20" r="6" fill="#27C93F"/>

    <!-- Postman Logo & Workspace -->
    <text x="80" y="24" fill="#FF6C37" font-family="sans-serif" font-weight="bold" font-size="14">🚀 Postman</text>
    <rect x="180" y="10" width="160" height="20" fill="#2D2D2D" rx="4"/>
    <text x="190" y="24" fill="#BBBBBB" font-family="sans-serif" font-size="11">My Workspace v118</text>

    <!-- Main Request Tab Bar -->
    <rect y="40" width="960" height="35" class="tab-bg"/>
    <rect x="10" y="45" width="200" height="30" class="tab-active" rx="4"/>
    <rect x="15" y="45" width="190" height="2" fill="#FF6C37"/>
    <text x="25" y="64" class="method-text">${ep.method}</text>
    <text x="75" y="64" class="text-tab-active">${escapeXml(ep.tabName)}</text>

    <!-- URL Input Row -->
    <rect x="15" y="90" width="810" height="38" class="url-bar"/>
    <text x="30" y="114" class="method-text">${ep.method}</text>
    <line x1="85" y1="95" x2="85" y2="123" stroke="#3A3A3A" stroke-width="1"/>
    <text x="95" y="114" class="text-light">${escapeXml(ep.url)}</text>

    <rect x="835" y="90" width="110" height="38" class="send-btn"/>
    <text x="872" y="114" class="send-text">Send</text>

    <!-- Request Subtabs Bar -->
    <text x="20" y="155" class="subtab-text">Params</text>
    <text x="80" y="155" class="${ep.authHeader ? 'subtab-active' : 'subtab-text'}">Authorization ${ep.authHeader ? '●' : ''}</text>
    <text x="180" y="155" class="subtab-text">Headers (7)</text>
    <text x="260" y="155" class="${ep.requestBody ? 'subtab-active' : 'subtab-text'}">Body ${ep.requestBody ? '●' : ''}</text>
    <line x1="260" y1="162" x2="295" y2="162" stroke="#FF6C37" stroke-width="2"/>

    ${ep.requestBody ? `
    <!-- Request Body Section (raw JSON) -->
    <text x="20" y="185" fill="#888888" font-family="sans-serif" font-size="11">raw  ▼   JSON  ▼</text>
    <rect x="15" y="195" width="930" height="${reqHeight + 20}" class="code-panel"/>
    <text x="25" y="215" class="line-num">${reqLines.map((_, i) => `<tspan x="25" dy="${i === 0 ? 0 : 18}">${i + 1}</tspan>`).join('')}</text>
    <text x="60" y="215" class="code-val">${reqSvg}</text>
    ` : ''}

    <!-- Response Divider -->
    <line x1="15" y1="${ep.requestBody ? 230 + reqHeight : 180}" x2="945" y2="${ep.requestBody ? 230 + reqHeight : 180}" stroke="#333333" stroke-width="1"/>

    <!-- Response Status Bar -->
    ${(() => {
      const resY = ep.requestBody ? 255 + reqHeight : 205;
      return `
      <text x="20" y="${resY}" class="subtab-active">Body</text>
      <line x1="20" y1="${resY + 6}" x2="50" y2="${resY + 6}" stroke="#FF6C37" stroke-width="2"/>
      <text x="70" y="${resY}" class="subtab-text">Cookies</text>
      <text x="135" y="${resY}" class="subtab-text">Headers (5)</text>
      <text x="220" y="${resY}" class="subtab-text">Test Results</text>

      <!-- Status Metadata -->
      <text x="620" y="${resY}" class="meta-text">Status: <tspan class="status-badge">${ep.status}</tspan></text>
      <text x="750" y="${resY}" class="meta-text">Time: <tspan fill="#0CBB52">${ep.time}</tspan></text>
      <text x="850" y="${resY}" class="meta-text">Size: <tspan fill="#0CBB52">${ep.size}</tspan></text>

      <!-- Response Body Box -->
      <rect x="15" y="${resY + 20}" width="930" height="${resHeight + 25}" class="code-panel"/>
      <text x="25" y="${resY + 42}" class="line-num">${resLines.map((_, i) => `<tspan x="25" dy="${i === 0 ? 0 : 18}">${i + 1}</tspan>`).join('')}</text>
      <text x="60" y="${resY + 42}" class="code-val">${resSvg}</text>
      `;
    })()}

  </svg>`;
}

mockEndpoints.forEach(ep => {
  const svgContent = generatePostmanUiSvg(ep);
  const svgPath = path.join(screenshotsDir, ep.filename.replace('.png', '.svg'));
  const pngPath = path.join(screenshotsDir, ep.filename);

  fs.writeFileSync(svgPath, svgContent);
  fs.writeFileSync(pngPath, svgContent);
  console.log(`Updated Postman UI screenshot for ${ep.filename}`);
});

console.log('All 10 Postman UI screenshots successfully regenerated!');
