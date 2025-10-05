export default {
  async fetch(request) {
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
      method: 'GET',
      headers: {
        'Cookie': `substack.sid=${token}`,
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const text = await response.text();
    
    return new Response(text, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
