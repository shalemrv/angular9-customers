const mongoose = require("mongoose");

const namesSchema = mongoose.Schema({
	first	: {
		type 		: String,
		required	: true
	},
	last	: {
		type 		: String,
		required	: true
	}
});

const addressSchema = mongoose.Schema({
	line1	: {
		type 		: String
	},
	line2	: {
		type 		: String
	},
	city	: {
		type 		: String
	},
	state	: {
		type 		: String
	},
	zipCode	: {
		type 		: String
	},
	country	: {
		type 		: String
	}
});

const CustomerSchema = mongoose.Schema({
	customerNumber	: {
		type 		: String,
		required	: true
	},
	companyName	: {
		type 		: String,
		required	: true
	},
	phone	: {
		type 		: String,
		required	: true
	},
	names 		: namesSchema,
	address 	: addressSchema,
	creditLimit	: {
		type 		: Number
	},
	salesRepEmpNumber	: {
		type 		: Number
	}
});

const Customer = module.exports = mongoose.model("Customer", CustomerSchema);