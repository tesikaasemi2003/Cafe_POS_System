import { order_db } from 'db/db.js';
import * as db from 'db/db.js';

const TAX_RATE = 0.10; // 10% tax

class OrderItem {
    constructor(itemId, code, name, unitPrice, qty, icon, photo) {
        this.itemId    = itemId;
        this.code      = code;
        this.name      = name;
        this.unitPrice = unitPrice;
        this.qty       = qty;
        this.icon      = icon;
        this.photo     = photo;
        this.lineTotal = unitPrice * qty;
    }
}

class Order {
    #id;
    #customerId;
    #customerName;
    #items;
    #subtotal;
    #tax;
    #total;
    #status;
    #createdAt;

    constructor(id, customerId, customerName, items) {
        this.#id           = id;
        this.#customerId   = customerId;
        this.#customerName = customerName;
        this.#items        = items;

        const subtotal     = items.reduce((sum, i) => sum + i.lineTotal, 0);
        this.#subtotal     = subtotal;
        this.#tax          = parseFloat((subtotal * TAX_RATE).toFixed(2));
        this.#total        = parseFloat((subtotal + this.#tax).toFixed(2));
        this.#status       = 'completed';
        this.#createdAt    = new Date().toISOString();
    }

    get id()           { return this.#id; }
    get customerId()   { return this.#customerId; }
    get customerName() { return this.#customerName; }
    get items()        { return this.#items; }
    get subtotal()     { return this.#subtotal; }
    get tax()          { return this.#tax; }
    get total()        { return this.#total; }
    get status()       { return this.#status; }
    get createdAt()    { return this.#createdAt; }
}

// --------------------------- Place Order ---------------------------
const placeOrderData = (customerId, customerName, items) => {
    const order_items = items.map(i =>
        new OrderItem(i.itemId, i.code, i.name, i.unitPrice, i.qty, i.icon, i.photo)
    );
    const new_order = new Order(db.order_id_counter++, customerId, customerName, order_items);
    order_db.push(new_order);
    return new_order;
};

// --------------------------- Get All Orders ---------------------------
const getOrderData = () => order_db;

// --------------------------- Get Order by ID ---------------------------
const getOrderById = (id) => order_db.find(o => o.id === id);

// --------------------------- Get Orders Today ---------------------------
const getOrdersToday = () => {
    const today = new Date().toDateString();
    return order_db.filter(o => new Date(o.createdAt).toDateString() === today);
};

// --------------------------- Get Revenue Today ---------------------------
const getRevenueToday = () => {
    return getOrdersToday().reduce((sum, o) => sum + o.total, 0);
};

// --------------------------- Get Unique Customers Today ---------------------------
const getUniqueCustomersToday = () => {
    const ids = getOrdersToday().map(o => o.customerId);
    return [...new Set(ids)].length;
};

export {
    placeOrderData, getOrderData, getOrderById,
    getOrdersToday, getRevenueToday, getUniqueCustomersToday,
    TAX_RATE
};
