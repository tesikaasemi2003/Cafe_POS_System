// ========================= T&T Cafe POS - Order Model =========================
import { order_db, counters } from '../db/db.js';

const TAX_RATE = 0.10;

// --------------------------- Place Order ---------------------------
const placeOrderData = (customerId, customerName, items) => {
    const orderItems = items.map(i => ({
        itemId:    i.itemId,
        code:      i.code,
        name:      i.name,
        unitPrice: i.unitPrice,
        qty:       i.qty,
        icon:      i.icon,
        photo:     i.photo,
        lineTotal: i.unitPrice * i.qty,
    }));

    const subtotal = orderItems.reduce((sum, i) => sum + i.lineTotal, 0);
    const tax      = parseFloat((subtotal * TAX_RATE).toFixed(2));
    const total    = parseFloat((subtotal + tax).toFixed(2));

    const newOrder = {
        id:           counters.order_id++,
        customerId,
        customerName,
        items:        orderItems,
        subtotal,
        tax,
        total,
        status:       'completed',
        createdAt:    new Date().toISOString(),
    };

    order_db.push(newOrder);
    return newOrder;
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
const getRevenueToday = () => getOrdersToday().reduce((sum, o) => sum + o.total, 0);

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