import React from 'react';
import FiltreForm from './filtreForm';
import {Link} from 'react-router-dom';
import Pagination from 'react-js-pagination';
import AuthService from '../../auth/auth'; 
import axios from 'axios';

export default class Filtre extends React.Component {
    constructor() {
        const localTotalpage = JSON.parse(localStorage.getItem("totalpage"));
        super();
        this.state = {
            loading: true,
            fiches:[],
            activePage: 1,
            totalItemsCount: localTotalpage,
            itemsCountPerPage: 10,
            date1: '',
            date2: '',
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount(){
        const localfiche = JSON.parse(localStorage.getItem("fiches"));
        if(localfiche !== null){     
            this.setState({
                fiches:localfiche ,
                date1: JSON.parse(localStorage.getItem("date1")),
                date2: JSON.parse(localStorage.getItem("date2")),
            });
        }
        if(this.state.fiches !== null){
            this.setState({ loading:false})
        }

        console.log(); 
    }

    handleSubmit = async(e)=>{
        const date1 = e.target.elements.date1.value;
        const date2= e.target.elements.date2.value;
        e.preventDefault();
        console.log(date1, date2);  
        const url = `${AuthService.getFiche()}?date[after]=${date1}&date[before]=${date2}&page=1&itemsPerPage=${this.state.itemsCountPerPage}`;
        axios.get(url, AuthService.getAuthHeader())
        .then(response =>{
            const dataF = response["data"]["hydra:member"];
            this.setState({ fiches: dataF, date1: date1, date2: date2, loading: false, totalItemsCount: response["data"]["hydra:totalItems"],});
            localStorage.setItem("fiches", JSON.stringify(dataF));
            localStorage.setItem("date1", JSON.stringify(date1));
            localStorage.setItem("date2", JSON.stringify(date2));
            localStorage.setItem("totalpage", JSON.stringify(this.state.totalItemsCount));
        })
        .catch(error => {
            if (error.response.status === 401) {
                AuthService.tokenExpire();
                this.props.isAuth(false);
            }
        });
    }
    
    async handlePageChange(pageNumber) {
       console.log(`active page is ${pageNumber}`);
       const date1 = this.state.date1;
       const date2 = this.state.date2;
       if(date1 !== '' && date2 !== ''){
           const url = `${AuthService.getFiche()}?date[after]=${date1}&date[before]=${date2}&page=${pageNumber}&itemsPerPage=${this.state.itemsCountPerPage}`;
          axios.get(url, AuthService.getAuthHeader())
          .then(response =>{
              const dataF = response["data"]["hydra:member"];
              this.setState({
                  activePage: pageNumber,
                  fiches: dataF,
                  loading: false,
                  totalItemsCount: response["data"]["hydra:totalItems"],
              });
          }).catch(error => {
               if (error.response.status === 401) {
                   AuthService.tokenExpire();
                   this.props.isAuth(false);
               }
           });
       }
        console.log(this.state.totalItemsCount);
    }

    render() {
        return (
            <React.Fragment>
                <br />
                <h2 style={{ textAlign:"center"}}><strong><u>LISTES DES DECHARGES DE RECEPTION DE FONDS </u></strong></h2><br />
                <div className="container">
                    <FiltreForm handleSubmit={this.handleSubmit} date1={this.state.date1} date2={this.state.date2} /> 
                </div><br />
                <div className="container">
                    <table className="table table-hover">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col">Signataire</th>
                                <th scope="col">adresse</th>
                                <th scope="col">Créantier</th>
                                <th scope="col">Montant</th>
                                <th scope="col">Motif</th>
                                <th scope="col">Lieu</th>
                                <th scope="col">afficher une fiche </th>
                            </tr>
                        </thead>
                        <tbody>{this.state.loading ? (<tr><td>en attente du filtre...</td></tr>) : (
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
                                                state: { fiche: fiche, referer:"/filtre" }
                                            }}
                                                style={{ color: "white", textDecoration: "none" }}> afficher </Link>
                                        </button>
                                    </td>
                                </tr>
                            )))}</tbody>
                    </table >
                </div>
                <div className="container">
                    {
                        this.state.loading ? ('') : (
                            <Pagination
                                activePage={this.state.activePage}
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
            </React.Fragment>
        );
    }
}