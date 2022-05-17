import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first, firstValueFrom, Observable } from 'rxjs';
import { OrderDetail } from 'src/app/models/order';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.getOrders();
  }

  showForm!: boolean;
  orders$!: Observable<OrderDetail[]>;
  orderUpdateForm!: FormGroup;

  private serverURL: string = environment.serverURL;
  orderUpdateDetails: OrderDetail = {
    orderId: 0,
    pickUpDate: "",
    dropOffDate: "",
    dateOfficiallyReturned: "",
    userId: 0,
    serialNumber: ""
  }

  getOrders(){
    const response$ = this.httpClient.get<OrderDetail[]>(`${this.serverURL}Admin/RentalOrderDetails`);
    this.orders$ = response$;
  }

  async deleteOrder(order: OrderDetail){
    if(confirm('Are you sure you wanna delete this order?')){
     const response$ = this.httpClient.delete(`${this.serverURL}Admin/DeleteOrder,${order.orderId}`);
     await firstValueFrom(response$);
     this.getOrders();
    }
  }

  defaultDetails(order: OrderDetail){
    this.orderUpdateDetails = order
    this.createUpdateForm();
    this.showForm = true;
  }

  createUpdateForm(){
    this.orderUpdateForm = this.formBuilder.group({
      orderId: [this.orderUpdateDetails.orderId],
      pickUpDate: [this.orderUpdateDetails.pickUpDate],
      dropOffDate: [this.orderUpdateDetails.dropOffDate],
      dateOfficiallyReturned: [this.orderUpdateDetails.dateOfficiallyReturned],
      userId: [this.orderUpdateDetails.userId],
      serialNumber: [this.orderUpdateDetails.serialNumber]
    })
  }

  async updateOrder(){
    try {
      this.orderUpdateDetails = this.orderUpdateForm.value;
      this.orderUpdateDetails.pickUpDate = new Date(this.orderUpdateDetails.pickUpDate).toLocaleDateString('en-US');
      this.orderUpdateDetails.dropOffDate = new Date(this.orderUpdateDetails.dropOffDate).toLocaleDateString('en-US');
      if(this.orderUpdateDetails.dateOfficiallyReturned) this.orderUpdateDetails.dateOfficiallyReturned = new Date(this.orderUpdateDetails.dateOfficiallyReturned as string).toLocaleDateString('en-US');

      const response$ = this.httpClient.put(`${this.serverURL}Admin/UpdateOrder`, this.orderUpdateDetails);
      await firstValueFrom(response$);
    }
    catch (error) {
      alert((error as HttpErrorResponse).error);
    }
    this.getOrders();
  }

  async createNewOrder(){
    try {
      if(confirm('Confirm to create order')){
        this.orderUpdateDetails = this.orderUpdateForm.value;
        this.orderUpdateDetails.pickUpDate = new Date(this.orderUpdateDetails.pickUpDate).toLocaleDateString('en-US');
        this.orderUpdateDetails.dropOffDate = new Date(this.orderUpdateDetails.dropOffDate).toLocaleDateString('en-US');
        if(this.orderUpdateDetails.dateOfficiallyReturned) this.orderUpdateDetails.dateOfficiallyReturned = new Date(this.orderUpdateDetails.dateOfficiallyReturned as string).toLocaleDateString('en-US');

        const response$ = this.httpClient.post(`${this.serverURL}Admin/PostNewOrder`, this.orderUpdateDetails);
        await firstValueFrom(response$);
      }
    }
    catch (error) {
      alert((error as HttpErrorResponse).error);
    }
    finally{
      this.getOrders();
    }
  }

  showFormOnClick(){
    this.showForm = true;
  }
}
