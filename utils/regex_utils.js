// ========================= T&T Cafe POS - Regex Utilities =========================

const check_item_code  = (code)  => /^[A-Z]{2,4}\d{3}$/.test(code);
const check_name       = (name)  => name.length >= 2 && name.length <= 60;
const check_price      = (price) => !isNaN(price) && parseFloat(price) > 0;
const check_positive_int = (val) => !isNaN(val) && parseInt(val) >= 0;
const check_phone      = (phone) => /^0[0-9]{9}$/.test(phone);
const check_email      = (email) => email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export { check_item_code, check_name, check_price, check_positive_int, check_phone, check_email };