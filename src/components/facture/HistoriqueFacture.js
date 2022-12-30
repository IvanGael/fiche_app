import React, { Component, Fragment } from 'react';
import { fetchFacture, fetchFactureSetPage } from '../redux/action/actions';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

 class HistoriqueFacture extends Component {


     UNSAFE_componentWillMount(){
        this.props.fetchFacture();
    }

    componentDidUpdate(prevProps){
        const currentPage = this.props.facture.currentPage;
        if(prevProps.facture.currentPage !== currentPage){
            this.props.fetchFacture(currentPage);
        }
    }

    render() {
        const myProps = this.props.facture;
        const { facture, loading, currentPage, pageCount, totalItemsCount} = myProps;
        console.log(totalItemsCount);
        console.log(currentPage);
        console.log(facture);
       
        return (
            <Fragment>
               <br />
                <h2 style={{ textAlign: 'center' }}> LISTE DES FACTURES</h2>
                <div className="container">
                    <table className="table table-hover">
                        <thead>
                            <tr className="table-active">
                                <th style={{ textAlign: "center" }} scope="col">Nom</th>
                                <th style={{ textAlign: "center" }} scope="col">Prenom</th>
                                <th style={{ textAlign: "center" }} scope="col">telephone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? (<tr>
                                    <td>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    </td>
                                </tr>) : (
                                    facture.map(fact=>(
                                        <tr key={fact.id}>
                                            <td>{fact.nom} </td>
                                            <td> {fact.prenom} </td>
                                            <td> {fact.telephone}</td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>

                    </table>
                </div>
                <div>
                    {
                        loading ? (" "):(
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={pageCount} 
                                totalItemsCount={totalItemsCount}
                                pageRangeDisplayed={5}
                                onChange={this.props.fetchFactureSetPage}
                                nextPageText="suivant"
                                prevPageText="précédent"
                                itemClass="page-item"
                                linkClass="page-link"
                                
                            />
                        )
                    }
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state =>({
    facture : state.facture,
});

const mapDispatchToProps = {
    fetchFacture,
    fetchFactureSetPage
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoriqueFacture);
