export const STORAGE_KEY = "staffManagerKey";

export const DELAY = 500;

export const PHONE_REG = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
export const EMAIL_REG = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const NAME_REG = /([a-zA-Z0-9_\s]+)/;
export const URL_REG = /^(https?):\/\/([a-zA-Z0-9.-]+)(:\d+)?(\/[^\s]*)?\.(jpg|jpeg|png|gif|webp|bmp|svg)$/;


export const PHONE_ERR = "Invalid phone number";
export const NAME_ERR = "Invalid phone name";
export const Email_ERR = "Invalid email.\neg: like name@domain.com";
export const COMPANY_ERR = "Invalid company name";
export const ROLE_ERR = "Invalid role";
export const PHOTO_URL_ERR = "Invalid image url";