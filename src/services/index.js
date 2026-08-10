import  api  from "./api";
import  contactService  from "./contactService";
import  AuthService  from "./authService";
import UserService from "./userService";
import  ProductService  from "./productService";
import  OrderService  from "./orderService";
import StripeService from "./stripeService";
import EmailService from "./emailService";

export {
  api,
  contactService,
  AuthService,
  UserService,
  ProductService,
  OrderService,
  StripeService,
  EmailService,
};

const services = {
  api,
  contactService,
  AuthService,
  UserService,
  ProductService,
  OrderService,
  StripeService,
  EmailService,
};

export default services;