export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'X-Substack-Token, Content-Type'
        }
      });
    }

    const token = request.headers.get('X-Substack-Token');
    
    const response = await fetch('https://substack.com/api/v1/reader/inbox', {
      headers: {
        'Cookie': `substack.sid=${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
