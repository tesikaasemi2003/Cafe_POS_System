import { getMenuItemData, getMenuItemsByCategory, reduceStock } from '../model/MenuModel.js';
import { updateLoyaltyAfterOrder } from '../model/CustomerModel.js';
import { placeOrderData } from '../model/OrderModel.js';
import { addOrderItem, clearOrder, getOrderItems, renderOrderPanel, loadCustomerDropdown } from './SideOrderBarController.js';
import { flyToCart, rippleCard, popCartBadge, placeOrderLoading, showThankYou } from '../utils/animations.js';

const CATEGORIES = ['All', 'Hot Drinks', 'Cold Drinks', 'Bakery', 'Sandwiches', 'Light Meals', 'Desserts'];
const CAT_META = {
    'All':         { cls: 'all',     label: 'All Items',   emoji: '🍵' },
    'Hot Drinks':  { cls: 'hot',     label: 'Hot Drinks',  emoji: '☕' },
    'Cold Drinks': { cls: 'cold',    label: 'Cold Drinks', emoji: '🧊' },
    'Bakery':      { cls: 'bakery',  label: 'Bakery',      emoji: '🥐' },
    'Sandwiches':  { cls: 'sand',    label: 'Sandwiches',  emoji: '🥪' },
    'Light Meals': { cls: 'meals',   label: 'Light Meals', emoji: '🍛' },
    'Desserts':    { cls: 'dessert', label: 'Desserts',    emoji: '🍰' },
};

let currentCategory = 'All';

const renderCategoryTabs = () => {
    const $tabs = $('#cat-tabs');
    if (!$tabs.length) return;
    $tabs.empty();

    CATEGORIES.forEach(cat => {
        const meta = CAT_META[cat];
        const active = cat === currentCategory ? 'active' : '';
        $tabs.append(`<div class="cat-tab t-${meta.cls} ${active}" data-cat="${cat}">${meta.emoji} ${cat}</div>`);
    });

    $tabs.off('click', '.cat-tab').on('click', '.cat-tab', function () {
        currentCategory = $(this).data('cat');
        renderCategoryTabs();
        renderMenuGrid();
    });
};

const renderMenuGrid = () => {
    const $grid = $('#menu-grid');
    const search = $('#menu-search').val()?.toLowerCase().trim() || "";
    const meta = CAT_META[currentCategory];
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
        const inOrder = orderItems.find(r => r.itemId === item.id);
        const qty = inOrder ? inOrder.qty : 0;
        const outStock = item.stock === 0;

        const imgHtml = item.photo
            ? `<div class="item-img-wrap"><img class="item-photo" src="${item.photo}" alt="${item.name}"></div>`
            : `<div class="item-img-wrap"><div class="item-photo-ph">${item.icon || '☕'}</div></div>`;

        $grid.append(`
            <div class="item-card ${inOrder ? 'in-order' : ''} ${outStock ? 'out-stock' : ''}"
                 data-item-id="${item.id}">
                ${imgHtml}
                <div class="item-qty-badge" style="${qty > 0 ? 'display:flex' : 'display:none'}">${qty}</div>
                <div class="item-info">
                    <div class="item-code">${item.code}</div>
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">Rs. ${item.price.toFixed(2)}</div>
                </div>
            </div>`);
    });

    $grid.off('click', '.item-card').on('click', '.item-card', function () {
        const id = parseInt($(this).data('item-id'));
        const allItems = getMenuItemData();
        const item = allItems.find(i => i.id === id);
        if (!item || item.stock === 0) return;

        rippleCard(this);
        flyToCart(this, item.icon || '☕');
        popCartBadge();
        addOrderItem(item);
        renderMenuGrid();
    });
};

$(document).on('input', '#menu-search', () => renderMenuGrid());

const initNewOrderPage = () => {
    loadCustomerDropdown();
    renderCategoryTabs();
    renderMenuGrid();
    renderOrderPanel();

    $(document).off('click', '#btn-place-order').on('click', '#btn-place-order', async () => {
        const items = getOrderItems();
        if (items.length === 0) {
            Swal.fire({ icon: 'warning', title: 'Empty Order', text: 'Add items before placing order!', timer: 1800, showConfirmButton: false });
            return;
        }

        const customerId   = parseInt($('#op-cust-select').val());
        const customerName = $('#op-cust-select option:selected').text();

        const newOrder = placeOrderData(customerId, customerName, items);
        items.forEach(i => reduceStock(i.itemId, i.qty));
        updateLoyaltyAfterOrder(customerId, newOrder.total);

        await placeOrderLoading();
        showThankYou();

        clearOrder();
        renderMenuGrid();
    });

    $(document).off('click', '#btn-clear-order').on('click', '#btn-clear-order', () => {
        if (getOrderItems().length === 0) return;
        Swal.fire({
            title: 'Clear order?',
            text: 'All items will be removed.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, clear',
            cancelButtonText: 'Cancel'
        }).then(result => {
            if (result.isConfirmed) {
                clearOrder();
                renderMenuGrid();
            }
        });
    });
};

window.renderMenuGrid = renderMenuGrid;
window.initNewOrderPage = initNewOrderPage;

export { renderMenuGrid, initNewOrderPage };