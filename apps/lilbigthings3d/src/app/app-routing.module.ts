import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-page/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './pages/admin-page/admin-dashboard/product-management/add-product/add-product.component';
import { EditProductComponent } from './pages/admin-page/admin-dashboard/product-management/edit-product/edit-product.component';
import { ViewProductsComponent } from './pages/admin-page/admin-dashboard/product-management/view-products/view-products.component';
import { AdminLoginComponent } from './pages/admin-page/admin-login/admin-login.component';
import { AdminPageComponent } from './pages/admin-page/admin.page';
import { BasketViewComponent } from './pages/home-page/basket-view/basket-view.component';
import { CheckoutComponent } from './pages/home-page/checkout-view/checkout.component';
import { PaymentCancelComponent } from './pages/home-page/payment-result/payment-cancel/payment-cancel.component';
import { PaymentNotifyComponent } from './pages/home-page/payment-result/payment-notify/payment-notify.component';
import { PaymentSuccessComponent } from './pages/home-page/payment-result/payment-success/payment-success.component';
import { HomePageComponent } from './pages/home-page/home.page';
import { ProductViewComponent } from './pages/home-page/product-view/product-view.component';
import { FeaturedProductsComponent } from './pages/home-page/shared-components/featured-products/featured-products.component';
import { RegisterComponent } from './pages/home-page/shared-components/user-register/register.component';
import { SigninUserComponent } from './pages/home-page/shared-components/user-sign-in/login-user.component';
import { PaymentResultComponent } from './pages/home-page/payment-result/payment-result.component';
import { OrdersViewComponent } from './pages/home-page/orders-view/orders-view.component';
import { PricingDashboardComponent } from './pages/admin-page/admin-dashboard/cost-pricing-management/pricing-dashboard/pricing-dashboard.component';
import { CostsDashboardComponent } from './pages/admin-page/admin-dashboard/cost-pricing-management/costs-dashboard/costs-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'featured-products', pathMatch: 'full' },
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'register',
        title: 'Register new user',
        component: RegisterComponent,
      },
      {
        path: 'sign-in',
        title: 'Sign in',
        component: SigninUserComponent,
      },
      {
        path: 'featured-products',
        title: 'Featured products',
        component: FeaturedProductsComponent,
      },
      {
        path: 'product/:productId',
        title: 'View product',
        component: ProductViewComponent,
      },
      {
        path: 'basket',
        title: 'View basket',
        component: BasketViewComponent,
      },
      {
        path: 'checkout',
        title: 'Checkout ',
        component: CheckoutComponent,
      },
      {
        path: 'orders',
        title: 'Orders ',
        component: OrdersViewComponent,
      },
      {
        path: 'payment-result',
        title: 'Payment result ',
        component: PaymentResultComponent,
        children: [
          {
            path: 'success',
            title: 'Payment successful',
            component: PaymentSuccessComponent,
          },
          {
            path: 'canceled',
            title: 'Payment cancelled',
            component: PaymentCancelComponent,
          },
          {
            path: 'notify',
            title: 'Payment cancelled',
            component: PaymentNotifyComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    children: [
      {
        path: 'login',
        title: 'Admin login',
        component: AdminLoginComponent,
      },
      {
        path: 'dashboard',
        title: 'Admin dashboard',
        component: AdminDashboardComponent,
        children: [
          {
            path: 'add-product',
            title: 'Add new product',
            component: AddProductComponent,
          },
          {
            path: 'edit-product/:productId',
            title: 'Edit product',
            component: EditProductComponent,
          },
          {
            path: 'products-list',
            title: 'View all products',
            component: ViewProductsComponent,
          },
          {
            path: 'costs-dashboard',
            title: 'Cost dashboard',
            component: CostsDashboardComponent,
          },
          {
            path: 'pricing-dashboard',
            title: 'Pricing dashboard',
            component: PricingDashboardComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
