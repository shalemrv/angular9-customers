
const express		= require(`express`);
const router		= express.Router(); 
const bodyParser	= require(`body-parser`);

const Customer		= require(`../models/customer`);

//List all customers
router.get(`/list`, (req, res, next)=>{
	var dateTimeNow = new Date();
	console.log(`List retrieval @ ${dateTimeNow}`);

	Customer.find().sort({ 'customerNumber' : -1}).exec((err, customersList)=>{
		console.log(customersList);
		res.json({
			complete	: true,
			message		: `List retrieval`,
			result		: customersList
		});
	});

	// Customer.find((err, customersList)=>{
	// 	console.log(customersList);
	// 	res.json({
	// 		complete	: true,
	// 		message		: `List retrieval`,
	// 		result		: customersList
	// 	});
	// });
});

//Add customer
router.post(`/add`, (req, res, next)=>{
	console.log("Add Customer");
	var finalResponse = {
		complete	: false,
		message		: `Failed to add customer - ${req.body.contactFirstName} ${req.body.contactFirstName}`
	}
	let newCustomer = new Customer({
		customerNumber		: req.body.customerNumber,
		customerName		: req.body.customerName,
		contactLastName		: req.body.contactLastName,
		contactFirstName	: req.body.contactFirstName,
		phone				: req.body.phone,
		addressLine1		: req.body.addressLine1,
		addressLine2		: req.body.addressLine2,
		city				: req.body.city,
		state				: req.body.state,
		zipCode				: req.body.zipCode,
		country				: req.body.country,
		salesRepEmpNumber	: req.body.salesRepEmpNumber,
		creditLimit			: req.body.creditLimit
	});
	
	newCustomer.save((err, customer)=>{
		if(err){
			finalResponse["ERROR"] = err;
			res.json(finalResponse);
			return;
		}

		res.json({
			complete	: true,
			message		: `Customer added successfully`,
			result		: req.body
		});
	});
});

router.post(`/update`, (req, res, next)=>{
	let editedCustomer = req.body;
	
	Customer.replaceOne(
		{ _id : editedCustomer['_id']},
		editedCustomer,
		(err, result)=>{
			if(err){
				res.json({
					complete	: false,
					message		: `Failed to update customer. ${err}`,
					result		: req.body
				});
				return;
			}
			
			res.json({
				complete	: true,
				message		: `Customer updated successfully`
			});
		}
	);
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