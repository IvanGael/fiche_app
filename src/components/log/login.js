import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../../auth/auth';
import axios from 'axios';
import AuthService from '../../auth/auth';





const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function Login(props) {
    const classes = useStyles();

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();
    const referer = props.location.state.referer || '/';
 
    function postLogin() {
        localStorage.clear();
        const url = AuthService.getLogin();
        axios.post(url, { username:userName, password:password })
            .then(response =>{
                if(response.status === 200){
                    const token = response["data"];
                   AuthService.setTokensLocal(token);
                    setAuthTokens(token);
                    setLoggedIn(true); 
                    AuthService.setLogLocal(true);
                    props.isAuth(true);
                }else{
                    setIsError(true);
                }
            } )
            .catch(error => {setIsError(true);});
    }

    if(isLoggedIn){
        return <Redirect to={referer} />;
    }

    function handleSubmit(e) {
        console.log(userName, password);
        e.preventDefault();
    }

    return (
       
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Connexion
                </Typography>
                {isError ?
                    <div className="alert alert-dismissible alert-danger" style={{ textAlign: "center"}} >
                        nom d'utilisateur ou mot de passe incorrect
                    </div> : " "
                }

                <form className={classes.form} onSubmit={handleSubmit}>
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Nom d'utilisateur"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={e =>{setUserName(e.target.value);}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => { setPassword(e.target.value);}}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Se souvenir"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={postLogin}
                    >
                        Se connecter
          </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="">
                                Mot de passe oublier?
                             </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
          
        </Container>
    );
}
