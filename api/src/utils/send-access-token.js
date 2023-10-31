const sendAccessToken = (res, user, statusCode) => {
  const token = user.generateAccessToken()
  // user = user.select('-password')

  delete user['password']

  res
    .cookie('access-token', token, {
      httpOnly: true,
      secure: true,
      maxAge: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .status(statusCode)
    .json({ success: true, token, user })
}

export default sendAccessToken
