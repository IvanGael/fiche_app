import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink, Redirect} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

 function TopAppBar(props) {
    const classes = useStyles();
    const isLog = props.isLog;
    const [ficheSelect, setFicheSelect] = useState(false);
    const [factureSelect, setFactureSelect] = useState(false);


    function setLogOff() {
        props.handleLog(false);
    }

    function setLogOn(){
        return (<Redirect to={{ pathname: "/login", state: { referer: "" } }}/>);
    }
    function ficheOn(){
      setFicheSelect(true);
      setFactureSelect(false);
    }

    function factureOn(){
        setFicheSelect(false);
        setFactureSelect(true);
    }

    function homeOn(){
        setFicheSelect(false);
        setFactureSelect(false);
    }
    
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="home" onClick={homeOn} >
                            <MenuIcon />
                        Acceuil
                        </IconButton>
                    </NavLink>
                    <Typography variant="h6" className={classes.title}>
                        {(ficheSelect === false && factureSelect === false)&&
                            <Fragment>
                                <NavLink to="/fiche" style={{ color: "white", textDecoration: "none" }} > <Button color="inherit" onClick={ficheOn}>fiche</Button> </NavLink>
                                <NavLink to="/facture" style={{ color: "white", textDecoration: "none" }} > <Button color="inherit" onClick={factureOn}>facture</Button> </NavLink>   
                            </Fragment>
                        }
                        {ficheSelect &&<Fragment>
                            <NavLink to="/fiche" style={{color:"white", textDecoration:"none"}} ><Button color="inherit"> Historique </Button></NavLink>
                            <NavLink to="/filtre" style={{ color: "white", textDecoration: "none" }}><Button color="inherit"> Filtre des fiches </Button></NavLink>
                            <NavLink to="/nouvelle-fiche" style={{color:"white", textDecoration:"none"}}><Button color="inherit"> Creer fiche </Button></NavLink>      
                        </Fragment> 
                        }
                        {factureSelect &&<Fragment>
                                <NavLink to="/facture" style={{ color: "white", textDecoration: "none" }} ><Button color="inherit"> Historique </Button></NavLink>
                                <NavLink to="/nouvelle-facture" style={{ color: "white", textDecoration: "none" }} ><Button color="inherit"> Creer facture </Button></NavLink>
                            </Fragment>
                        }
                    </Typography>
                    {isLog &&<NavLink to="/signup" style={{color:"white", textDecoration:"none"}}><Button color="inherit"> Ajouter un Utilisateur </Button></NavLink>}      
                    {isLog ?
                        (<NavLink to="/logout" style={{ color: "white", textDecoration: "none" }}><Button color="inherit" onClick={setLogOff} >Deconnexion</Button></NavLink>)
                         :(<NavLink to={{pathname:"/login", state:{referer: ""}}} style={{ color: "white", textDecoration: "none" }}><Button color="inherit" onClick={setLogOn} >Se connecter</Button></NavLink>)
                         }
                </Toolbar>
            </AppBar>
            <br />
        </div>
    );
}


export default TopAppBar;