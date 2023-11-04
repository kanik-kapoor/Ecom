const axios = require('axios');

const sendToken = async (user, statusCode, res, req) => {
  try {
    const token = user.getJWTToken();
    const hostname = req.headers.host;

    // Options for the cookie
    const cookieOptions = {
      expiresIn: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: false,
    };

    if (user.role === 'admin') {
      res.cookie('token', token, cookieOptions);
      return res.redirect('/admin/products/new');
    } else if (user.role === 'user') {
      await res.cookie('token', token, cookieOptions);

      const config = {
        headers: { 'cookie': 'token=' + token },
      };

      // Fetch the user's cart
      const response = await axios.get(`http://${hostname}/cart-detail`, config);
      const cart = response.data.cartDetail;
      const totalCartPrice = response.data.totalCartPrice;

      // Update the session variables
      req.session.cart = cart;
      req.session.totalCartPrice = totalCartPrice;

      return res.redirect('/products');
    } else {
      return res.status(500).json({
        error: 'Something went wrong',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Something went wrong',
    });
  }
};

module.exports = {
  sendToken,
};
