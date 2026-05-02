import { getMenuItemData, getMenuItemsByCategory, reduceStock } from 'model/MenuModel.js';
import { getCustomerById, updateLoyaltyAfterOrder } from 'model/CustomerModel.js';
import { placeOrderData } from 'model/OrderModel.js';
import { addOrderItem, clearOrder, getOrderItems, getOrderTotal, renderOrderPanel, loadCustomerDropdown } from 'SideOrderBarController.js';

const CATEGORIES = ['All', 'Hot Drinks', 'Cold Drinks', 'Bakery', 'Sandwiches', 'Light Meals', 'Desserts'];
const CAT_META = {
    'All':          { cls: 'all',     label: 'All Items',    emoji: '🍵' },
    'Hot Drinks':   { cls: 'hot',     label: 'Hot Drinks',   emoji: '☕' },
    'Cold Drinks':  { cls: 'cold',    label: 'Cold Drinks',  emoji: '🥤' },
    'Bakery':       { cls: 'bakery',  label: 'Bakery',       emoji: '🥐' },
    'Sandwiches':   { cls: 'sand',    label: 'Sandwiches',   emoji: '🥪' },
    'Light Meals':  { cls: 'meals',   label: 'Light Meals',  emoji: '🍛' },
    'Desserts':     { cls: 'dessert', label: 'Desserts',     emoji: '🍰' },
};

let currentCategory = 'All';

// ------------------------ Render Category Tabs --------------------------------
const renderCategoryTabs = () => {
    const $tabs = $('#cat-tabs');
    $tabs.empty();
    CATEGORIES.forEach(cat => {
        const meta = CAT_META[cat];
        const active = cat === currentCategory ? 'active' : '';
        $tabs.append(`<div class="cat-tab t-${meta.cls} ${active}" data-cat="${cat}">${meta.emoji} ${cat}</div>`);
    });

    // Tab click
    $tabs.off('click', '.cat-tab').on('click', '.cat-tab', function () {
        currentCategory = $(this).data('cat');
        renderCategoryTabs();
        renderMenuGrid();
    });
};

// ------------------------ Render Menu Grid ------------------------------------
const renderMenuGrid = () => {
    const $grid   = $('#menu-grid');
    const search  = $('#menu-search').val().toLowerCase().trim();
    const meta    = CAT_META[currentCategory];
    const orderItems = getOrderItems();

    // Banner
    $('#cat-banner').attr('class', `cat-banner ${meta.cls}`);
    $('#cat-banner-name').text(`${meta.emoji} ${meta.label}`);

    let items = getMenuItemsByCategory(currentCategory);
    if (search) {
        items = items.filter(i =>
            i.name.toLowerCase().includes(search) ||
            i.code.toLowerCase().includes(search)
        );
    }

    $grid.empty();

    if (items.length === 0) {
        $grid.html('<div style="grid-column:1/-1;text-align:center;padding:40px;color:#8a6a4a;font-size:13px;">No items found</div>');
        return;
    }

    items.forEach(item => {
        const inOrder = orderItems.find(r => r.itemId === item.id);
        const qty     = inOrder ? inOrder.qty : 0;
        const outStock = item.stock === 0;
        const img = item.photo
            ? `<img class="item-photo" src="${item.photo}" alt="${item.name}">`
            : `<div class="item-photo-ph">${item.icon}</div>`;

        $grid.append(`
            <div class="item-card ${inOrder ? 'in-order' : ''} ${outStock ? 'out-stock' : ''}"
                 data-item-id="${item.id}">
                ${img}
                <div class="item-qty-badge" style="${qty > 0 ? 'display:flex' : 'display:none'}">${qty}</div>
                <div class="item-code">${item.code}</div>
                <div class="item-name">${item.name}</div>
                <div class="item-price">Rs. ${item.price.toFixed(2)}</div>
            </div>`);
    });

    // Item card click
    $grid.off('click', '.item-card').on('click', '.item-card', function () {
        const id = parseInt($(this).data('item-id'));
        const items_all = getMenuItemData();
        const item = items_all.find(i => i.id === id);
        if (!item || item.stock === 0) return;
        addOrderItem(item);
        renderMenuGrid(); // refresh badges
    });
};

// ------------------------ Search Handler --------------------------------------
$('#menu-search').on('input', () => renderMenuGrid());

// ------------------------ Place Order Handler ---------------------------------
$('#btn-place-order').on('click', () => {
    const orderItems = getOrderItems();
    if (orderItems.length === 0) {
        Swal.fire({ icon: 'warning', title: 'Empty Order', text: 'Please add items to the order.' });
        return;
    }

    const customerId   = parseInt($('#op-cust-select').val());
    const customer     = getCustomerById(customerId);
    const customerName = customer ? customer.name : 'Walk-in Customer';
    const { subtotal, tax, total } = getOrderTotal();

    Swal.fire({
        title: 'Confirm Order?',
        html: `<b>${customerName}</b><br>${orderItems.length} item(s) — Rs. ${total.toFixed(2)}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#e53e3e',
        confirmButtonText: 'Place Order'
    }).then(result => {
        if (!result.isConfirmed) return;

        // Reduce stock
        orderItems.forEach(row => reduceStock(row.itemId, row.qty));

        // Save order
        const saved = placeOrderData(customerId, customerName, orderItems);

        // Update loyalty
        if (customer) updateLoyaltyAfterOrder(customerId, total);

        // Show receipt
        showReceipt(saved);

        // Clear order
        clearOrder();
        renderMenuGrid();
        loadCustomerDropdown();
    });
});

// ------------------------ Clear Order Button ----------------------------------
$('#btn-clear-order').on('click', () => {
    if (getOrderItems().length === 0) return;
    Swal.fire({
        title: 'Clear Order?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e53e3e',
        confirmButtonText: 'Clear'
    }).then(r => {
        if (r.isConfirmed) {
            clearOrder();
            renderMenuGrid();
        }
    });
});

// ------------------------ Receipt Modal ---------------------------------------
const showReceipt = (order) => {
    const rows = order.items.map(i =>
        `<tr><td>${i.icon} ${i.name}</td><td style="text-align:center">${i.qty}</td><td style="text-align:right">Rs. ${(i.unitPrice * i.qty).toFixed(2)}</td></tr>`
    ).join('');

    $('#receipt').html(`
        <div style="text-align:center;margin-bottom:12px">
            <div style="font-size:22px">☕</div>
            <div style="font-weight:800;font-size:16px;font-family:'Playfair Display',serif">T&T Cafe</div>
            <div style="font-size:11px;color:#8a6a4a">Order #${order.id} · ${new Date(order.createdAt).toLocaleString()}</div>
            <div style="font-size:12px;color:#4a2c1a;margin-top:4px">${order.customerName}</div>
        </div>
        <table style="width:100%;font-size:12px;border-collapse:collapse">
            <thead><tr style="border-bottom:1px dashed #d4a855">
                <th style="text-align:left;padding:4px 0">Item</th>
                <th style="text-align:center">Qty</th>
                <th style="text-align:right">Total</th>
            </tr></thead>
            <tbody>${rows}</tbody>
        </table>
        <div style="border-top:1px dashed #d4a855;margin-top:10px;padding-top:8px;font-size:12px">
            <div style="display:flex;justify-content:space-between"><span>Subtotal</span><span>Rs. ${order.subtotal.toFixed(2)}</span></div>
            <div style="display:flex;justify-content:space-between"><span>Tax (10%)</span><span>Rs. ${order.tax.toFixed(2)}</span></div>
            <div style="display:flex;justify-content:space-between;font-weight:800;font-size:15px;margin-top:6px;color:#e53e3e">
                <span>TOTAL</span><span>Rs. ${order.total.toFixed(2)}</span>
            </div>
        </div>
        <div style="text-align:center;margin-top:14px;font-size:11px;color:#8a6a4a;font-style:italic">Thank you for visiting T&T Cafe! ☕</div>
    `);

    $('#order-modal').addClass('show');
};

$('#btn-close-receipt').on('click', () => $('#order-modal').removeClass('show'));

// ------------------------ Init New Order Page ---------------------------------
const initNewOrderPage = () => {
    loadCustomerDropdown();
    renderCategoryTabs();
    renderMenuGrid();
    renderOrderPanel();
};

export { initNewOrderPage, renderMenuGrid };
