import { combineReducers } from 'redux';

import { search } from './search.reducer';
import { favourites } from './favourites.reducer';
import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { users } from './users.reducer';

const rootReducer = combineReducers({
    favourites,
    search,
    users,
    authentication,
    registration,
    alert
});

export default rootReducer;