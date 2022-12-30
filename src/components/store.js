import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import factureReducer from './redux/reducer/factureReducer';
import listeFacture from "./redux/reducer/listeFactureReducer";


const rootReducer = combineReducers({
    form: formReducer,
    factureReducer,
    client: factureReducer,
    facture: listeFacture
});

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;