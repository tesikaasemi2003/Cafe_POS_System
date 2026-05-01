import { customer_db } from 'db/db.js';
import * as db from 'db/db.js';

class Customer {
    #id;
    #name;
    #phone;
    #email;
    #address;
    #loyaltyPoints;
    #totalSpent;
    #joinDate;
}