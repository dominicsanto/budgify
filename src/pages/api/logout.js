import cookie from 'cookie';

const logoutHandler = (req, res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      path: '/',
    })
  );

  res.status(200);
  res.json({ success: true });
};

export default logoutHandler;
