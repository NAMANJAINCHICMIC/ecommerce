export const PAGE = {
    SIGN_IN:'auth/sign-in',
    PROFILE:'auth/profile',
    OTP_PAGE:'auth/otp-page',
    CUSTOMER_SIGN_UP:'auth/customer-sign-up',
    VENDOR_SIGN_UP:'auth/vendor-sign-up',
    HOME:'customer/customer/home',
    MY_CART:'customer/customer/my-cart',
    MY_ORDERS:'customer/customer/my-orders',
    PAYMENT_GATEWAY:'customer/customer/payment-gateway',
    CUSTOMER_PROFILE:'customer/customer/view-details',
    UPDATE_CUSTOMER_PROFILE:'customer/customer/update-details',
    PRODUCT_DETAIL: 'customer/customer/product-detail',
    ADD_REVIEWS: 'customer/customer/add-reviews',
    VENDOR_HOME:'vendor/vendor/vendor-home',
    VENDOR_ORDERS:'vendor/vendor/vendor-orders',
    ADD_ITEM:'vendor/vendor/add-item',
    UPDATE_ITEM:'vendor/vendor/update-item',
    VENDOR_PROFILE:'vendor/vendor/vendor-detail',
    UPDATE_VENDOR_PROFILE:'vendor/vendor/update-vendor-detail',
    VENDOR_PRODUCT_DETAIL:'vendor/vendor/vendor-product-detail'
}
export const defaultImage = '../assets/noImage.jpeg';
export const REGEX={
    REPLACE:/[^0-9]/g,
    OTP: /[^0-9]/ ,
    MOBILE_NUMBER: "^[6-9]\\d{9}$"
}