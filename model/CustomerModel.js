import { customer_db } from 'db/db.js';
import * as db from 'db/db.js';

class Customer {
    #id;
    #name;
    #phone;
    #email;
    #address;
    #loyaltyPoints;
    #totalSpent;
    #joinDate;

    constructor(id, name, phone, email = '', address = '', loyaltyPoints = 0, totalSpent = 0) {
        this.#id = id;
        this.#name = name;
        this.#phone = phone;
        this.#email = email;
        this.#address = address;
        this.#loyaltyPoints = loyaltyPoints;
        this.#totalSpent = totalSpent;
        this.#joinDate = new Date().toISOString();

    }
    get id()            { return this.#id; }
    get name()          { return this.#name; }
    get phone()         { return this.#phone; }
    get email()         { return this.#email; }
    get address()       { return this.#address; }
    get loyaltyPoints() { return this.#loyaltyPoints; }
    get totalSpent()    { return this.#totalSpent; }
    get joinDate()      { return this.#joinDate; }

    set name(name)                   { this.#name = name; }
    set phone(phone)                 { this.#phone = phone; }
    set email(email)                 { this.#email = email; }
    set address(address)             { this.#address = address; }
    set loyaltyPoints(loyaltyPoints) { this.#loyaltyPoints = loyaltyPoints; }
    set totalSpent(totalSpent)       { this.#totalSpent = totalSpent; }
}

// --------------------------- Add Customer ---------------------------
const addCustomerData = (name, phone, email, address) => {
    const new_customer = new Customer(db.customer_id_counter++, name, phone, email, address);
    customer_db.push(new_customer);
    return new_customer;
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
        obj.loyaltyPoints += Math.floor(orderTotal / 100); // 1 point per Rs.100
    }
};