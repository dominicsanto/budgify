import axios from 'axios';
import { getAuthHeader } from 'lib/api_helper';
import cookie from 'cookie';

const { API_HOST } = process.env;

const authHandler = async (req, res) => {
  const { clientId, clientSecret, apiKey } = req.body;

  try {
    const response = await axios.post(
      `${API_HOST}/identity/v2/oauth2/token`,
      {
        grant_type: "client_credentials"
      },
      getAuthHeader(apiKey, clientSecret, clientId),
    );

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', response.data['access_token'], {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
      })
    );

    // res.status(response.status);
    // res.json(response.data);
  }
  catch(e) {
    console.log(e)
    // res.status(e.response.status).json(e.response.data);
  }
}

export default authHandler;
