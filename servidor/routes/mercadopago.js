const express = require("express");
const router = express.Router();
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: 'TEST-8360979695538693-050721-291862a70208237f97503366ee855889-242403909'
});

router.get("/", function (req, res) {
    res.status(200).sendFile("index.html");
}); 

router.post("/create_preference", async (req, res) => {
	console.log(req.body)
	let preference = {
		items: req.body /*[{
			title: req.body.description,
			unit_price: Number(req.body.price),
			quantity: Number(req.body.quantity),
		}],*/
		// back_urls: {
		// 	"success": "http://localhost:8080/feedback",
		// 	"failure": "http://localhost:8080/feedback",
		// 	"pending": "http://localhost:8080/feedback"
		// },
		// auto_return: 'approved',
	};
    await mercadopago.preferences.create(preference)
	    .then(function (response) {
	    	return res.json({body :response.body})
	    }).catch(function (error) {
	    	console.log(error);
	    });
});

router.get('/feedback', function(request, response) {
    response.json({
       Payment: request.query.payment_id,
       Status: request.query.status,
       MerchantOrder: request.query.merchant_order_id
   })
});

module.exports = router;