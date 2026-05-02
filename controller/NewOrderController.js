import { getMenuItemData, getMenuItemsByCategory, reduceStock } from '../model/MenuModel.js';
import { getCustomerById, updateLoyaltyAfterOrder } from '../model/CustomerModel.js';
import { placeOrderData } from '../model/OrderModel.js';
import { addOrderItem, clearOrder, getOrderItems, getOrderTotal, renderOrderPanel, loadCustomerDropdown } from './SideOrderBarController.js';

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
}

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