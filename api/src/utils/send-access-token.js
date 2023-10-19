const sendAccessToken = (res, token) => {
  res
    .cookie('access-token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 100,
    })
    .status(200)
    .json({ success: true, token })
}
