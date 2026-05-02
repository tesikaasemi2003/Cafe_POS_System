import { menu_db, menu_id_counter } from 'db/db.js';
import * as db from 'db/db.js';

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
        this.#id = id;
        this.#code = code;
        this.#name = name;
        this.#category = category;
        this.#price = price;
        this.#stock = stock;
        this.#icon = icon;
        this.#photo = photo;
        this.#active = active;
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
