import { searchConstants } from '../_constants';
import { searchService } from '../_services';


const search = (query) => {
    return dispatch => {
        dispatch(request());
        searchService.search(query)
            .then(
                result => dispatch(success(result)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: searchConstants.SEARCH_REQUEST } }
    function success(data) { return { type: searchConstants.SEARCH_SUCCESS, results: data.results } }
    function failure(error) { return { type: searchConstants.SEARCH_FAILURE, error } }
};

export const searchActions = {
    search
};