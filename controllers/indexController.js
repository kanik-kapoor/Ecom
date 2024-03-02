async function checkout(req,res){
    const user = req.session.user || []; 
    const cart = req.session.cart || []; 
    const totalCartPrice = req.session.totalCartPrice || []

    res.render("checkout", {user, cart, totalCartPrice})
}

async function error(req,res){
    const errorMessage = req.query.message;
    const statusCode = req.query.statusCode;
    res.render("error", {errorMessage, statusCode})
}

module.exports = {
    checkout,
    error
}