import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { routingConfigs } from './routing/routing-config';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CustomerService } from 'libs/customer/data-access/src/lib/infrastructure/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  selector: 'nx-giant-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  routingConfigs = routingConfigs;

  constructor(public customerService: CustomerService) {}
}
