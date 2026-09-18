// ==========================================================================
// PAWS Local Development Server & API Runner (Zero external npm dependencies)
// Serves static frontend assets and routes /api/analyze-report to the serverless handler
// ==========================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load environment variables from .env or .env.local if present
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const envFile of envFiles) {
    const envPath = path.join(__dirname, envFile);
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
            const idx = trimmed.indexOf('=');
            const key = trimmed.substring(0, idx).trim();
            const val = trimmed.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        });
        console.log(`[PAWS Server] Loaded environment variables from ${envFile}`);
      } catch (err) {
        console.warn(`[PAWS Server] Could not read ${envFile}:`, err.message);
      }
    }
  }
}

loadEnv();

const analyzeHandler = require('./api/analyze-report');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const host = req.headers.host || 'localhost:3000';
  const reqUrl = new URL(req.url, `http://${host}`);
  const pathname = reqUrl.pathname;

  // Handle Serverless API Route
  if (pathname === '/api/analyze-report' || pathname === '/api/analyze-report/') {
    let bodyData = '';
    req.on('data', chunk => {
      bodyData += chunk;
    });

    req.on('end', async () => {
      try {
        req.body = bodyData ? JSON.parse(bodyData) : {};
      } catch (e) {
        req.body = bodyData;
      }
      return analyzeHandler(req, res);
    });
    return;
  }

  // Handle Static File Serving
  let relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  const filePath = path.join(__dirname, relativePath);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>404 Not Found</h1><p>Resource not found on PAWS server.</p>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🐾 PAWS Server running at http://localhost:${PORT}/`);
  console.log(`📡 Serverless API active at http://localhost:${PORT}/api/analyze-report`);
  console.log(`🔑 AI Provider Status:`);
  console.log(`   - Gemini API Key: ${Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY) ? 'Configured ✓' : 'Not Set (Demo Mode ready)'}`);
  console.log(`   - OpenAI API Key: ${Boolean(process.env.OPENAI_API_KEY) ? 'Configured ✓' : 'Not Set'}`);
  console.log('====================================================');
});
