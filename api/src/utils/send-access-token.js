const sendAccessToken = (res, user, statusCode) => {
  const token = user.generateAccessToken()
  // user = user.select('-password')

  const { password, ...userInfo } = user._doc

  res
    .cookie('access-token', token, {
      httpOnly: true,
      secure: true,
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .status(statusCode)
    .json({ success: true, token, user: userInfo })
}

export default sendAccessToken
