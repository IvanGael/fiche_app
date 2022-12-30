import {
    FETCH_LISTE_FACTURE_REQUEST,
    FETCH_LISTE_FACTURE_SUCCESS,
    FETCH_LISTE_FACTURE_SET_PAGE
} from '../constants';


const initialState ={
    loading: false,
    facture : [],
    currentPage: 1,
    pageCount : 10,
    totalItemsCount : 10,
}


const listeFacture = (state = initialState, action) =>{
    switch (action.type) {
        case FETCH_LISTE_FACTURE_REQUEST:
            return{
                ...state,
                loading: true,
                facture: [],
            };
        case FETCH_LISTE_FACTURE_SUCCESS:
            return{
                ...state,
                loading: false,
                facture: action.data["hydra:member"],
                totalItemsCount: action.data["hydra:totalItems"]
            };
        case FETCH_LISTE_FACTURE_SET_PAGE:
            return{
                ...state,
                currentPage: action.page
            };
        default: return state;
    }
}

export default listeFacture;