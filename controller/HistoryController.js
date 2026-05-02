// Handles: order history list, order detail expand, sear
import { getOrderData } from 'model/OrderModel.js';

// ------------------------ Render Order History --------------------------------
const renderHistory = () => {
    const search     = $('#hist-search').val().toLowerCase().trim();
    const $container = $('#hist-list');
    $container.empty();

    let orders = [...getOrderData()].reverse(); // most recent first

    if (search) {
        orders = orders.filter(o =>
            o.customerName.toLowerCase().includes(search) ||
            String(o.id).includes(search)
        );
    }

    if (orders.length === 0) {
        $container.html(`
            <div class="hist-empty">
                <div style="font-size:36px;margin-bottom:8px">🕐</div>
                <div>No orders found</div>
            </div>`);
        return;
    }

    orders.forEach(order => {
        const date = new Date(order.createdAt).toLocaleString();
        const itemsSummary = order.items.slice(0, 2).map(i => `${i.icon} ${i.name}`).join(', ');
        const more = order.items.length > 2 ? ` +${order.items.length - 2} more` : '';

        $container.append(`
            <div class="hist-card" data-order-id="${order.id}">
                <div class="hist-card-head">
                    <div class="hist-order-id">Order #${order.id}</div>
                    <div class="hist-date">${date}</div>
                </div>
                <div class="hist-cust">👤 ${order.customerName}</div>
                <div class="hist-items-preview">${itemsSummary}${more}</div>
                <div class="hist-card-foot">
                    <span class="hist-count">${order.items.length} item(s)</span>
                    <span class="hist-total">Rs. ${order.total.toFixed(2)}</span>
                </div>
                <div class="hist-detail" id="hist-detail-${order.id}" style="display:none">
                    ${buildOrderDetail(order)}
                </div>
            </div>`);
    });

    // Toggle detail on card click
    $container.off('click', '.hist-card').on('click', '.hist-card', function () {
        const id     = $(this).data('order-id');
        const $detail = $(`#hist-detail-${id}`);
        $detail.slideToggle(200);
    });
};

// ------------------------ Build Detail HTML ----------------------------------
const buildOrderDetail = (order) => {
    const rows = order.items.map(i =>
        `<tr>
            <td>${i.icon} ${i.name}</td>
            <td style="text-align:center">${i.qty}</td>
            <td style="text-align:right">Rs. ${i.unitPrice.toFixed(2)}</td>
            <td style="text-align:right">Rs. ${(i.unitPrice * i.qty).toFixed(2)}</td>
        </tr>`
    ).join('');

    return `
        <table class="hist-detail-tbl">
            <thead>
                <tr>
                    <th>Item</th><th>Qty</th><th>Unit</th><th>Total</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
        <div class="hist-detail-totals">
            <div><span>Subtotal</span><span>Rs. ${order.subtotal.toFixed(2)}</span></div>
            <div><span>Tax (10%)</span><span>Rs. ${order.tax.toFixed(2)}</span></div>
            <div class="hist-grand"><span>TOTAL</span><span>Rs. ${order.total.toFixed(2)}</span></div>
        </div>`;
};

// ------------------------ Search Input ----------------------------------------
$('#hist-search').on('input', renderHistory);

export { renderHistory };
