// ------------------------ Menu Items DB ------------------------------
let menu_db = [
    // HOT DRINKS
    { id: 1,  code: 'HOT001', name: 'Espresso',            category: 'Hot Drinks',  price: 350, stock: 50, icon: '☕', photo: 'assets/images/items/hot_drinks/expresso.jpg',                        active: true },
    { id: 2,  code: 'HOT002', name: 'Cappuccino',           category: 'Hot Drinks',  price: 450, stock: 50, icon: '☕', photo: 'assets/images/items/hot_drinks/cappuccino.jpg',                       active: true },
    { id: 3,  code: 'HOT003', name: 'Hot Latte',            category: 'Hot Drinks',  price: 480, stock: 50, icon: '☕', photo: 'assets/images/items/hot_drinks/Hot_Latte.jpg',                        active: true },
    { id: 4,  code: 'HOT004', name: 'Hot Americano',        category: 'Hot Drinks',  price: 400, stock: 45, icon: '☕', photo: 'assets/images/items/hot_drinks/Hot_americano.jpg',                    active: true },
    { id: 5,  code: 'HOT005', name: 'Flat White',           category: 'Hot Drinks',  price: 460, stock: 40, icon: '☕', photo: 'assets/images/items/hot_drinks/flat_white.jpg',                      active: true },
    { id: 6,  code: 'HOT006', name: 'Chai Latte',           category: 'Hot Drinks',  price: 420, stock: 35, icon: '🍵', photo: 'assets/images/items/hot_drinks/chai_Latte.jpg',                      active: true },
    { id: 7,  code: 'HOT007', name: 'Mint Tea',             category: 'Hot Drinks',  price: 320, stock: 40, icon: '🍵', photo: 'assets/images/items/hot_drinks/mint_tea.jpg',                        active: true },
    { id: 8,  code: 'HOT008', name: 'Hot Chocolate',        category: 'Hot Drinks',  price: 490, stock: 30, icon: '🍫', photo: 'assets/images/items/hot_drinks/hot-chocolate-with-marshmallows.jpg', active: true },
    // COLD DRINKS
    { id: 9,  code: 'CLD001', name: 'Iced Latte',           category: 'Cold Drinks', price: 550, stock: 40, icon: '🧊', photo: 'assets/images/items/cold_drinks/iced-coffee-latte.jpg',              active: true },
    { id: 10, code: 'CLD002', name: 'Cold Brew',            category: 'Cold Drinks', price: 580, stock: 40, icon: '🥤', photo: 'assets/images/items/cold_drinks/cold_brew.jpg',                      active: true },
    { id: 11, code: 'CLD003', name: 'Iced Americano',       category: 'Cold Drinks', price: 480, stock: 35, icon: '🧊', photo: 'assets/images/items/cold_drinks/iced_americano.jpg',                 active: true },
    { id: 12, code: 'CLD004', name: 'Iced Coffee',          category: 'Cold Drinks', price: 460, stock: 35, icon: '🧊', photo: 'assets/images/items/cold_drinks/iced_coffee.jpg',                    active: true },
    { id: 13, code: 'CLD005', name: 'Cold Matcha Latte',    category: 'Cold Drinks', price: 620, stock: 30, icon: '🍵', photo: 'assets/images/items/cold_drinks/cold_matcha_Latte.jpg',              active: true },
    { id: 14, code: 'CLD006', name: 'Caramel Latte',        category: 'Cold Drinks', price: 600, stock: 30, icon: '🍮', photo: 'assets/images/items/cold_drinks/caramel-latte.jpg',                  active: true },
    { id: 15, code: 'CLD007', name: 'Iced Tea',             category: 'Cold Drinks', price: 380, stock: 40, icon: '🧋', photo: 'assets/images/items/cold_drinks/iced_tea.jpg',                       active: true },
    { id: 16, code: 'CLD008', name: 'Cool Lemonade',        category: 'Cold Drinks', price: 350, stock: 45, icon: '🍋', photo: 'assets/images/items/cold_drinks/cool_lemonade.jpg',                  active: true },
    { id: 17, code: 'CLD009', name: 'Cold Mojito',          category: 'Cold Drinks', price: 520, stock: 25, icon: '🌿', photo: 'assets/images/items/cold_drinks/cold_mojito.jpg',                    active: true },
    { id: 18, code: 'CLD010', name: 'Chocolate Shake',      category: 'Cold Drinks', price: 590, stock: 25, icon: '🍫', photo: 'assets/images/items/cold_drinks/chocolate_shake.jpg',                active: true },
    { id: 19, code: 'CLD011', name: 'Mango Smoothie',       category: 'Cold Drinks', price: 560, stock: 20, icon: '🥭', photo: 'assets/images/items/cold_drinks/mango_smoothy.jpg',                  active: true },
    { id: 20, code: 'CLD012', name: 'Strawberry Smoothie',  category: 'Cold Drinks', price: 560, stock: 20, icon: '🍓', photo: 'assets/images/items/cold_drinks/strawberry_smoothy.jpg',             active: true },
    // BAKERY
    { id: 21, code: 'BAK001', name: 'Butter Croissant',     category: 'Bakery',      price: 280, stock: 30, icon: '🥐', photo: 'assets/images/items/bakery_&_pastries/butter_croissant.jpg',         active: true },
    { id: 22, code: 'BAK002', name: 'Chocolate Croissant',  category: 'Bakery',      price: 320, stock: 25, icon: '🥐', photo: 'assets/images/items/bakery_&_pastries/chocolate_croissant.jpg',      active: true },
    { id: 23, code: 'BAK003', name: 'Blueberry Muffin',     category: 'Bakery',      price: 260, stock: 28, icon: '🧁', photo: 'assets/images/items/bakery_&_pastries/blueberry_muffin.jpg',         active: true },
    { id: 24, code: 'BAK004', name: 'Chocolate Muffin',     category: 'Bakery',      price: 260, stock: 28, icon: '🧁', photo: 'assets/images/items/bakery_&_pastries/chocolate_muffin.jpg',         active: true },
    { id: 25, code: 'BAK005', name: 'Cinnamon Roll',        category: 'Bakery',      price: 340, stock: 20, icon: '🌀', photo: 'assets/images/items/bakery_&_pastries/cinnamon_roll.jpg',             active: true },
    { id: 26, code: 'BAK006', name: 'Chocolate Brownie',    category: 'Bakery',      price: 290, stock: 22, icon: '🍫', photo: 'assets/images/items/bakery_&_pastries/chocolate_brownie.jpg',        active: true },
    { id: 27, code: 'BAK007', name: 'Banana Bread',         category: 'Bakery',      price: 300, stock: 18, icon: '🍌', photo: 'assets/images/items/bakery_&_pastries/banana_bread.jpg',             active: true },
    { id: 28, code: 'BAK008', name: 'Almond Danish',        category: 'Bakery',      price: 350, stock: 15, icon: '🌸', photo: 'assets/images/items/bakery_&_pastries/almond_danish.jpg',            active: true },
    { id: 29, code: 'BAK009', name: 'Doughnut',             category: 'Bakery',      price: 220, stock: 30, icon: '🍩', photo: 'assets/images/items/bakery_&_pastries/doughnut.jpg',                 active: true },
    // SANDWICHES
    { id: 30, code: 'SND001', name: 'Club Sandwich',        category: 'Sandwiches',  price: 650, stock: 20, icon: '🥪', photo: 'assets/images/items/sandwiches_&_wraps/club_sandwich.jpg',           active: true },
    { id: 31, code: 'SND002', name: 'BLT Sandwich',         category: 'Sandwiches',  price: 580, stock: 18, icon: '🥪', photo: 'assets/images/items/sandwiches_&_wraps/BLT_sandwich.jpg',            active: true },
    { id: 32, code: 'SND003', name: 'Bacon Sandwich',       category: 'Sandwiches',  price: 620, stock: 15, icon: '🥓', photo: 'assets/images/items/sandwiches_&_wraps/baken_sandwich.jpg',          active: true },
    { id: 33, code: 'SND004', name: 'Cheese Loaded',        category: 'Sandwiches',  price: 600, stock: 15, icon: '🧀', photo: 'assets/images/items/sandwiches_&_wraps/cheese_loaded_sandwich.jpg',  active: true },
    { id: 34, code: 'SND005', name: 'Croissant Sandwich',   category: 'Sandwiches',  price: 680, stock: 12, icon: '🥐', photo: 'assets/images/items/sandwiches_&_wraps/croissant_sandwich.jpg',      active: true },
    { id: 35, code: 'SND006', name: 'Chicken Caesar Wrap',  category: 'Sandwiches',  price: 720, stock: 12, icon: '🌯', photo: 'assets/images/items/sandwiches_&_wraps/chicken_carser_wrap.jpg',     active: true },
    { id: 36, code: 'SND007', name: 'Veggie Wrap',          category: 'Sandwiches',  price: 580, stock: 14, icon: '🥗', photo: 'assets/images/items/sandwiches_&_wraps/veggie_wrap.jpg',             active: true },
    { id: 37, code: 'SND008', name: 'Tuna Melt Sandwich',   category: 'Sandwiches',  price: 660, stock: 10, icon: '🐟', photo: 'assets/images/items/sandwiches_&_wraps/tuna_melted_sandwich.jpg',    active: true },
    // LIGHT MEALS
    { id: 38, code: 'MLT001', name: 'Avocado Toast',        category: 'Light Meals', price: 780, stock: 15, icon: '🥑', photo: 'assets/images/items/light_meals/avacado_toast.jpg',                  active: true },
    { id: 39, code: 'MLT002', name: 'Eggs Benedict',        category: 'Light Meals', price: 850, stock: 12, icon: '🍳', photo: 'assets/images/items/light_meals/egg_benedict.jpg',                   active: true },
    { id: 40, code: 'MLT003', name: 'Pancake Stack',        category: 'Light Meals', price: 720, stock: 14, icon: '🥞', photo: 'assets/images/items/light_meals/pancake_stack.jpg',                  active: true },
    { id: 41, code: 'MLT004', name: 'Caesar Salad',         category: 'Light Meals', price: 680, stock: 18, icon: '🥗', photo: 'assets/images/items/light_meals/caesar_salad.jpg',                   active: true },
    { id: 42, code: 'MLT005', name: 'Quiche of the Day',    category: 'Light Meals', price: 750, stock: 10, icon: '🥧', photo: 'assets/images/items/light_meals/Quiche_of_the_day.jpg',              active: true },
    { id: 43, code: 'MLT006', name: 'Soup of the Day',      category: 'Light Meals', price: 560, stock: 15, icon: '🍲', photo: 'assets/images/items/light_meals/soup_of_the_day.jpg',                active: true },
    // DESSERTS
    { id: 44, code: 'DST001', name: 'Chocolate Cake',       category: 'Desserts',    price: 420, stock: 20, icon: '🍰', photo: 'assets/images/items/desserts/chocolate_cake.jpg',                    active: true },
    { id: 45, code: 'DST002', name: 'Tiramisu',             category: 'Desserts',    price: 520, stock: 15, icon: '🍮', photo: 'assets/images/items/desserts/tiramisu.jpg',                          active: true },
    { id: 46, code: 'DST003', name: 'Blueberry Cheesecake', category: 'Desserts',    price: 580, stock: 12, icon: '🍰', photo: 'assets/images/items/desserts/blueberry_cheesecake.jpg',              active: true },
    { id: 47, code: 'DST004', name: 'Caramel Cheesecake',   category: 'Desserts',    price: 580, stock: 12, icon: '🍰', photo: 'assets/images/items/desserts/caramal_cheesecake.jpg',                active: true },
    { id: 48, code: 'DST005', name: 'Biscoff Cheesecake',   category: 'Desserts',    price: 600, stock: 10, icon: '🍰', photo: 'assets/images/items/desserts/biscof_cheesecake.jpg',                 active: true },
    { id: 49, code: 'DST006', name: 'Chocolate Lava Cake',  category: 'Desserts',    price: 490, stock: 14, icon: '🌋', photo: 'assets/images/items/desserts/chocolate_lavacake.jpg',               active: true },
    { id: 50, code: 'DST007', name: 'Waffles with Cream',   category: 'Desserts',    price: 460, stock: 16, icon: '🧇', photo: 'assets/images/items/desserts/waffles_with_cream.jpg',               active: true },
    { id: 51, code: 'DST008', name: 'Fruit Tart',           category: 'Desserts',    price: 440, stock: 14, icon: '🍓', photo: 'assets/images/items/desserts/fruit_tart.jpg',                       active: true },
    { id: 52, code: 'DST009', name: 'Ice Cream',            category: 'Desserts',    price: 380, stock: 25, icon: '🍦', photo: 'assets/images/items/desserts/ice_cream.jpg',                        active: true },
];

// ------------------------ Customers DB ------------------------------
let customer_db = [
    { id: 1, name: 'Walk-in Customer', phone: '0000000000', email: '', address: '', loyaltyPoints: 0, totalSpent: 0, joinDate: new Date().toISOString() },
    { id: 2, name: 'Nimal Perera',     phone: '0771234567', email: 'nimal@email.com',  address: 'Colombo 03', loyaltyPoints: 120, totalSpent: 12000, joinDate: '2024-01-15T00:00:00.000Z' },
    { id: 3, name: 'Kumari Silva',     phone: '0769876543', email: 'kumari@email.com', address: 'Galle',      loyaltyPoints: 80,  totalSpent: 8000,  joinDate: '2024-03-10T00:00:00.000Z' },
];

// ------------------------ Orders DB ------------------------------
let order_db = [];

// ------------------------ ID Counters (use object so cross-module mutation works) ------------------------------
const counters = {
    menu_id:     menu_db.length + 1,
    customer_id: customer_db.length + 1,
    order_id:    1,
};

// Legacy named exports (kept for compatibility — use counters object for mutations)
let menu_id_counter     = counters.menu_id;
let customer_id_counter = counters.customer_id;
let order_id_counter    = counters.order_id;

export { menu_db, customer_db, order_db, counters, menu_id_counter, customer_id_counter, order_id_counter };