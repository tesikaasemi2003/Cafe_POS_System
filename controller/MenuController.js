import {
    addMenuItemData, updateMenuItemData, deleteMenuItemData,
    getMenuItemData, getMenuItemById, getMenuItemByCode
} from '../model/MenuModel.js';
import { check_item_code, check_name, check_price, check_positive_int } from '../utils/regex_utils.js';
import { renderMenuGrid } from './NewOrderController.js';

const CATEGORIES = ['Hot Drinks', 'Cold Drinks', 'Bakery', 'Sandwiches', 'Light Meals', 'Desserts'];

// ------------------------ Render Menu Items Table ------------------------------
const renderMenuTable = () => {
    const search = $('#item-search').val().toLowerCase().trim();
    const $tbody = $('#item-tbl');
    $tbody.empty();

    let items = getMenuItemData();
    if (search) {
        items = items.filter(i =>
            i.name.toLowerCase().includes(search) ||
            i.code.toLowerCase().includes(search) ||
            i.category.toLowerCase().includes(search)
        );
    }
    if (items.length === 0) {
        $('#item-empty').show();
        return;
    }
    $('#item-empty').hide();

    items.forEach(item => {
        const thumb = item.photo
            ? `<img src="${item.photo}" style="width:36px;height:36px;border-radius:6px;object-fit:cover;">`
            : `<span style="font-size:24px">${item.icon}</span>`;
        const stockStyle = item.stock === 0 ? 'color:#e53e3e;font-weight:700' : '';
        $tbody.append(`
            <tr>
                <td>${thumb}</td>
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>Rs. ${item.price.toFixed(2)}</td>
                <td style="${stockStyle}">${item.stock}</td>
                <td>
                    <button class="btn-tbl-edit" onclick="openEditMenuItem(${item.id})">✏️ Edit</button>
                    <button class="btn-tbl-del"  onclick="confirmDeleteMenuItem(${item.id})">🗑️</button>
                </td>
            </tr>`);
    });
};
// ------------------------ Populate Category Select in Modal -------------------
const populateCatSelect = () => {
    const $sel = $('#i-cat');
    $sel.empty().append('<option value="">-- Select --</option>');
    CATEGORIES.forEach(c => $sel.append(`<option value="${c}">${c}</option>`));
};

// ------------------------ Open Add Modal --------------------------------------
$('#btn-new-item').on('click', () => {
    clearItemModal();
    populateCatSelect();
    $('#item-modal-title').text('Add Menu Item');
    $('#i-id').val('');
    $('#item-modal').addClass('show');
});
