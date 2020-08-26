const mongoose = require("mongoose");

// const namesSchema = mongoose.Schema({
// 	first	: {
// 		type 		: String,
// 		required	: true
// 	},
// 	last	: {
// 		type 		: String,
// 		required	: true
// 	}
// });

// const addressSchema = mongoose.Schema({
// 	line1	: {
// 		type 		: String
// 	},
// 	line2	: {
// 		type 		: String
// 	},
// 	city	: {
// 		type 		: String
// 	},
// 	state	: {
// 		type 		: String
// 	},
// 	zipCode	: {
// 		type 		: String
// 	},
// 	country	: {
// 		type 		: String
// 	}
// });

// const CustomerSchema = mongoose.Schema({
// 	customerNumber	: {
// 		type 		: String,
// 		required	: true
// 	},
// 	companyName	: {
// 		type 		: String,
// 		required	: true
// 	},
// 	phone	: {
// 		type 		: String,
// 		required	: true
// 	},
// 	names 		: namesSchema,
// 	address 	: addressSchema,
// 	creditLimit	: {
// 		type 		: Number
// 	},
// 	salesRepEmpNumber	: {
// 		type 		: Number
// 	}
// });

const CustomerSchema = mongoose.Schema({
	
	customerNumber	: {
		type 		: String,
		required	: true
	},
	customerName	: {
		type 		: String,
		required	: true
	},
	contactLastName	: {
		type 		: String,
		required	: true
	},
	contactFirstName	: {
		type 		: String,
		required	: true
	},
	phone			: {
		type 		: String,
		required	: true
	},
	addressLine1	: {
		type 		: String,
		required	: true
	},
	addressLine2	: {
		type 		: String,
		required	: true
	},
	city			: {
		type 		: String,
		required	: true
	},
	state			: {
		type 		: String,
		required	: true
	},
	zipCode			: {
		type 		: String,
		required	: true
	},
	country			: {
		type 		: String,
		required	: true
	},
	salesRepEmpNumber	: {
		type 		: String,
		required	: true
	},
	creditLimit		: {
		type 		: String,
		required	: true
	}	
});


const Customer = module.exports = mongoose.model("Customer", CustomerSchema);