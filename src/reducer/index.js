import { configureStore , combineReducers} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

import Login from './Login';
import CurrentUser from './CurrentUser';
import Category from './Category';
import Employee from './Employee';
import Medicine from './Medicine';
import Product from './Product';
import Order from './Order';
import Import from './Import';

const reducer = combineReducers({
    Login,
    CurrentUser,
    Category,
    Employee,
    Medicine,
    Product,
    Order,
    Import
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['Login' ,'Import', 'CurrentUser','Category' ,'Employee' ,'Medicine' ,'Product' ,'Order'] //
}
   
const persistedReducer = persistReducer(persistConfig, reducer)
let store = configureStore({reducer : persistedReducer})
let persistor = persistStore(store)
export default  {
   
    store, persistor 
}