

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
    res.cookie('token', token, options)
    res.redirect('/admin/products/new')
  }
  else if (user.role === 'user')  {
    res.cookie('token', token, options)
    res.redirect('/products')
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