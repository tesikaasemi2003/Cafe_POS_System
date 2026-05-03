// ========================= T&T Cafe POS - Menu Item Model =========================
import { menu_db, menu_id_counter } from '../db/db.js';
import * as db from '../db/db.js';

class MenuItem {
    #id;
    #code;
    #name;
    #category;
    #price;
    #stock;
    #icon;
    #photo;
    #active;

    constructor(id, code, name, category, price, stock, icon = '☕', photo = null, active = true) {
        this.#id       = id;
        this.#code     = code;
        this.#name     = name;
        this.#category = category;
        this.#price    = price;
        this.#stock    = stock;
        this.#icon     = icon;
        this.#photo    = photo;
        this.#active   = active;
    }

    get id()       { return this.#id; }
    get code()     { return this.#code; }
    get name()     { return this.#name; }
    get category() { return this.#category; }
    get price()    { return this.#price; }
    get stock()    { return this.#stock; }
    get icon()     { return this.#icon; }
    get photo()    { return this.#photo; }
    get active()   { return this.#active; }

    set code(code)         { this.#code = code; }
    set name(name)         { this.#name = name; }
    set category(category) { this.#category = category; }
    set price(price)       { this.#price = price; }
    set stock(stock)       { this.#stock = stock; }
    set icon(icon)         { this.#icon = icon; }
    set photo(photo)       { this.#photo = photo; }
    set active(active)     { this.#active = active; }
}

// --------------------------- Add Menu Item ---------------------------
const addMenuItemData = (code, name, category, price, stock, icon, photo) => {
    const new_item = new MenuItem(db.menu_id_counter++, code, name, category, price, stock, icon, photo);
    menu_db.push(new_item);
    return new_item;
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
