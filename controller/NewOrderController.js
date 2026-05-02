import { getMenuItemData, getMenuItemsByCategory, reduceStock } from '../model/MenuModel.js';
import { getCustomerById, updateLoyaltyAfterOrder } from '../model/CustomerModel.js';
import { placeOrderData } from '../model/OrderModel.js';
import { addOrderItem, clearOrder, getOrderItems, getOrderTotal, renderOrderPanel, loadCustomerDropdown } from './SideOrderBarController.js';

const CATEGORIES = ['All', 'Hot Drinks', 'Cold Drinks', 'Bakery', 'Sandwiches', 'Light Meals', 'Desserts'];
const CAT_META = {
    'All':          { cls: 'all',     label: 'All Items',    emoji: '🍵' },
    'Hot Drinks':   { cls: 'hot',     label: 'Hot Drinks',   emoji: '☕' },
    'Cold Drinks':  { cls: 'cold',    label: 'Cold Drinks',  emoji: '🥤' },
    'Bakery':       { cls: 'bakery',  label: 'Bakery',       emoji: '🥐' },
    'Sandwiches':   { cls: 'sand',    label: 'Sandwiches',   emoji: '🥪' },
    'Light Meals':  { cls: 'meals',   label: 'Light Meals',  emoji: '🍛' },
    'Desserts':     { cls: 'dessert', label: 'Desserts',     emoji: '🍰' },
};