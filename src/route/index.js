import React , { lazy } from 'react';

const Dashboard = lazy(()=>import('../pages/Dashboard'));
const Logout = lazy(()=>import ('../pages/Logout'));
const Employee = lazy(()=>import('../pages/EmployeePage'));
const Medicine =  lazy(()=>import('../pages/MedicinePage'));
const Category =  lazy(()=>import('../pages/CategoryPage'));
const CategoryItem = lazy(()=>import('../pages/CategoryItemPage'));
export default [
    {
        path : '/',
        component : Dashboard,
        exact : true
        
    },
    {
        path : '/logout',
        component : Logout ,
        exact :  true,
    },
    {
        path : '/nhan-vien',
        component : Employee ,
        exact :  true,
    },
    {
        path : '/nha-thuoc',
        component : Medicine ,
        exact :  true,
    }
    , {
        path : '/quan-ly-danh-muc',
        component : Category ,
        exact :  true,
    }
    ,
    {
        path : '/danh-muc/:madm',
        component : CategoryItem ,
        exact :  true,
    }

]
