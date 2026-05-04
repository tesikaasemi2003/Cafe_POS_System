// ========================= T&T Cafe POS - Customer Model =========================
import { customer_db, counters } from '../db/db.js';

// --------------------------- Add Customer ---------------------------
const addCustomerData = (name, phone, email, address) => {
    const newCustomer = {
        id:            counters.customer_id++,
        name, phone,
        email:         email   || '',
        address:       address || '',
        loyaltyPoints: 0,
        totalSpent:    0,
        joinDate:      new Date().toISOString(),
    };
    customer_db.push(newCustomer);
    return newCustomer;
};

// --------------------------- Update Customer ---------------------------
const updateCustomerData = (id, name, phone, email, address) => {
    const obj = customer_db.find(c => c.id === id);
    if (obj) {
        obj.name    = name;
        obj.phone   = phone;
        obj.email   = email;
        obj.address = address;
    }
    return obj;
};

// --------------------------- Delete Customer ---------------------------
const deleteCustomerData = (id) => {
    const index = customer_db.findIndex(c => c.id === id);
    if (index !== -1) customer_db.splice(index, 1);
};

// --------------------------- Get All Customers ---------------------------
const getCustomerData = () => customer_db;

// --------------------------- Get Customer by ID ---------------------------
const getCustomerById = (id) => customer_db.find(c => c.id === id);

// --------------------------- Get Customer by Phone ---------------------------
const getCustomerByPhone = (phone) => customer_db.find(c => c.phone === phone);

// --------------------------- Update Loyalty After Order ---------------------------
const updateLoyaltyAfterOrder = (id, orderTotal) => {
    const obj = customer_db.find(c => c.id === id);
    if (obj) {
        obj.totalSpent    += orderTotal;
        obj.loyaltyPoints += Math.floor(orderTotal / 100);
    }
};

export {
    addCustomerData, updateCustomerData, deleteCustomerData,
    getCustomerData, getCustomerById, getCustomerByPhone, updateLoyaltyAfterOrder
};