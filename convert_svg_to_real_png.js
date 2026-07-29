const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const screenshotsDir = path.join(__dirname, 'screenshots');
const files = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.svg'));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const file of files) {
    const svgPath = path.join(screenshotsDir, file);
    const pngPath = path.join(screenshotsDir, file.replace('.svg', '.png'));

    const svgContent = fs.readFileSync(svgPath, 'utf8');

    // Create an HTML wrapper around the SVG with dark background
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #121212;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          svg {
            box-shadow: 0 8px 24px rgba(0,0,0,0.5);
            border-radius: 8px;
          }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
      </html>
    `;

    await page.setContent(htmlContent);

    // Get bounding box of SVG element
    const svgElement = await page.$('svg');
    const boundingBox = fillBounds(await svgElement.boundingBox());

    await page.setViewport({
      width: Math.ceil(boundingBox.width) + 40,
      height: Math.ceil(boundingBox.height) + 40,
      deviceScaleFactor: 2 // High resolution Retina screenshot
    });

    await page.screenshot({
      path: pngPath,
      clip: {
        x: 0,
        y: 0,
        width: Math.ceil(boundingBox.width) + 40,
        height: Math.ceil(boundingBox.height) + 40
      },
      omitBackground: false
    });

    console.log(`Successfully converted ${file} -> REAL BINARY PNG: ${pngPath}`);
  }

  await browser.close();
  console.log('All screenshots converted to genuine PNG format!');
})();

function fillBounds(bounds) {
  return {
    width: bounds ? bounds.width : 960,
    height: bounds ? bounds.height : 600
  };
}
