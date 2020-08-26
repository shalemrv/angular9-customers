import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Customer} from './customer';
import Swal from 'sweetalert2';
import { $ } from 'protractor';

@Component({
	selector	: 'app-customers-list',
	templateUrl	: './customers-list.component.html',
	styleUrls	: ['./customers-list.component.css'],
	providers	: [HttpClient]
})

export class CustomersListComponent implements OnInit {

	constructor(private http: HttpClient) { }
	
	editingCustomer = new Customer;
	newCustomer =  new Customer;
	customersList 	= [];
	gridView		= false;
	
	toggleGridView = (turnOn : boolean)=>{
		this.gridView = turnOn;
	};
	
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

				var customerIds : number[];

				customerIds = this.customersList.map(customer => { return parseInt(customer.customerNumber) });
				
				this.newCustomer.customerNumber = `${Math.max(...customerIds) + 1}`;
				this.newCustomer.zipCode = `560089`;
				this.newCustomer.country = `India`;
				this.newCustomer.salesRepEmpNumber = `105${Math.max(...customerIds) + 1}`;
			}
		);
	}
	
	addNewCustomer(){
		this.http.post(
			`http://127.0.0.1:54321/api/customer/add`,
			this.newCustomer
		).subscribe((response)=>{
			if(!response["complete"]){
				Swal.fire("", response["message"], "error");
				return;
			}
			this.getCustomersList();
			Swal.fire("", response["message"], "success");
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
			if(!response["complete"]){
				Swal.fire("", response["message"], "error");
				return;
			}
			Swal.fire("", response["message"], "success");
		});
	}

	deleteThisCustomer(customer:any){
		
		Swal.fire({
		  title: 'Confirmation',
		  text: `${customer.customerName} will be deleted.`,
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if(!result.value) {
				Swal.fire(
					'Cancelled.',
					'You have cancelled the delete request.',
					'info'
				);
				return;
			}

			this.http.delete(
				`http://127.0.0.1:54321/api/customer/${customer._id}`
			).subscribe((response)=>{
				if(!response["complete"]){
					Swal.fire("", response["message"], "error");
					return;
				}
				this.getCustomersList();
				Swal.fire("", response["message"], "success");
			});
		});		
	}

	ngOnInit(){
		this.getCustomersList();
	}
}
