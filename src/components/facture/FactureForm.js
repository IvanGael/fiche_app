import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../redux/ReduxForm';
import { Button } from 'react-bootstrap';
import '../../index.css';
import { connect } from 'react-redux';
import { factureAdd } from '../redux/action/actions';
import { Redirect } from 'react-router-dom';

 class FactureForm extends Component {
    
     onSubmit(values) {
        const {factureAdd} = this.props;
      return (
          factureAdd(values),
          console.log(this.props.client.client)
      );
     }


    render() {
        const client = this.props.client.client;
        console.log(client);
        
        if(client.length !== 0 && client !== null){
            return <Redirect to={{ pathname: "/nouvelle-facture-final", state: { referer:"/nouvelle-facture-final"}}} />
        }
        
        const { handleSubmit } = this.props;
        return (
            <div style={{ maxWidth: "800px", margin: "auto" }} >
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div >
                        <Field name="nom" label="Nom" type="text" placeholder="votre nom" component={renderField} />
                        <Field name="prenom" label="Prenom" type="text" placeholder="votre prenom" component={renderField} />
                        <Field name="telephone" label="Telephone" type="text" placeholder="votre telephone" component={renderField} />
                    </div>
                    <hr />
                    <Button type="submit" className="btn btn-success btn-lg" >valider</Button>
                </form>
            </div>
        )
    }
    
}

const mapDispatchToProps = {
    factureAdd
}

const mapStateToProps = state =>({
    client : state.client
});

export default reduxForm({
    form: 'FactureForm'
})(connect(mapStateToProps, mapDispatchToProps)(FactureForm));
