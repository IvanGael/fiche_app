import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../auth/auth'; 
import axios from 'axios';
import Pagination from 'react-js-pagination';
import {Spinner} from 'react-bootstrap';

export default class Acceuil extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: true,
            fiches: [],
            activePage : 1,
            totalItemsCount : 10,
            itemsCountPerPage: 10,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentWillMount() {
       const url = AuthService.getFiche()+"?page=1&itemsPerPage=" + this.state.itemsCountPerPage;
       axios.get(url, AuthService.getAuthHeader())
        .then(response =>{ 
            if(response.status ===200 ){
                const dataF = response["data"]["hydra:member"];
                this.setState({ fiches: dataF, 
                    loading: false, 
                    totalItemsCount: response["data"]["hydra:totalItems"]}); 
            }
        })
        .catch(error =>{
           if(error.response.status === 401){
               AuthService.tokenExpire();
               this.props.isAuth(false);
           }
        });
    }

 
     handlePageChange(pageNumber){
       const url = AuthService.getFiche() +"?page=" + pageNumber +"&itemsPerPage="+this.state.itemsCountPerPage;
       axios.get(url, AuthService.getAuthHeader())
        .then(response =>{
            if (response.status === 200){
                const dataF = response["data"]["hydra:member"];
                 this.setState({ 
                     activePage: pageNumber,
                     fiches : dataF,
                     loading: false,
                     totalItemsCount: response["data"]["hydra:totalItems"],
                 });
            }
        })
        .catch(error =>{
            if (error.response.status === 401) {
                AuthService.tokenExpire();
                this.props.isAuth(false);
            }
        }); 
    }
    
    render(){
        console.log(this.state.fiches);
        
        return(
            <Fragment>
                <br />
                <h2 style={{textAlign:'center' }}><strong><u>LISTES DES DECHARGES DE RECEPTION DE FONDS </u></strong></h2><br/><br/>
                <div className="container"> 
                    <table className="table table-hover">
                        <thead>
                            <tr className="table-active" >
                                <th style={{ textAlign: "center" }} scope="col">Signataire</th>
                                <th style={{ textAlign: "center" }} scope="col">adresse</th>
                                <th style={{ textAlign: "center" }} scope="col">Créantier</th>
                                <th style={{ textAlign: "center" }} scope="col">Montant</th>
                                <th style={{textAlign:"center"}} scope="col">Motif</th>
                                <th style={{ textAlign: "center" }} scope="col">Lieu</th>
                                <th style={{ textAlign: "center" }} scope="col">fiche</th>
                            </tr>
                        </thead>
                        <tbody>{
                            this.state.loading ? (<tr>
                            <td>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            </td>
                            </tr>) : (
                            this.state.fiches.map(fiche => (
                                <tr key={fiche.id} >
                                    <td>{fiche.signataire} </td>
                                    <td>{fiche.adresse} </td>
                                    <td>{fiche.creantier} </td>
                                    <td>{fiche.montant} </td>
                                    <td>{fiche.motif} </td>
                                    <td>{fiche.lieu} </td>
                                    <td>
                                        <button className="btn btn-primary btn-sm">
                                            <Link to={{
                                                pathname: `/fiche/${fiche.id}`,
                                                state: { fiche: fiche, referer: "/"}
                                              }}
                                                style={{ color: "white", textDecoration: "none" }}> afficher 
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                            )))
                            }

                        </tbody>
                    </table >
                </div>
              <div className="container">
                {
                  this.state.loading ?('') : (
                        <Pagination 
                           activePage ={this.state.activePage}
                           itemsCountPerPage={this.state.itemsCountPerPage}
                           totalItemsCount={this.state.totalItemsCount}
                           pageRangeDisplayed={5}
                           onChange={this.handlePageChange}
                           nextPageText="suivant"
                           prevPageText="précédent"
                           itemClass="page-item"
                           linkClass="page-link"
                        />
                    )
                }
              </div>
             
            </Fragment>
        );
    }
}
