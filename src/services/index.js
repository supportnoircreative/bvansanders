import { api } from "./api";
import { authService } from "./authService";
import { productService } from "./productService";
import { orderService } from "./orderService";
import { userService } from "./userService";
import { newsletterService } from "./newsletterService";
import { contactService } from "./contactService";
import { adminService } from "./adminService";

export {
  api,
  authService,
  productService,
  orderService,
  userService,
  newsletterService,
  contactService,
  adminService,
};

const services = {
  api,
  authService,
  productService,
  orderService,
  userService,
  newsletterService,
  contactService,
  adminService,
};

export default services;