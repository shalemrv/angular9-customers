
interface namesStruct {
	first : string,
	last : string
}

interface addressStruct{
	line1	: string,
	line2	: string,
	city	: string,
	state	: string,
	zipCode	: string,
	country	: string,
}

export class Customer{
	_id ?: string;
	customerNumber	: number;
	companyName		: string;
	phone			: string;
	names			: namesStruct;
	address			: addressStruct;
	salesRepEmpNumber	: number;
	creditLimit			: number;
}