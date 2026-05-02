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
}