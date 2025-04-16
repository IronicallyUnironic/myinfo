document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Get IP and location
      const ipRes = await fetch('https://ipapi.co/json/');
      const ipData = await ipRes.json();
      const ip = ipData.ip;
      document.getElementById('ip').textContent = ip;
      document.getElementById('ip').innerHTML = `<a href="https://www.whatismyip.com/ip-address-lookup/" target="_blank">${ip}</a>`;
      document.getElementById('location').textContent = `${ipData.city}, ${ipData.region}, ${ipData.country_name}`;
  
      // Get hostname (manually fallback based on IP)
      document.getElementById('hostname').textContent = ipData.org || 'Unavailable';
      document.getElementById('hostname').innerHTML = `<a href="https://www.whatismyhostname.com/" target="_blank">${ipData.org || 'Unavailable'}</a>`;
  
      // Get user agent
      document.getElementById('ua').textContent = navigator.userAgent;
      document.getElementById('ua').innerHTML = `<a href="https://www.whatismybrowser.com/" target="_blank">${navigator.userAgent}</a>`;
  
      // Get headers using a CORS-safe endpoint
      const headersRes = await fetch('https://httpbingo.org/headers');
      const headersData = await headersRes.json();
  
      // Format the headers for better readability
      const formattedHeaders = Object.entries(headersData.headers)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
      
      document.getElementById('headers').textContent = formattedHeaders;
  
      // Disable WHOIS and Blacklist (not usable from frontend without API key/backend)
      document.getElementById('whois').textContent = 'WHOIS unavailable';
      document.getElementById('blacklist').textContent = 'Blacklist status unavailable';
    } catch (error) {
      console.error('Error loading data:', error);
      const errorText = 'Error loading info';
      ['ip', 'location', 'hostname', 'ua', 'headers', 'whois', 'blacklist'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = errorText;
      });
    }
  });
  