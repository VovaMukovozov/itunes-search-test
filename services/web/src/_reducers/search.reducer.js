import { searchConstants } from '../_constants';


export function search(state = {}, action) {
    switch (action.type) {
        case searchConstants.SEARCH_REQUEST:
            return {
                searching: true
            };
        case searchConstants.SEARCH_SUCCESS:
            return {
                searched: true,
                tracks: action.results
            };
        case searchConstants.SEARCH_FAILURE:
            return {};
        default:
            return state
    }
}