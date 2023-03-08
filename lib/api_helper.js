export const getAuthHeader = (apiKey, clientSecret, clientId) => {
  const token = Buffer.from(`${clientId.trim()}:${clientSecret.trim()}`).toString('base64');

  return {
    headers: {
      'x-api-key': apiKey.trim(),
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
};

export const getHeader = (token) => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

export const redirectToLogin = () => ({
  redirect: {
    permanent: false,
    destination: '/',
  },
});
