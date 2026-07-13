const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          headers: res.headers,
          bodySnippet: data.substring(0, 500)
        });
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

async function run() {
  const results = await Promise.all([
    fetchUrl('http://localhost:3000/api/team'),
    fetchUrl('http://localhost:3000/api/settings'),
    fetchUrl('http://localhost:3000/api/timeline')
  ]);
  console.log(JSON.stringify(results, null, 2));
}

run();
