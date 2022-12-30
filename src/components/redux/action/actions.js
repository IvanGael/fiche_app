import {
    FACTURE_ADD,
    FACTURE_FINAL_ADD,
    PRODUIT_ADD,
    FETCH_LISTE_FACTURE_REQUEST,
    FETCH_LISTE_FACTURE_SUCCESS,
    FETCH_LISTE_FACTURE_SET_PAGE
} from '../constants';
import { request } from '../request';



/********************************FACTURE HISTORIQUE**************************************/

export const fetchFactureSuccess = (data) =>{
    return{
        type: FETCH_LISTE_FACTURE_SUCCESS,
        data
    }
}


export const fetchFacturerequest = ()=>{
    return{
        type: FETCH_LISTE_FACTURE_REQUEST
    }
}


export const fetchFactureSetPage = (page)=>{
    return{
        type: FETCH_LISTE_FACTURE_SET_PAGE,
        page
    }
}


export const fetchFacture = (page = 1) =>{
    return (dispatch) => {
        dispatch(fetchFacturerequest())
        return request.get(`/factures?page=${page}&itemsPerPage=10`)
            .then(response => dispatch(fetchFactureSuccess(response)))
    }
}



/*******************************ADD FACTURE*************************************/

export const factureAdded = (client) =>({
    type: FACTURE_ADD,
    client
});


export const factureAdd = (data) =>{
    return (dispatch) =>{
        return request.post(
            '/factures', data
        ).then(response => dispatch(factureAdded(response)))
    }
};



export const factureFinalAdded = (produit) => ({
    type: FACTURE_FINAL_ADD,
    produit
});


export const listeProduitAdd = (data) =>{
    return{
        type: PRODUIT_ADD,
        data
    }
}

/**LISTE PRODUIT BY FACTURE ID */
export const listeProduitFacture = (factureId) =>{
    return (dispatch) =>{
        return request.get(`/produits?facture.id=${factureId}`)
            .then(response => dispatch(listeProduitAdd(response)))
    }
}

export const factureFinalAdd = (data, factureId) =>{
    return (dispatch) =>{
        return request.post(
            '/produits',
            {
               designation: data.designation,
                quantite: parseInt(data.quantite),
                prixUnitaire: parseInt(data.prix_unitaire),
               facture : `/api/factures/${factureId}`
            } 
        ).then(response => dispatch(listeProduitFacture(factureId)))
    }
};



