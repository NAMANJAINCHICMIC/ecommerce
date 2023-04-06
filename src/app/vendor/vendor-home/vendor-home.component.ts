import { Component, OnInit } from '@angular/core';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.component.html',
  styleUrls: ['./vendor-home.component.scss']
})
export class VendorHomeComponent implements OnInit {
  itemList :any;
  constructor(private vendorService: VendorService){}
  ngOnInit(): void {
this.vendorService.getVendorAllProduct()
  }
}
