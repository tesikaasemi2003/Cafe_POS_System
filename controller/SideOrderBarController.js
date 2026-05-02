import { getCustomerData } from '../model/CustomerModel.js';
import { TAX_RATE } from '../model/OrderModel.js';

// Shared order state (imported by NewOrderController too)
let orderItems = [];

// ------------------------ Populate Customer Dropdown --------------------------
const loadCustomerDropdown = () => {
    const $select = $('#op-cust-select');
    $select.empty();
    getCustomerData().forEach(c => {
        $select.append(`<option value="${c.id}">${c.name}</option>`);
    });
};

// ------------------------ Render Order Panel ----------------------------------
const renderOrderPanel = () => {
    const $container = $('#op-items');
    $container.empty();

    if (orderItems.length === 0) {
        $container.html(`
            <div class="op-empty">
                <div class="op-empty-icon">🛒</div>
                <span>No items added yet</span>
            </div>`);
        updateOrderTotals();
        return;
    }

    orderItems.forEach(row => {
        const img = row.photo
            ? `<img class="op-row-img" src="${row.photo}" alt="${row.name}">`
            : `<div class="op-row-img-ph">${row.icon}</div>`;

        $container.append(`
            <div class="op-row" data-item-id="${row.itemId}">
                ${img}
                <div class="op-row-info">
                    <div class="op-row-code">${row.code}</div>
                    <div class="op-row-name">${row.name}</div>
                    <div class="op-row-unit">Rs. ${row.unitPrice.toFixed(2)} each</div>
                </div>
                <div class="op-qty-wrap">
                    <button class="op-qbtn" onclick="changeQty(${row.itemId}, -1)">−</button>
                    <span class="op-qnum">${row.qty}</span>
                    <button class="op-qbtn" onclick="changeQty(${row.itemId}, 1)">+</button>
                </div>
                <div class="op-row-price">Rs. ${(row.unitPrice * row.qty).toFixed(2)}</div>
                <button class="op-rmv" onclick="removeOrderItem(${row.itemId})">✕</button>
            </div>`);
    });

    updateOrderTotals();
};

// ------------------------ Update Totals Display --------------------------------
const updateOrderTotals = () => {
    const subtotal = orderItems.reduce((sum, r) => sum + r.unitPrice * r.qty, 0);
    const tax      = subtotal * TAX_RATE;
    const total    = subtotal + tax;

    $('#op-sub').text(`Rs. ${subtotal.toFixed(2)}`);
    $('#op-tax').text(`Rs. ${tax.toFixed(2)}`);
    $('#op-grand').text(`Rs. ${total.toFixed(2)}`);

    // Mobile cart badge
    const totalQty = orderItems.reduce((sum, r) => sum + r.qty, 0);
    $('#mob-cart-count').text(totalQty);

    updateOrderSubtitle();
};

// ------------------------ Order Panel Subtitle --------------------------------
const updateOrderSubtitle = () => {
    const count = orderItems.reduce((sum, r) => sum + r.qty, 0);
    $('#op-sub-title').text(count === 0 ? 'Select items to begin' : `${count} item${count > 1 ? 's' : ''} in order`);
};

// ------------------------ Add Item to Order -----------------------------------
const addOrderItem = (item) => {
    const existing = orderItems.find(r => r.itemId === item.id);
    if (existing) {
        existing.qty++;
    } else {
        orderItems.push({
            itemId: item.id, code: item.code, name: item.name,
            unitPrice: item.price, qty: 1, icon: item.icon, photo: item.photo
        });
    }
    renderOrderPanel();
};

// ------------------------ Change Qty -----------------------------------------
window.changeQty = (itemId, delta) => {
    const row = orderItems.find(r => r.itemId === itemId);
    if (!row) return;
    row.qty += delta;
    if (row.qty <= 0) orderItems = orderItems.filter(r => r.itemId !== itemId);
    renderOrderPanel();
};

// ------------------------ Remove Item ----------------------------------------
window.removeOrderItem = (itemId) => {
    orderItems = orderItems.filter(r => r.itemId !== itemId);
    renderOrderPanel();
};

// ------------------------ Clear Order ----------------------------------------
const clearOrder = () => {
    orderItems = [];
    $('#op-cust-select').val($('#op-cust-select option:first').val());
    renderOrderPanel();
};

// ------------------------ Get Current Order State ----------------------------
const getOrderItems  = () => orderItems;
const getOrderTotal  = () => {
    const subtotal = orderItems.reduce((sum, r) => sum + r.unitPrice * r.qty, 0);
    return { subtotal, tax: subtotal * TAX_RATE, total: subtotal + subtotal * TAX_RATE };
};

// ------------------------ Mobile Panel Toggle ---------------------------------
window.toggleMobPanel = () => {
    $('#order-panel').toggleClass('mob-open');
    $('#op-overlay').toggleClass('show');
};

window.closeMobPanel = () => {
    $('#order-panel').removeClass('mob-open');
    $('#op-overlay').removeClass('show');
};

export { addOrderItem, clearOrder, getOrderItems, getOrderTotal, renderOrderPanel, loadCustomerDropdown };
