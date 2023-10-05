import { Backend_url } from "./helper";
import { commonApi } from "./Apicalls";
export const registerFunction = async (data) => {
  return await commonApi("POST", `${Backend_url}/user/register`, data);
};
export const sentOtpFunction = async (data) => {
  return await commonApi("POST", `${Backend_url}/user/sendotp`, data);
};
export const userVerify = async (data) => {
  return await commonApi("POST", `${Backend_url}/user/login`, data);
};
export const contactApi = async (data) => {
  return await commonApi("POST", `${Backend_url}/user/contact`, data);
};
export const orderApi = async (data) => {
  return await commonApi("POST", `${Backend_url}/user/order`, data);
};
