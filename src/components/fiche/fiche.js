import React, {Component, Fragment , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import '../../css/fiche.css';
import {Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../../auth/auth';



export default class Fiche extends Component{
 
    render(){
        const fiche = this.props.location.state.fiche;
        const referer = this.props.location.state.referer;
        return(
            <Fragment>
                <div className="container">
                    <TopAppBar fiche={fiche} referer={referer} />
                </div>
                <div className="container" style={{width:"700px"}}>
                    <div className="container">
                            <div className="row justify-content-between" id="header">
                                <div className="col-7">
                                    <div className="row justify-content-start">
                                        <div className="col-2" id="logoImg">   
                                            <img src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-creative-company-logo-png-image_1420804.jpg"
                                                alt="" width="70px" height="70px" />
                                        </div>
                                        <div className="col-5" id="logoTitle">
                                            <h2 style={{ marginBottom: 0 }}><u> HERPA Solutions </u></h2>
                                            <small style={{ marginTop: 0 }}>Ensemble, construsons l'avenir</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4" >
                                    <div className="container" id="headerDomaine">
                                        <h4 style={{ marginBottom: 0}}>INGENIEUR INFORMATIQUE</h4>
                                        <small style={{ marginBottom: 0 }}>Développement d'application - télécom</small>
                                        <small style={{ marginBottom: 0 }}>Administateur système - Cartographie</small>
                                        <small>numérique</small>
                                    </div>
                                </div>
                            </div> 
                    </div>

                    <div className="container" style={{width:"700px;font-size: 20px"}}>
                        <h2 style={{ textAlign: "center" }}><strong><u>DECHARGE DE RECEPTION DE FONDS</u></strong></h2><br /><br />
                        <div className="container" style={{width:"700px", fontSize:"15px"}}>
                            <p>je sousigné <strong> {fiche.signataire} </strong></p><br />
                            <p>demeurant à <strong> {fiche.adresse} </strong> </p><br />
                            <p>reconnais avoir reçu de <strong> {fiche.creantier} </strong> </p><br />
                            <p>la somme de : <strong> {fiche.montant}  FCFA</strong> </p><br />
                            <p>Motif: <br /> {fiche.motif} </p><br /><br />
                            <p>Fait à <strong> {fiche.lieu} </strong> </p><br />
                            <p>Le <strong> {fiche.date.substring(0, 10)} </strong> </p><br /><br /><br />
                        </div>
                </div>
                    <div className="footer" style={{textAlign: "center"}}>
                        <p>RCCM : TG-LOM 2016 A 2953 / NIF : 1000761613</p>
                        <p>365 Rue, Rue Aniko palake, 15BP439 Lomé-Togo / Contacts : (00228) 90358957/97929859/92615542 </p>
                        <p>Email : info@landogroupcie.com / site web : www.landogroupcie.com</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

export function TopAppBar(props) {
    const classes = useStyles();
    const fiche = props.fiche;
    const referer = props.referer;
    const [isDelete, setisDelete] = useState(false);

    const deleteFonction = () =>{
        const url = AuthService.getFiche()+"/"+fiche.id

        axios.delete(url, AuthService.getAuthHeader())
            .then(response => { if (response.status === 204) { setisDelete(true)}})
            .catch(error => {
                if (error.response.status === 401) {
                    AuthService.tokenExpire();
                    this.props.isAuth(false);
                }
        });
    }

    if(isDelete){
        return (<Redirect to={referer} />);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit">
                            <Link to={{
                                pathname: `/edit/${fiche.id}`,
                                state: {fiche:fiche, referer:referer}
                            }}
                            style={{ color: "white", textDecoration: "none" }}
                            > Modifier </Link>
                        </Button>
                        <Button color="inherit" onClick={deleteFonction}> Supprimer </Button>
                        <Button color="inherit"><Link to={{ pathname: "/print", state: { fiche: fiche, referer: referer } }} > Imprimer</Link> </Button>
                    </Typography>
                </Toolbar> 
            </AppBar>
            <br />
        </div>
    );
}