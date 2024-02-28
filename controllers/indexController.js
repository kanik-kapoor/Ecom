async function checkout(req,res){
    const user = req.session.user || []; 
    const cart = req.session.cart || []; 
    const totalCartPrice = req.session.totalCartPrice || []

    res.render("checkout", {user, cart, totalCartPrice})
}

module.exports = {
    checkout
}