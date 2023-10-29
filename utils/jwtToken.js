const axios = require('axios');

//creating token and saving in cookie

const sendToken = async (user,statusCode, res, req ) =>{
  let cart
  const token = user.getJWTToken();
  var hostname = req.headers.host;
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
    await res.cookie('token', token, options)
    try {
      const config = {
        headers: { 'cookie': 'token=' + token }
      };
      const response = await axios.get('http://' + hostname + '/cart-detail', config);
      cart = response.data.data; 
      // console.log(cart);
    } catch (error) {
      console.log(error);
    }
    totalCartPrice = cart.reduce((total, product) => {
      return total + product.price;
    }, 0);
    req.session.cart = cart
    req.session.totalCartPrice = totalCartPrice
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