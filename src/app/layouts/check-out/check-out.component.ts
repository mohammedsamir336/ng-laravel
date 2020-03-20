import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
 declare var paypal;

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  constructor() { }

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

    product = {
      price: 777.77,
      description: 'used couch, decent condition',
      img: 'assets/couch.jpg'
    };

    paidFor = false;

    ngOnInit() {
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: 'USD',
                    value: this.product.price
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.paypalElement.nativeElement);
    }

  }

// paypal package
//public payPalConfig?: IPayPalConfig;

//showSuccess:any;




/*  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'Ac1B1uai71KnJM7c3zZv0iGLScD542cBUvpRy-GdZ2fDzwXMLs7_rpo5C7n2SAc7U1njE7fjsdCnTNZg',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
}*/
