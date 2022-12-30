import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import AuthService from '../../auth/auth'; 


function dateInit(){
    const dateJ = new Date();
    const jour = dateJ.getDate();
    const moi = dateJ.getMonth() + 1;
    const year = dateJ.getFullYear();
   return (jour + "-" + moi + "-" + year);
}

export default class Form extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            signataire: '',
            adresse: '',
            creantier: '',
            montant: 0,
            motif: '',
            lieu: '',
            dateF: dateInit(),
            redirection: false,
            fiches: [],
            isErrorSignataire: false,
            isErrorAdresse: false,
            isErrorCreantier: false,
            isErrorMontant: false,
            isErrorMotif: false,
            isErrorLieu: false,
            errorSignataire:'',
            errorAdresse:'',
            errorCreantier:'',
            errorMontant:'',
            errorMotif:'',
            errorLieu:'',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox ? event.target.checked : event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
       const data = {
           signataire : this.state.signataire,
           adresse : this.state.adresse,
           creantier : this.state.creantier,
           montant: parseInt(this.state.montant),
           motif : this.state.motif,
           lieu : this.state.lieu,
           date : this.state.dateF
       };
        this.setState({
            isErrorSignataire: false,
            isErrorAdresse: false,
            isErrorCreantier: false,
            isErrorMontant: false,
            isErrorMotif: false,
            isErrorLieu: false,
        });
        
        const url = AuthService.getFiche();
        axios.post(url, data, AuthService.getAuthHeader())
            .then(response => {this.setState({
                 fiches: response.data, 
                 redirection: true,
                isErrorSignataire: false,
                isErrorAdresse: false,
                isErrorCreantier: false,
                isErrorMontant: false,
                isErrorMotif: false,
                isErrorLieu: false,
                })})
            .catch(errors => {
                    if (errors.response.status === 401) {
                        AuthService.tokenExpire();
                        this.props.isAuth(false);
                    }
                if (errors.response.status === 400) {
                    errors.response.data["violations"].forEach(error => {
                       
                        switch (error.propertyPath) {
                            case "signataire":
                                this.setState({ errorSignataire: error.message, isErrorSignataire:true })
                                break;
                            case "adresse":
                                this.setState({ errorAdresse: error.message , isErrorAdresse:true})
                                break;
                            case "creantier":
                                this.setState({ errorCreantier: error.message, isErrorCreantier:true })
                                break;
                            case "montant":
                                this.setState({ errorMontant: error.message , isErrorMontant:true})
                                break;
                            case "motif":
                                this.setState({ errorMotif: error.message, isErrorMotif:true })
                                break;
                            case "lieu":
                                this.setState({ errorLieu: error.message, isErrorLieu:true })
                                break;
                            default:
                                break;
                        }
                    });
                }
                this.setState({ redirection:false });
            });
    }



    render() {
        const { fiches } = this.state;
        const {redirection } = this.state;
        const { isErrorSignataire, isErrorAdresse, isErrorCreantier, isErrorMontant, isErrorMotif, isErrorLieu} = this.state;
       console.log(this.state.isErrorSignataire);

        if(redirection){
            return <Redirect to={{pathname:`/fiche/${fiches.id}`, state:{fiche:fiches, referer:"/"} }} />
        }
        return (
            <div className="container">
                <br />
                <h2 style={{ textAlign: 'center' }}><strong><u>DECHARGE DE RECEPTION DE FONDS 1</u></strong></h2><br />
                <form  onSubmit={this.handleSubmit}>
                    <div className="form-group" >
                        <label className="form-control-label">Signataire</label>
                        <input type="text"
                            name="signataire"
                            className="form-control"
                            value={this.state.signataire}
                            required
                            onChange={this.handleChange} />
                        {isErrorSignataire && <span className="badge badge-danger"> {this.state.errorSignataire} </span>}
                    </div>
                    <div className="form-group">
                        <label className="form-control-label">Adresse</label>
                        <input type="text"
                            name="adresse"
                            className="form-control"
                            value={this.state.adresse}
                            required
                            onChange={this.handleChange} />
                        {isErrorAdresse && <span className="badge badge-danger">{this.state.errorAdresse}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-control-label">creantier</label>
                        <input type="text"
                            name="creantier"
                            className="form-control"
                            value={this.state.creantier}
                            required
                            onChange={this.handleChange} />
                        {isErrorCreantier && <span className="badge badge-danger">{this.state.errorCreantier}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-control-label">Montant</label>
                        <input type="number"
                            name="montant"
                            className="form-control"
                            value={this.state.montant}
                            onChange={this.handleChange} 
                            required />
                        {isErrorMontant && <span className="badge badge-danger">{this.state.errorMontant}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-control-label">Motif</label>
                        <textarea type="text"
                            name="motif"
                            className="form-control"
                            value={this.state.motif}
                            required
                            onChange={this.handleChange} />
                        {isErrorMotif && <span className="badge badge-danger">{this.state.errorMotif}</span>}
                    </div>
                    <div className="form-group">
                        <label className="form-control-label">Lieu</label>
                        <input type="text"
                            name="lieu"
                            className="form-control"
                            value={this.state.lieu}
                            required
                            onChange={this.handleChange} />
                        {isErrorLieu && <span className="badge badge-danger">{this.state.errorLieu}</span>}
                    </div>
                    <input className="btn btn-success" type="submit" value="envoyer" />
                </form><br />
            </div>
        );
    }
}