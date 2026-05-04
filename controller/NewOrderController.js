// ========================= T&T Cafe POS - New Order Controller =========================
import { getMenuItemData, getMenuItemsByCategory, reduceStock } from '../model/MenuModel.js';
import { getCustomerById, updateLoyaltyAfterOrder } from '../model/CustomerModel.js';
import { placeOrderData } from '../model/OrderModel.js';
import { addOrderItem, clearOrder, getOrderItems, getOrderTotal, renderOrderPanel, loadCustomerDropdown } from './SideOrderBarController.js';
import { flyToCart, rippleCard, popBadge, popCartBadge, placeOrderLoading, showThankYou } from '../utils/animations.js';

const CATEGORIES = ['All', 'Hot Drinks', 'Cold Drinks', 'Bakery', 'Sandwiches', 'Light Meals', 'Desserts'];
const CAT_META = {
    'All':         { cls: 'all',     label: 'All Items',   emoji: '🍵' },
    'Hot Drinks':  { cls: 'hot',     label: 'Hot Drinks',  emoji: '☕' },
    'Cold Drinks': { cls: 'cold',    label: 'Cold Drinks', emoji: '🥤' },
    'Bakery':      { cls: 'bakery',  label: 'Bakery',      emoji: '🥐' },
    'Sandwiches':  { cls: 'sand',    label: 'Sandwiches',  emoji: '🥪' },
    'Light Meals': { cls: 'meals',   label: 'Light Meals', emoji: '🍛' },
    'Desserts':    { cls: 'dessert', label: 'Desserts',    emoji: '🍰' },
};

let currentCategory = 'All';

// ------------------------ Render Category Tabs --------------------------------
const renderCategoryTabs = () => {
    const $tabs = $('#cat-tabs');
    $tabs.empty();
    CATEGORIES.forEach(cat => {
        const meta   = CAT_META[cat];
        const active = cat === currentCategory ? 'active' : '';
        $tabs.append(`<div class="cat-tab t-${meta.cls} ${active}" data-cat="${cat}">${meta.emoji} ${cat}</div>`);
    });

    $tabs.off('click', '.cat-tab').on('click', '.cat-tab', function () {
        currentCategory = $(this).data('cat');
        renderCategoryTabs();
        renderMenuGrid();
    });
};

// ------------------------ Render Menu Grid ------------------------------------
const renderMenuGrid = () => {
    const $grid      = $('#menu-grid');
    const search     = $('#menu-search').val().toLowerCase().trim();
    const meta       = CAT_META[currentCategory];
    const orderItems = getOrderItems();

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
        $grid.html('<div class="no-items-msg">No items found 🔍</div>');
        return;
    }

    items.forEach(item => {
        const inOrder  = orderItems.find(r => r.itemId === item.id);
        const qty      = inOrder ? inOrder.qty : 0;
        const outStock = item.stock === 0;

        // Photo or emoji placeholder — wrapped in item-img-wrap for zoom effect
        const imgHtml = item.photo
            ? `<div class="item-img-wrap"><img class="item-photo" src="${item.photo}" alt="${item.name}" loading="lazy"></div>`
            : `<div class="item-img-wrap"><div class="item-photo-ph">${item.icon}</div></div>`;

        $grid.append(`
            <div class="item-card ${inOrder ? 'in-order' : ''} ${outStock ? 'out-stock' : ''}"
                 data-item-id="${item.id}" data-item-icon="${item.icon}">
                ${imgHtml}
                <div class="item-qty-badge" style="${qty > 0 ? 'display:flex' : 'display:none'}">${qty}</div>
                <div class="item-info">
                    <div class="item-code">${item.code}</div>
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">Rs. ${item.price.toFixed(2)}</div>
                </div>
            </div>`);
    });

    // Item card click
    $grid.off('click', '.item-card').on('click', '.item-card', function () {
        const id       = parseInt($(this).data('item-id'));
        const itemIcon = $(this).data('item-icon') || '☕';
        const allItems = getMenuItemData();
        const item     = allItems.find(i => i.id === id);
        if (!item || item.stock === 0) return;

        rippleCard(this);
        flyToCart(this, item.icon || itemIcon);
        popCartBadge();

        addOrderItem(item);
        renderMenuGrid();

        setTimeout(() => {
            const badge = $grid.find(`[data-item-id="${id}"] .item-qty-badge`)[0];
            if (badge) popBadge(badge);
        }, 50);
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
        html:  `<b>${customerName}</b><br>${orderItems.length} item(s) — Rs. ${total.toFixed(2)}`,
        icon:  'question',
        showCancelButton:    true,
        confirmButtonColor:  '#e53e3e',
        confirmButtonText:   'Place Order',
    }).then(result => {
        if (!result.isConfirmed) return;

        placeOrderLoading(true);

        setTimeout(() => {
            orderItems.forEach(row => reduceStock(row.itemId, row.qty));
            const saved = placeOrderData(customerId, customerName, orderItems);
            if (customer && customer.id !== 1) updateLoyaltyAfterOrder(customerId, total);

            placeOrderLoading(false);
            clearOrder();
            renderMenuGrid();
            loadCustomerDropdown();

            showThankYou(saved);
        }, 650);
    });
});

// ------------------------ Clear Order Button ----------------------------------
$('#btn-clear-order').on('click', () => {
    if (getOrderItems().length === 0) return;
    Swal.fire({
        title: 'Clear Order?',
        icon:  'warning',
        showCancelButton:   true,
        confirmButtonColor: '#e53e3e',
        confirmButtonText:  'Clear',
    }).then(r => {
        if (r.isConfirmed) {
            clearOrder();
            renderMenuGrid();
        }
    });
});

// ------------------------ Init New Order Page ---------------------------------
const initNewOrderPage = () => {
    loadCustomerDropdown();
    renderCategoryTabs();
    renderMenuGrid();
    renderOrderPanel();
};

export { initNewOrderPage, renderMenuGrid };