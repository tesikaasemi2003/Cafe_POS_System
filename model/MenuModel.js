// ========================= T&T Cafe POS - Menu Item Model =========================
import { menu_db, counters } from '../db/db.js';

// --------------------------- Add Menu Item ---------------------------
const addMenuItemData = (code, name, category, price, stock, icon, photo) => {
    const newItem = {
        id:       counters.menu_id++,
        code, name, category, price, stock,
        icon:     icon || '☕',
        photo:    photo || null,
        active:   true,
    };
    menu_db.push(newItem);
    return newItem;
};

// --------------------------- Update Menu Item ---------------------------
const updateMenuItemData = (id, code, name, category, price, stock, icon, photo) => {
    const obj = menu_db.find(item => item.id === id);
    if (obj) {
        obj.code     = code;
        obj.name     = name;
        obj.category = category;
        obj.price    = price;
        obj.stock    = stock;
        obj.icon     = icon;
        if (photo !== undefined) obj.photo = photo;
    }
    return obj;
};

// --------------------------- Delete Menu Item ---------------------------
const deleteMenuItemData = (id) => {
    const index = menu_db.findIndex(item => item.id === id);
    if (index !== -1) menu_db.splice(index, 1);
};

// --------------------------- Get All Menu Items ---------------------------
const getMenuItemData = () => menu_db;

// --------------------------- Get Menu Item by ID ---------------------------
const getMenuItemById = (id) => menu_db.find(item => item.id === id);

// --------------------------- Get Menu Item by Code ---------------------------
const getMenuItemByCode = (code) => menu_db.find(item => item.code === code);

// --------------------------- Get Items by Category ---------------------------
const getMenuItemsByCategory = (category) => {
    if (category === 'All') return menu_db;
    return menu_db.filter(item => item.category === category);
};

// --------------------------- Reduce Stock on Order ---------------------------
const reduceStock = (id, qty) => {
    const obj = menu_db.find(item => item.id === id);
    if (obj && obj.stock >= qty) {
        obj.stock -= qty;
        return true;
    }
    return false;
};

export {
    addMenuItemData, updateMenuItemData, deleteMenuItemData,
    getMenuItemData, getMenuItemById, getMenuItemByCode,
    getMenuItemsByCategory, reduceStock
};