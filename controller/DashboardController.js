import { getOrdersToday, getRevenueToday, getUniqueCustomersToday, getOrderData } from '../model/OrderModel.js';
import { getMenuItemData } from '../model/MenuModel.js';

// ------------------------ Render Dashboard ------------------------------------
const renderDashboard = () => {
    const ordersToday    = getOrdersToday();
    const revenueToday   = getRevenueToday();
    const custToday      = getUniqueCustomersToday();
    const totalMenuItems = getMenuItemData().length;

    // Stat cards
    $('#d-orders').text(ordersToday.length);
    $('#d-rev').text(`Rs.${revenueToday.toFixed(0)}`);
    $('#d-cust').text(custToday);
    $('#d-items').text(totalMenuItems);

    // Recent orders list (last 8)
    renderRecentOrders();
};

// ------------------------ Recent Orders ----------------------------------------
const renderRecentOrders = () => {
    const $container = $('#d-recent');
    const all = getOrderData();
    const recent = [...all].reverse().slice(0, 8);

    if (recent.length === 0) {
        $container.html(`<div style="color:var(--brown-mid);font-size:13px;text-align:center;padding:24px;opacity:.6">No orders yet — start billing!</div>`);
        return;
    }

    $container.empty();
    recent.forEach(order => {
        const time = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const date = new Date(order.createdAt).toLocaleDateString();
        $container.append(`
            <div class="recent-order-row">
                <div class="ro-id">#${order.id}</div>
                <div class="ro-info">
                    <div class="ro-cust">${order.customerName}</div>
                    <div class="ro-time">${date} · ${time} · ${order.items.length} item(s)</div>
                </div>
                <div class="ro-total">Rs. ${order.total.toFixed(2)}</div>
            </div>`);
    });
};

export { renderDashboard };
