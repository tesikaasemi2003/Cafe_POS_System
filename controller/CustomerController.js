// ========================= T&T Cafe POS - Customer Controller =========================
// Handles: customer table, add/edit/delete modal, search
import {
    addCustomerData, updateCustomerData, deleteCustomerData,
    getCustomerData, getCustomerById, getCustomerByPhone
} from '../model/CustomerModel.js';
import { check_name, check_phone, check_email } from '../utils/regex_utils.js';
import { loadCustomerDropdown } from './SideOrderBarController.js';

// ------------------------ Render Customer Table --------------------------------
const renderCustomerTable = () => {
    const search  = $('#cust-search').val().toLowerCase().trim();
    const $tbody  = $('#cust-tbl');
    $tbody.empty();

    let customers = getCustomerData().filter(c => c.id !== 1); // exclude Walk-in
    if (search) {
        customers = customers.filter(c =>
            c.name.toLowerCase().includes(search) ||
            c.phone.includes(search) ||
            c.email.toLowerCase().includes(search)
        );
    }

    if (customers.length === 0) {
        $('#cust-empty').show();
        return;
    }
    $('#cust-empty').hide();

    customers.forEach(c => {
        $tbody.append(`
            <tr>
                <td>#${c.id}</td>
                <td>${c.name}</td>
                <td>${c.phone}</td>
                <td>${c.email || '—'}</td>
                <td>${c.address || '—'}</td>
                <td><span class="loyalty-badge">⭐ ${c.loyaltyPoints}</span></td>
                <td>
                    <button class="btn-tbl-edit" onclick="openEditCustomer(${c.id})">✏️ Edit</button>
                    <button class="btn-tbl-del"  onclick="confirmDeleteCustomer(${c.id})">🗑️</button>
                </td>
            </tr>`);
    });
};

// ------------------------ Open Add Modal --------------------------------------
$('#btn-new-cust').on('click', () => {
    clearCustomerModal();
    $('#cust-modal-title').text('Add Customer');
    $('#c-id').val('');
    $('#cust-modal').addClass('show');
});

// ------------------------ Open Edit Modal -------------------------------------
window.openEditCustomer = (id) => {
    const c = getCustomerById(id);
    if (!c) return;
    clearCustomerModal();
    $('#cust-modal-title').text('Edit Customer');
    $('#c-id').val(c.id);
    $('#c-name').val(c.name);
    $('#c-phone').val(c.phone);
    $('#c-email').val(c.email);
    $('#c-addr').val(c.address);
    $('#cust-modal').addClass('show');
};

// ------------------------ Save / Update Customer ------------------------------
$('#btn-save-cust').on('click', () => {
    const name  = $('#c-name').val().trim();
    const phone = $('#c-phone').val().trim();
    const email = $('#c-email').val().trim();
    const addr  = $('#c-addr').val().trim();
    let valid   = true;

    // Validate
    if (!check_name(name)) {
        $('#c-name-e').show(); valid = false;
    } else { $('#c-name-e').hide(); }

    if (!check_phone(phone)) {
        $('#c-phone-e').show(); valid = false;
    } else { $('#c-phone-e').hide(); }

    if (!check_email(email)) {
        $('#c-email-e').show(); valid = false;
    } else { $('#c-email-e').hide(); }

    if (!valid) return;

    const editId = $('#c-id').val();

    if (editId) {
        // Update
        const id = parseInt(editId);
        // Check phone duplicate (exclude self)
        const dup = getCustomerByPhone(phone);
        if (dup && dup.id !== id) {
            Swal.fire({ icon: 'error', title: 'Phone already registered!' });
            return;
        }
        updateCustomerData(id, name, phone, email, addr);
        Swal.fire({ icon: 'success', title: 'Customer updated!' });
    } else {
        // Add
        if (getCustomerByPhone(phone)) {
            Swal.fire({ icon: 'error', title: 'Phone already registered!' });
            return;
        }
        addCustomerData(name, phone, email, addr);
        Swal.fire({ icon: 'success', title: 'Customer added!' });
    }

    $('#cust-modal').removeClass('show');
    renderCustomerTable();
    loadCustomerDropdown();
});

// ------------------------ Delete Customer -------------------------------------
window.confirmDeleteCustomer = (id) => {
    const c = getCustomerById(id);
    if (!c) return;
    Swal.fire({
        title: `Delete "${c.name}"?`,
        text: 'This cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e53e3e',
        confirmButtonText: 'Delete'
    }).then(r => {
        if (r.isConfirmed) {
            deleteCustomerData(id);
            Swal.fire({ icon: 'success', title: 'Customer deleted!' });
            renderCustomerTable();
            loadCustomerDropdown();
        }
    });
};

// ------------------------ Cancel Modal ----------------------------------------
$('#btn-cancel-cust').on('click', () => $('#cust-modal').removeClass('show'));

// ------------------------ Search Input ----------------------------------------
$('#cust-search').on('input', renderCustomerTable);

// ------------------------ Helpers ---------------------------------------------
const clearCustomerModal = () => {
    ['#c-name', '#c-phone', '#c-email', '#c-addr'].forEach(id => $(id).val('').removeClass('invalid'));
    ['#c-name-e', '#c-phone-e', '#c-email-e'].forEach(id => $(id).hide());
};

export { renderCustomerTable };