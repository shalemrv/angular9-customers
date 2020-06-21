import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Customer} from './customer';

@Component({
	selector	: 'app-customers-list',
	templateUrl	: './customers-list.component.html',
	styleUrls	: ['./customers-list.component.css'],
	providers	: [HttpClient]
})

export class CustomersListComponent implements OnInit {

	constructor(private http: HttpClient) { }
	
	editingCustomer = new Customer;
	customersList 	= [];
	gridView		= true;
	
	getCustomersList(){
		console.log("Angular retriving List.");
		this.http.get(`http://127.0.0.1:54321/api/customer/list`).subscribe(
			(response)=>{
				if(!response["complete"]){
					this.customersList = [];
					alert("Unable to fetch the list of Customers");
					return;
				}
				this.customersList = response["result"];
				this.editingCustomer = this.customersList[0];
			}
		);
	}
	
	addNewCustomer(){
		this.http.post(
			`http://127.0.0.1:54321/api/customer/add`,
			{
				customerNumber		: 126,
				customerName		: "Shalomify Inc",
				contactFirstName	: "Shalem",
				contactLastName		: "Raj",
				phone				: "9764976497",
				addressLine1		: "10th Cross, Bilekahalli",
				addressLine2		: "",
				city				: "Bangalore",
				state				: "Karnataka",
				zipCode				: "560076",
				country				: "India",
				salesRepEmpNumber	: 3456,
				creditLimit			: 25800
			}
		).subscribe((response)=>{
			if(!response["complete"]){
				alert(response["message"]);
				return;
			}
			alert(response["message"]);
		});
	}

	editCustomer(editingCustomer : Customer){
		this.editingCustomer = editingCustomer;
	}

	submitEditedCustomer(){
		console.log(`submitEditedCustomer`);
		console.log(this.editingCustomer);

		this.http.post(
			`http://127.0.0.1:54321/api/customer/update`,
			this.editingCustomer
		).subscribe((response)=>{
			console.log("update API");
			console.log(response);
		});
	}

	deleteThisCustomer(customerId:any){
		this.http.delete(
			`http://127.0.0.1:54321/api/customer/${customerId}`
		).subscribe((response)=>{
			if(!response["complete"]){
				alert("Unable to delete customer.");
				return;
			}
			this.getCustomersList();
		});
	}

	toggleGridView(turnOn : boolean){
		this.gridView = turnOn;
	}

	ngOnInit(){
		this.getCustomersList();
	}
	

}
