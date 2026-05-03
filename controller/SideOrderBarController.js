// ========================= T&T Cafe POS - Side Order Bar Controller =========================
import { getCustomerData } from 'model/CustomerModel.js';
import { TAX_RATE } from 'model/OrderModel.js';
import { popTotal, popCartBadge } from 'utils/animations.js';

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
                    <span class="op-qnum" id="qnum-${row.itemId}">${row.qty}</span>
                    <button class="op-qbtn" onclick="changeQty(${row.itemId}, 1)">+</button>
                </div>
                <div class="op-row-price" id="oprice-${row.itemId}">Rs. ${(row.unitPrice * row.qty).toFixed(2)}</div>
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

    const totalQty = orderItems.reduce((sum, r) => sum + r.qty, 0);
    $('#mob-cart-count').text(totalQty);

    updateOrderSubtitle();
    popTotal(); // animate total on every change
};

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

// ------------------------ Change Qty (with animation) -------------------------
window.changeQty = (itemId, delta) => {
    const row = orderItems.find(r => r.itemId === itemId);
    if (!row) return;
    row.qty += delta;
    if (row.qty <= 0) {
        // Animate row out then re-render
        const rowEl = document.querySelector(`.op-row[data-item-id="${itemId}"]`);
        if (rowEl) {
            rowEl.classList.add('removing');
            rowEl.addEventListener('animationend', () => {
                orderItems = orderItems.filter(r => r.itemId !== itemId);
                renderOrderPanel();
            }, { once: true });
        } else {
            orderItems = orderItems.filter(r => r.itemId !== itemId);
            renderOrderPanel();
        }
        return;
    }
    // Update qty number in place (no full re-render = smoother)
    const qEl = document.getElementById(`qnum-${itemId}`);
    const pEl = document.getElementById(`oprice-${itemId}`);
    if (qEl) {
        qEl.textContent = row.qty;
        qEl.classList.remove('qty-flash');
        void qEl.offsetWidth;
        qEl.classList.add('qty-flash');
    }
    if (pEl) pEl.textContent = `Rs. ${(row.unitPrice * row.qty).toFixed(2)}`;
    updateOrderTotals();
    popCartBadge();
};

// ------------------------ Remove Item (with slide-out) -----------------------
window.removeOrderItem = (itemId) => {
    const rowEl = document.querySelector(`.op-row[data-item-id="${itemId}"]`);
    if (rowEl) {
        rowEl.classList.add('removing');
        rowEl.addEventListener('animationend', () => {
            orderItems = orderItems.filter(r => r.itemId !== itemId);
            renderOrderPanel();
        }, { once: true });
    } else {
        orderItems = orderItems.filter(r => r.itemId !== itemId);
        renderOrderPanel();
    }
};

// ------------------------ Clear Order ----------------------------------------
const clearOrder = () => {
    orderItems = [];
    $('#op-cust-select').val($('#op-cust-select option:first').val());
    renderOrderPanel();
};

// ------------------------ Getters --------------------------------------------
const getOrderItems = () => orderItems;
const getOrderTotal = () => {
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
