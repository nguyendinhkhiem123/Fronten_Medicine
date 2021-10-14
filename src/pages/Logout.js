import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router';

import { removeLogin } from 'reducer/Login'
import { removeCurrentUser } from 'reducer/CurrentUser';
import { removeEmployee } from 'reducer/Employee';
import { removeListCategory } from 'reducer/Category';
import { removeMedicine } from 'reducer/Medicine';

export default function Logout() {

    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        dispatch(removeLogin());
        dispatch(removeCurrentUser());
        dispatch(removeEmployee());
        dispatch(removeListCategory());
        dispatch(removeMedicine())
        localStorage.removeItem('account');
        history.push('/');
        
    },[])
    return (
        <></>
    )
}
