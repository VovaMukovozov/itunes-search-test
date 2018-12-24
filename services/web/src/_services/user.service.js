/* eslint-disable import/first */

import { authHeader } from '../_helpers';

const login = (username, password) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };

    return fetch(`http://localhost:3001/login?username=${username}&password=${password}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
};

const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
};

const register = (user) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:3001/register`, requestOptions).then(handleResponse);
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:3001/user`, requestOptions).then(handleResponse);
}

const _delete = (id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://localhost:3001/user/${id}`, requestOptions).then(handleResponse);
};


const favourites = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:3001/user/favourite`, requestOptions).then(handleResponse);
};

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
};


export const userService = {
    favourites,
    delete: _delete,
    getAll,
    login,
    logout,
    register
};