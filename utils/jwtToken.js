

//creating token and saving in cookie

const sendToken= (user,statusCode, res ) =>{
  
  const token = user.getJWTToken();
  //options for cookie
  const options = {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  if (user.role === 'admin') {
    res.status(statusCode).cookie('token', token, options).json({
      success: true,
      user,
      token,
    })
  }
  else if (user.role === 'user')  {
    res.status(statusCode).cookie('token', token, options).json({
      success: true,
      user,
      token,
    })
  }
  else{
    return res.status(500).json({
      error:'something went wrong'
      });
  }
}


module.exports = {
    sendToken
}