import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import {ActivatedRoute, Router} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import {ProductService} from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle:string='Product Detail';
  product:IProduct;
  constructor(private route: ActivatedRoute,private router:Router,private productService : ProductService ) {

   }

  ngOnInit(): void {
    let id=+this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.pageTitle+=`: ${id}`;
    this.getProduct(id);
    
  }
  starMessage:string;
  errorMessage:string;
  onratingClicked(message:string):void{
    this.starMessage=`${message}`;
    
  }
  
  getProduct(id:number):void{
    this.productService.getProductById(id).subscribe({
      next: product=>
            this.product=product,
      error: err => this.errorMessage = err
    });
  }
  
  onBack():void{
    console.log("In Back");
    
    this.router.navigate(['/products']);
  }

}
