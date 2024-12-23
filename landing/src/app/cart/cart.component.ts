import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {CartService} from '../services/cart.service';
import {CurrencyPipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CouponsService} from '../services/coupons.service';

@Component({
  selector: 'app-cart',
  imports: [
    CurrencyPipe,
    ReactiveFormsModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  private subscription: any;
  cart: any;
  cartItems: any[] = [];
  cartError: string = '';

  couponsForm = new FormGroup({
    coupon: new FormControl(null, [Validators.required])
  })

  constructor(private _authService: AuthService, private _cartService: CartService, private _couponsService: CouponsService) {
  }

  getCart() {
    this.subscription = this._cartService.getCart().subscribe({
      next: res => {
        this.cart = res.data;
        this.cartItems = res.data.items;
      },
      error: err => {
        this.cartError = err.error.message;
      }
    })
  }

  removeFromCart(itemId: string) {
    this._cartService.removeFromCart(itemId).subscribe({
      next: res => {
        this.cart = res.data;
        this.cartItems = res.data.items;
        alert('item removed');
      },
      error: err => {
        this.cartError = err.error.message;
      }
    })
  }

  clearCart() {
    this._cartService.clearCart().subscribe({
      next: res => {
        alert('cart removed');
        this.cart = null;
        this.cartItems = [];
        this.cartError = 'your cart is empty';
      },
      error: err => {
        this.cartError = err.error.message;
      }
    })
  }

  applyCoupon(formData: FormGroup) {
    this._couponsService.applyCoupon(formData.value).subscribe({
      next: res => {
        this.cart = res.data;
        this.cartItems = res.data.items;
      },
      error: err => {
        alert(`${err.error.message}`)
      }
    })
  }

  ngOnInit() {
    this._authService.checkLogin();
    this.getCart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
