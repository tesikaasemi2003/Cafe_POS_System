import {
    addCustomerData, updateCustomerData, deleteCustomerData,
    getCustomerData, getCustomerById, getCustomerByPhone
} from '../model/CustomerModel.js';
import { check_name, check_phone, check_email } from '../utils/regex_utils.js';
import { loadCustomerDropdown } from './SideOrderBarController.js';