
const express		= require(`express`);
const router		= express.Router(); 
const bodyParser	= require(`body-parser`);

const Customer		= require(`../models/customer`);

//List all customers
router.get(`/list`, (req, res, next)=>{
	var dateTimeNow = new Date();
	console.log(`List retrieval @ ${dateTimeNow}`);
	Customer.find((err, customersList)=>{

		// customersList = customersList.map(customer => {
		// 	return {
		// 		_id				: customer._id,
		// 		customerNumber	: customer.customerNumber,
		// 		companyName		: customer.customerName,
		// 		phone			: customer.phone,
		// 		names 			: {
		// 			first	: customer.contactFirstName,
		// 			last	: customer.contactLastName,
		// 		},
		// 		address			: {
		// 			line1	: customer.addressLine1,
		// 			line2	: customer.addressLine2,
		// 			city	: customer.city,
		// 			state	: customer.state,
		// 			zipCode	: customer.zipCode,
		// 			country	: customer.country,
		// 		},
		// 		creditLimit		: customer.creditLimit,
		// 		salesRepEmpNumber	: customer.salesRepEmpNumber
		// 	};
		// });
		console.log(customersList);
		res.json({
			complete	: true,
			message		: `List retrieval`,
			result		: customersList
		});
	});	
});

//Add customer
router.post(`/add`, (req, res, next)=>{
	console.log("Add Customer");
	// let newCustomer = new Customer({
	// 	customerNumber		: req.body.customerNumber,
	// 	customerName		: req.body.customerName,
	// 	contactLastName		: req.body.contactLastName,
	// 	contactFirstName	: req.body.contactFirstName,
	// 	phone				: req.body.phone,
	// 	addressLine1		: req.body.addressLine1,
	// 	addressLine2		: req.body.addressLine2,
	// 	city				: req.body.city,
	// 	state				: req.body.state,
	// 	zipCode				: req.body.zipCode,
	// 	country				: req.body.country,
	// 	salesRepEmpNumber	: req.body.salesRepEmpNumber,
	// 	creditLimit			: req.body.creditLimit
	// });

	
	res.json({
		complete	: true,
		message		: `Customer added successfully`,
		result		: req.body
	});

	// newCustomer.save((err, customer)=>{
	// 	if(err){
	// 		res.json({
	// 			complete	: false,
	// 			message		: `Failed to add customer. ${err}`,
	// 			result		: req.body
	// 		});
	// 		return;
	// 	}

	// 	res.json({
	// 		complete	: true,
	// 		message		: `Customer added successfully`
	// 	});
	// });
});

//Delete customer
router.delete(`/:recordId`, (req, res, next)=>{
	console.log("Delete Customer");
	Customer.deleteOne(
		{
			_id : req.params.recordId
		},
		(err, result)=>{
			if(err){
				res.json({
					complete	: false,
					message		: `Failed to delete customer. ${err}`,
					result		: req.body
				});
				return;
			}
			
			res.json({
				complete	: true,
				message		: `Customer deleted successfully`
			});
		}
	);
});

module.exports = router;