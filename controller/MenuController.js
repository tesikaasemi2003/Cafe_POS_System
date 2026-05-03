// ========================= T&T Cafe POS - Menu Controller =========================
// Handles: menu items table, add/edit/delete modal, photo upload, search
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

// ------------------------ Open Edit Modal -------------------------------------
window.openEditMenuItem = (id) => {
    const item = getMenuItemById(id);
    if (!item) return;
    clearItemModal();
    populateCatSelect();
    $('#item-modal-title').text('Edit Menu Item');
    $('#i-id').val(item.id);
    $('#i-code').val(item.code);
    $('#i-cat').val(item.category);
    $('#i-name').val(item.name);
    $('#i-price').val(item.price);
    $('#i-qty').val(item.stock);
    $('#i-icon').val(item.icon);
    if (item.photo) setPhotoPreview(item.photo);
    $('#item-modal').addClass('show');
};

// ------------------------ Save / Update Item ----------------------------------
$('#btn-save-item').on('click', () => {
    const code  = $('#i-code').val().trim().toUpperCase();
    const cat   = $('#i-cat').val();
    const name  = $('#i-name').val().trim();
    const price = $('#i-price').val();
    const qty   = $('#i-qty').val();
    const icon  = $('#i-icon').val().trim() || '☕';
    const photo = $('#i-photo').val() || null;
    let valid   = true;

    if (!check_item_code(code)) { $('#i-code-e').show(); valid = false; } else { $('#i-code-e').hide(); }
    if (!cat)                   { $('#i-cat-e').show();  valid = false; } else { $('#i-cat-e').hide(); }
    if (!check_name(name))      { $('#i-name-e').show(); valid = false; } else { $('#i-name-e').hide(); }
    if (!check_price(price))    { $('#i-price-e').show();valid = false; } else { $('#i-price-e').hide(); }
    if (!check_positive_int(qty)){ $('#i-qty-e').show(); valid = false; } else { $('#i-qty-e').hide(); }
    if (!valid) return;

    const editId = $('#i-id').val();

    if (editId) {
        const id  = parseInt(editId);
        const dup = getMenuItemByCode(code);
        if (dup && dup.id !== id) {
            Swal.fire({ icon: 'error', title: 'Item code already exists!' });
            return;
        }
        updateMenuItemData(id, code, name, cat, parseFloat(price), parseInt(qty), icon, photo);
        Swal.fire({ icon: 'success', title: 'Menu item updated!' });
    } else {
        if (getMenuItemByCode(code)) {
            Swal.fire({ icon: 'error', title: 'Item code already exists!' });
            return;
        }
        addMenuItemData(code, name, cat, parseFloat(price), parseInt(qty), icon, photo);
        Swal.fire({ icon: 'success', title: 'Menu item added!' });
    }

    $('#item-modal').removeClass('show');
    renderMenuTable();
    renderMenuGrid();   // sync order page grid
});

// ------------------------ Delete Item -----------------------------------------
window.confirmDeleteMenuItem = (id) => {
    const item = getMenuItemById(id);
    if (!item) return;
    Swal.fire({
        title: `Delete "${item.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e53e3e',
        confirmButtonText: 'Delete'
    }).then(r => {
        if (r.isConfirmed) {
            deleteMenuItemData(id);
            Swal.fire({ icon: 'success', title: 'Item deleted!' });
            renderMenuTable();
            renderMenuGrid();
        }
    });
};

// ------------------------ Photo Upload ----------------------------------------
$('#i-photo-file').on('change', function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        setPhotoPreview(e.target.result);
        $('#i-photo').val(e.target.result);
    };
    reader.readAsDataURL(file);
});

$('#btn-remove-photo').on('click', () => {
    $('#i-photo').val('');
    $('#photo-preview').html('<span style="font-size:28px;opacity:.4">📷</span>');
    $('#btn-remove-photo').hide();
});

const setPhotoPreview = (url) => {
    $('#photo-preview').html(`<img src="${url}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`);
    $('#btn-remove-photo').show();
};

// ------------------------ Cancel Modal ----------------------------------------
$('#btn-cancel-item').on('click', () => $('#item-modal').removeClass('show'));

// ------------------------ Search ----------------------------------------------
$('#item-search').on('input', renderMenuTable);

// ------------------------ Helpers ---------------------------------------------
const clearItemModal = () => {
    ['#i-code', '#i-name', '#i-price', '#i-qty', '#i-icon'].forEach(id => $(id).val(''));
    ['#i-code-e', '#i-cat-e', '#i-name-e', '#i-price-e', '#i-qty-e'].forEach(id => $(id).hide());
    $('#i-photo').val('');
    $('#photo-preview').html('<span style="font-size:28px;opacity:.4">📷</span>');
    $('#btn-remove-photo').hide();
};

export { renderMenuTable };
