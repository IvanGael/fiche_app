import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../redux/ReduxForm';
import { Button } from 'react-bootstrap';
import '../../index.css';
import { connect } from 'react-redux';
import { factureFinalAdd } from '../redux/action/actions';
import { Redirect } from 'react-router-dom';


class FacutreFinalForm extends Component {


    onSubmit(values) {
        const { factureFinalAdd } = this.props;
        const clientId = this.props.client.client.id;
        console.log(clientId);
        return (
            factureFinalAdd(values, clientId),
            document.getElementById("formFacture").reset(),
            console.log(this.props.client.produit)
        );
    }


    render() {
        const client = this.props.client.client;
        const produit = this.props.client.produit;
        const { handleSubmit } = this.props;

        console.log(produit);
        
        if (client === null || client.length === 0) {
            return <Redirect to={{ pathname: "/nouvelle-facture", state: { referer: "/" } }} />
        }
        return (
            <div className="container" style={{ maxWidth: "800px", margin: "auto" }}  >
                <div style={{ textAlign: "center", fontWeight: "bold" }}  >
                    <h3>Nom :{client.nom}   {client.prenom} </h3>
                    <h3>telephone :  {client.telephone}</h3>
                </div>
                {
                    (produit.length !== 0 && produit !== null)&&(
                        <div className="container">
                            <table className="table table-hover">
                                <thead>
                                    <tr className="table-active">
                                        <th style={{ textAlign: "center" }} scope="col">Designation</th>
                                        <th style={{ textAlign: "center" }} scope="col">quantite</th>
                                        <th style={{ textAlign: "center" }} scope="col">prix Unitaire</th>
                                        <th style={{ textAlign: "center" }} scope="col"> ToTal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        produit.map(prod=>(
                                            <tr key={prod.id}>
                                                <td>{prod.designation}</td>
                                                <td>{prod.quantite}</td>
                                                <td>{prod.prixUnitaire}</td>
                                                <td>{prod.quantite * prod.prixUnitaire}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                    )
                   
                }
                <form id="formFacture" onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                    <div className="form-inline" >
                        <Field name="designation" label="Designation : " type="text" placeholder=" " component={renderField} /><br />
                        <Field name="quantite"label=" Quantite : " type="number" placeholder=" " component={renderField} />
                        <Field name="prix_unitaire" label=" Prix Unitaire : " type="number" placeholder=" " component={renderField} />
                    </div>
                    <Button type="submit" className="btn btn-success btn-lg" >valider</Button>
                </form>
            </div>
        )
    }

}

const mapDispatchToProps = {
    factureFinalAdd
}

const mapStateToProps = state => ({
    client : state.client
});

export default reduxForm({
    form: 'FactureFinalForm'
})(connect(mapStateToProps, mapDispatchToProps)(FacutreFinalForm));

