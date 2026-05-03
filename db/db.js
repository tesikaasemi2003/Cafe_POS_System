// ------------------------ Menu Items DB ------------------------------
let menu_db = [
    { id: 1, code: 'HOT001', name: 'Espresso',       category: 'Hot Drinks',  price: 350,  stock: 50, icon: '☕', photo: null, active: true },
    { id: 2, code: 'HOT002', name: 'Cappuccino',      category: 'Hot Drinks',  price: 450,  stock: 50, icon: '☕', photo: null, active: true },
    { id: 3, code: 'HOT003', name: 'Latte',           category: 'Hot Drinks',  price: 480,  stock: 50, icon: '☕', photo: null, active: true },
    { id: 4, code: 'CLD001', name: 'Iced Latte',      category: 'Cold Drinks', price: 550,  stock: 40, icon: '🧊', photo: null, active: true },
    { id: 5, code: 'CLD002', name: 'Cold Brew',       category: 'Cold Drinks', price: 580,  stock: 40, icon: '🥤', photo: null, active: true },
    { id: 6, code: 'BAK001', name: 'Croissant',       category: 'Bakery',      price: 280,  stock: 30, icon: '🥐', photo: null, active: true },
    { id: 7, code: 'BAK002', name: 'Butter Cake',     category: 'Bakery',      price: 200,  stock: 25, icon: '🎂', photo: null, active: true },
    { id: 8, code: 'SND001', name: 'Club Sandwich',   category: 'Sandwiches',  price: 650,  stock: 20, icon: '🥪', photo: null, active: true },
    { id: 9, code: 'MLT001', name: 'Rice & Curry',    category: 'Light Meals', price: 850,  stock: 15, icon: '🍛', photo: null, active: true },
    { id: 10,code: 'DST001', name: 'Chocolate Cake',  category: 'Desserts',    price: 420,  stock: 20, icon: '🍰', photo: null, active: true },
];

// ------------------------ Customers DB ------------------------------
let customer_db = [
    { id: 1, name: 'Walk-in Customer', phone: '0000000000', email: '', address: '', loyaltyPoints: 0, totalSpent: 0, joinDate: new Date().toISOString() },
    { id: 2, name: 'Nimal Perera',     phone: '0771234567', email: 'nimal@email.com', address: 'Colombo 03', loyaltyPoints: 120, totalSpent: 12000, joinDate: '2024-01-15T00:00:00.000Z' },
    { id: 3, name: 'Kumari Silva',     phone: '0769876543', email: 'kumari@email.com', address: 'Galle', loyaltyPoints: 80,  totalSpent: 8000,  joinDate: '2024-03-10T00:00:00.000Z' },
];

// ------------------------ Orders DB ------------------------------
let order_db = [];

// ------------------------ ID Counters ------------------------------
let menu_id_counter    = menu_db.length + 1;
let customer_id_counter = customer_db.length + 1;
let order_id_counter   = 1;

export { menu_db, customer_db, order_db, menu_id_counter, customer_id_counter, order_id_counter };
