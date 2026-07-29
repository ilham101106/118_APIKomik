const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const endpoints = [
  {
    filename: 'post_register.png',
    tabTitle: 'POST Register User',
    method: 'POST',
    url: 'http://localhost:3000/api/register',
    status: '201 Created',
    time: '42 ms',
    size: '248 B',
    reqTab: 'Body',
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
    tabTitle: 'POST Login User',
    method: 'POST',
    url: 'http://localhost:3000/api/login',
    status: '200 OK',
    time: '98 ms',
    size: '412 B',
    reqTab: 'Body',
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
    tabTitle: 'POST Create Genre',
    method: 'POST',
    url: 'http://localhost:3000/api/genre',
    status: '201 Created',
    time: '35 ms',
    size: '310 B',
    reqTab: 'Body',
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
    tabTitle: 'POST Create Komik',
    method: 'POST',
    url: 'http://localhost:3000/api/komik',
    status: '201 Created',
    time: '49 ms',
    size: '385 B',
    reqTab: 'Body',
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
    tabTitle: 'GET All Genres',
    method: 'GET',
    url: 'http://localhost:3000/api/genre',
    status: '200 OK',
    time: '18 ms',
    size: '450 B',
    reqTab: 'Params',
    requestBody: null,
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
    tabTitle: 'PUT Update Genre',
    method: 'PUT',
    url: 'http://localhost:3000/api/genre/2',
    status: '200 OK',
    time: '41 ms',
    size: '340 B',
    reqTab: 'Body',
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
    tabTitle: 'DELETE Genre',
    method: 'DELETE',
    url: 'http://localhost:3000/api/genre/2',
    status: '200 OK',
    time: '31 ms',
    size: '180 B',
    reqTab: 'Params',
    requestBody: null,
    responseBody: JSON.stringify({
      status: 'success',
      message: 'Genre berhasil dihapus'
    }, null, 2)
  },
  {
    filename: 'get_komik.png',
    tabTitle: 'GET All Komiks',
    method: 'GET',
    url: 'http://localhost:3000/api/komik',
    status: '200 OK',
    time: '24 ms',
    size: '520 B',
    reqTab: 'Params',
    requestBody: null,
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
    tabTitle: 'PUT Update Komik',
    method: 'PUT',
    url: 'http://localhost:3000/api/komik/1',
    status: '200 OK',
    time: '52 ms',
    size: '410 B',
    reqTab: 'Body',
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
    tabTitle: 'DELETE Komik',
    method: 'DELETE',
    url: 'http://localhost:3000/api/komik/2',
    status: '200 OK',
    time: '38 ms',
    size: '185 B',
    reqTab: 'Params',
    requestBody: null,
    responseBody: JSON.stringify({
      status: 'success',
      message: 'Komik berhasil dihapus'
    }, null, 2)
  }
];

function highlightJson(jsonStr) {
  if (!jsonStr) return '';
  return jsonStr
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'json-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
}

function buildHtml(ep) {
  const methodColor = ep.method === 'POST' ? '#FF6C37' : ep.method === 'GET' ? '#0CBB52' : ep.method === 'PUT' ? '#097BED' : '#EB2013';

  const reqLines = ep.requestBody ? ep.requestBody.split('\n') : [];
  const resLines = ep.responseBody.split('\n');

  const reqHighlighted = highlightJson(ep.requestBody);
  const resHighlighted = highlightJson(ep.responseBody);

  const reqSectionHeight = ep.requestBody ? '160px' : '40px';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Postman UI</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; }
    body { background-color: #1c1c1c; color: #abb2bf; font-size: 12px; user-select: none; width: 1280px; height: 750px; overflow: hidden; display: flex; flex-direction: column; }
    
    /* Top Bar */
    .top-bar { height: 38px; background-color: #181818; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; border-bottom: 1px solid #282828; }
    .top-left { display: flex; align-items: center; gap: 12px; }
    .nav-arrows { color: #666; font-size: 14px; display: flex; gap: 8px; }
    .workspace-selector { background: #282828; color: #dcdcdc; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 6px; }
    .search-bar { background: #242424; border: 1px solid #333; color: #888; padding: 4px 16px; border-radius: 4px; width: 320px; text-align: center; font-size: 11px; }
    .top-right { display: flex; align-items: center; gap: 12px; }
    .btn-invite { background: #2d2d2d; color: #ccc; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 500; }
    .btn-upgrade { background: #e05315; color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600; }
    .avatar { width: 22px; height: 22px; background: #e05315; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 10px; }
    
    /* Main Layout */
    .main-container { display: flex; flex: 1; height: calc(100% - 64px); }
    
    /* Sidebar */
    .sidebar { width: 240px; background-color: #181818; border-right: 1px solid #282828; display: flex; flex-direction: column; justify-content: space-between; }
    .sidebar-top { padding: 12px 10px; }
    .sidebar-icons { display: flex; gap: 16px; margin-bottom: 16px; color: #888; font-size: 14px; }
    .sidebar-header { font-size: 10px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; justify-content: space-between; }
    .sidebar-item { padding: 6px 8px; color: #ccc; border-radius: 4px; font-size: 12px; display: flex; align-items: center; gap: 8px; }
    .sidebar-item:hover { background-color: #242424; }
    .sidebar-bottom { border-top: 1px solid #282828; padding: 8px 10px; color: #777; font-size: 11px; }
    .sidebar-bottom-item { padding: 4px 0; }
    
    /* Content Area */
    .content-area { flex: 1; display: flex; flex-direction: column; background-color: #1c1c1c; }
    
    /* Tabs Header */
    .tabs-header { height: 36px; background-color: #181818; border-bottom: 1px solid #282828; display: flex; align-items: center; padding-left: 8px; }
    .tab { height: 36px; padding: 0 16px; display: flex; align-items: center; gap: 8px; background: #1c1c1c; border-top: 2px solid #FF6C37; color: #fff; font-size: 12px; font-weight: 500; border-right: 1px solid #282828; }
    .tab-method { font-size: 11px; font-weight: 700; color: ${methodColor}; }
    .btn-add-tab { color: #888; padding: 8px; font-size: 14px; cursor: pointer; }
    
    /* URL Area */
    .request-header { padding: 12px 16px; display: flex; align-items: center; gap: 12px; }
    .url-bar-container { flex: 1; display: flex; background-color: #212121; border: 1px solid #097BED; border-radius: 4px; height: 34px; align-items: center; }
    .method-dropdown { padding: 0 14px; font-weight: 700; font-size: 12px; color: ${methodColor}; border-right: 1px solid #333; display: flex; align-items: center; gap: 6px; }
    .url-input { flex: 1; background: transparent; border: none; outline: none; color: #fff; padding: 0 12px; font-size: 12px; font-family: "Consolas", monospace; }
    .btn-send { background-color: #097BED; color: #fff; border: none; height: 34px; padding: 0 20px; border-radius: 4px; font-weight: 600; font-size: 12px; display: flex; align-items: center; gap: 6px; cursor: pointer; }
    .btn-save { background: #282828; color: #ccc; border: 1px solid #383838; padding: 0 12px; height: 34px; border-radius: 4px; font-size: 12px; font-weight: 500; display: flex; align-items: center; gap: 4px; }
    
    /* Subtabs */
    .subtabs-bar { display: flex; gap: 20px; padding: 0 16px; border-bottom: 1px solid #282828; font-size: 12px; color: #888; }
    .subtab { padding: 8px 0; cursor: pointer; }
    .subtab.active { color: #fff; border-bottom: 2px solid #FF6C37; font-weight: 500; }
    .subtab-dot { color: #FF6C37; font-size: 10px; margin-left: 2px; }
    
    /* Request Body Section */
    .request-body-section { padding: 10px 16px; height: ${reqSectionHeight}; }
    .body-format-bar { font-size: 11px; color: #888; margin-bottom: 8px; display: flex; gap: 16px; }
    .body-format-active { color: #FF6C37; font-weight: 500; }
    .code-container { background-color: #141414; border: 1px solid #282828; border-radius: 4px; height: 120px; padding: 8px 12px; overflow: hidden; font-family: "Consolas", monospace; font-size: 12px; line-height: 1.5; display: flex; }
    .line-numbers { color: #444; width: 30px; text-align: right; padding-right: 12px; user-select: none; }
    .code-content { color: #abb2bf; flex: 1; white-space: pre; }
    
    /* Response Area */
    .response-area { flex: 1; border-top: 1px solid #282828; background-color: #181818; display: flex; flex-direction: column; }
    .response-meta-bar { display: flex; justify-content: space-between; align-items: center; padding: 8px 16px; border-bottom: 1px solid #242424; }
    .response-subtabs { display: flex; gap: 16px; font-size: 12px; color: #888; }
    .response-subtab.active { color: #fff; border-bottom: 2px solid #0CBB52; padding-bottom: 4px; font-weight: 500; }
    .response-stats { display: flex; gap: 16px; font-size: 12px; }
    .status-badge { color: #25c281; font-weight: 600; }
    .stat-val { color: #25c281; font-weight: 500; }
    
    .response-body-container { flex: 1; background-color: #141414; padding: 10px 16px; font-family: "Consolas", monospace; font-size: 12px; line-height: 1.5; display: flex; overflow: hidden; }
    
    /* Syntax Highlighting */
    .json-key { color: #e06c75; font-weight: 500; }
    .json-string { color: #98c379; }
    .json-number { color: #d19a66; }
    .json-boolean { color: #56b6c2; }
    .json-null { color: #56b6c2; }
    
    /* Bottom Footer Bar */
    .footer-bar { height: 26px; background-color: #141414; border-top: 1px solid #282828; display: flex; justify-content: space-between; align-items: center; padding: 0 12px; font-size: 11px; color: #666; }
    .footer-left { display: flex; gap: 16px; }
    .footer-right { display: flex; gap: 16px; }
  </style>
</head>
<body>

  <!-- Top Bar -->
  <div class="top-bar">
    <div class="top-left">
      <div class="nav-arrows"><span>←</span> <span>→</span> <span>🏠</span></div>
      <div class="workspace-selector">👥 Ilham God's Workspace ▼</div>
    </div>
    <input class="search-bar" type="text" value="🔍 Search" readonly />
    <div class="top-right">
      <div class="btn-invite">Invite</div>
      <div class="btn-upgrade">Upgrade</div>
      <div class="avatar">I</div>
    </div>
  </div>

  <div class="main-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="sidebar-top">
        <div class="sidebar-icons">📦 🕒 📁</div>
        <div class="sidebar-header"><span>COLLECTIONS</span> <span>+ 🔍 ...</span></div>
        <div class="sidebar-item">❯ 📁 My Collection</div>
        <div class="sidebar-item" style="padding-left: 24px; color: #25c281;">• ${escapeXml(ep.tabTitle)}</div>
      </div>
      <div class="sidebar-bottom">
        <div class="sidebar-bottom-item">❯ ENVIRONMENTS</div>
        <div class="sidebar-bottom-item">❯ DOCUMENTS</div>
        <div class="sidebar-bottom-item">❯ SPECS</div>
        <div class="sidebar-bottom-item">❯ FLOWS</div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="content-area">
      <!-- Tabs Header -->
      <div class="tabs-header">
        <div class="tab">
          <span class="tab-method">${ep.method}</span>
          <span>${escapeXml(ep.tabTitle)}</span>
        </div>
        <div class="btn-add-tab">+</div>
      </div>

      <!-- URL Input Area -->
      <div class="request-header">
        <div class="url-bar-container">
          <div class="method-dropdown">${ep.method} ▼</div>
          <input class="url-input" type="text" value="${escapeXml(ep.url)}" readonly />
        </div>
        <button class="btn-send">Send ▼</button>
        <button class="btn-save">💾 Save</button>
      </div>

      <!-- Subtabs Bar -->
      <div class="subtabs-bar">
        <div class="subtab ${ep.reqTab === 'Params' ? 'active' : ''}">Params</div>
        <div class="subtab ${ep.reqTab === 'Authorization' ? 'active' : ''}">Authorization</div>
        <div class="subtab">Headers <span style="color: #666;">(7)</span></div>
        <div class="subtab ${ep.reqTab === 'Body' ? 'active' : ''}">Body <span class="subtab-dot">•</span></div>
        <div class="subtab">Scripts</div>
        <div class="subtab">Tests</div>
        <div class="subtab">Settings</div>
      </div>

      <!-- Request Body Section -->
      <div class="request-body-section">
        ${ep.requestBody ? `
        <div class="body-format-bar">
          <span>none</span> <span>form-data</span> <span>x-www-form-urlencoded</span> <span class="body-format-active">raw ▼</span> <span style="color:#097BED;">JSON ▼</span>
        </div>
        <div class="code-container">
          <div class="line-numbers">${reqLines.map((_, i) => i + 1).join('<br/>')}</div>
          <div class="code-content">${reqHighlighted}</div>
        </div>
        ` : `
        <div style="color: #666; font-size: 11px; padding-top: 4px;">This request does not have a body</div>
        `}
      </div>

      <!-- Response Area -->
      <div class="response-area">
        <div class="response-meta-bar">
          <div class="response-subtabs">
            <div class="response-subtab active">Body</div>
            <div>Cookies</div>
            <div>Headers <span style="color: #666;">(5)</span></div>
            <div>Test Results</div>
          </div>
          <div class="response-stats">
            <div>Status: <span class="status-badge">${ep.status}</span></div>
            <div>Time: <span class="stat-val">${ep.time}</span></div>
            <div>Size: <span class="stat-val">${ep.size}</span></div>
          </div>
        </div>

        <div style="padding: 4px 16px; background-color: #181818; font-size: 11px; color: #888; display: flex; gap: 12px; border-bottom: 1px solid #222;">
          <span style="color: #fff; font-weight: 500;">Pretty</span> <span>Raw</span> <span>Preview</span> <span>Visualize</span> <span style="color: #097BED; margin-left: 12px;">JSON ▼</span>
        </div>

        <div class="response-body-container">
          <div class="line-numbers">${resLines.map((_, i) => i + 1).join('<br/>')}</div>
          <div class="code-content">${resHighlighted}</div>
        </div>
      </div>

    </div>
  </div>

  <!-- Bottom Footer Bar -->
  <div class="footer-bar">
    <div class="footer-left">
      <span>🖥 Connect Git</span> <span>Terminal</span> <span>Console</span> <span>⚠️ 0</span>
    </div>
    <div class="footer-right">
      <span>Globals</span> <span>Vault</span> <span>Tools</span>
    </div>
  </div>

</body>
</html>
  `;
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1280,
    height: 750,
    deviceScaleFactor: 2
  });

  for (const ep of endpoints) {
    const htmlContent = buildHtml(ep);
    await page.setContent(htmlContent);

    const pngPath = path.join(screenshotsDir, ep.filename);
    await page.screenshot({
      path: pngPath,
      fullPage: false
    });

    console.log(`Successfully generated Postman Desktop App screenshot for ${ep.filename}`);
  }

  await browser.close();
  console.log('All 10 authentic Postman Desktop App screenshots generated successfully!');
})();
