import { api } from "./api";
import { contactService } from "./contactService";
import { newsletterService } from "./newsletterService";
import { AuthService } from "./AuthService";
import { UserService } from "./UserService";
import { ProductService } from "./ProductService";
import { OrderService } from "./OrderService";

export {
  api,
  contactService,
  newsletterService,
  AuthService,
  UserService,
  ProductService,
  OrderService,
};

const services = {
  api,
  contactService,
  newsletterService,
  AuthService,
  UserService,
  ProductService,
  OrderService,
};

export default services;