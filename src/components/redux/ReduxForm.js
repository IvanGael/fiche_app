import React from 'react';

export const renderField = ({input, label, type, placeholder, meta:{error}}) =>{
    return(
        <div className="form-group">
           {label !== null && label !=='' && <label>{label} </label>}
            <input {...input} type={type} placeholder={placeholder} className="form-control" />
        </div>
    );
}

