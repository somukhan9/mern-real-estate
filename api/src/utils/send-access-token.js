const sendAccessToken = (res, token, statusCode) => {
  res
    .cookie('access-token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 100,
    })
    .status(statusCode)
    .json({ success: true, token })
}

export default sendAccessToken
