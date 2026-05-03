// ========================= T&T Cafe POS - Regex Utilities =========================

// ------------------------ Phone Validation (Sri Lanka: 07X XXXXXXX) --------------
const phone_regex = new RegExp('^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$');

// ------------------------ Email Validation --------------
const email_regex = new RegExp('^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$');

// ------------------------ Item Code Validation (e.g. HOT001, CLD002) --------------
// Format: 2–4 uppercase letters + 3 digits
const item_code_regex = new RegExp('^[A-Z]{2,4}[0-9]{3}$');

// ------------------------ Price Validation (positive number, max 2 decimals) ------
const price_regex = new RegExp('^[0-9]+(\\.[0-9]{1,2})?$');

// ------------------------ Name Validation (min 2 chars, letters/spaces/dots) ------
const name_regex = new RegExp("^[a-zA-Z\\s.'-]{2,60}$");

// ------------------------ Positive Integer Validation (qty/stock) -----------------
const positive_int_regex = new RegExp('^[0-9]+$');

// ========================= Validator Functions =========================

const check_phone = (phone) => {
    return phone_regex.test(phone.trim());
};

const check_email = (email) => {
    if (!email || email.trim() === '') return true;   // email is optional
    return email_regex.test(email.trim());
};

const check_item_code = (code) => {
    return item_code_regex.test(code.trim());
};

const check_price = (price) => {
    return price_regex.test(String(price)) && parseFloat(price) > 0;
};

const check_name = (name) => {
    return name_regex.test(name.trim());
};

const check_positive_int = (val) => {
    return positive_int_regex.test(String(val)) && parseInt(val) >= 0;
};

export { check_phone, check_email, check_item_code, check_price, check_name, check_positive_int };
