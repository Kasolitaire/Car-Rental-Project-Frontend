import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { OrderDetail } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css'],
})
export class UserOrderComponent implements OnInit {
  constructor(private authService: AuthService, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadUserOrders();
  }

  private serverURL: string = environment.serverURL;

  public userOrders$!: Observable<OrderDetail[]>
  async loadUserOrders() {
    const user: User = await firstValueFrom(
      this.authService.userAsObservable()
    );

    this.userOrders$ = this.httpClient.get<OrderDetail[]>(`${this.serverURL}User/${user.userId}`)
    console.log(user);
  }
}
