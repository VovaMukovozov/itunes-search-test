/* eslint-disable import/first */

import { authHeader } from '../_helpers';

function search(query) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:3002/search?q=${query}`, requestOptions).then((response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    });
}

export const searchService = {
    search
};