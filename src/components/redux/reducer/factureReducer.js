import { FACTURE_ADD, PRODUIT_ADD } from '../constants';


const initialState ={
    loading: false,
    client: [],
    produit: [],
}

const factureReducer = (state = initialState, action)=>{
    switch (action.type) {
        case FACTURE_ADD:
            return{
                ...state,
                client : action.client,
                produit: []
            }
        case PRODUIT_ADD:
            return{
                ...state,
                produit: action.data["hydra:member"]
            }
        default:return state;
    }
}

export default factureReducer;