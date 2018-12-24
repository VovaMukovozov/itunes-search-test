import { userConstants } from '../_constants';


export function favourites(state = {}, action) {
    switch (action.type) {
        case userConstants.FAVOURITES_REQUEST:
            return {
                searching: true
            };
        case userConstants.FAVOURITES_SUCCESS:
            return {
                searched: true,
                items: action.favourites
            };
        case userConstants.FAVOURITES_FAILURE:
            return {};
        default:
            return state
    }
}