import React, { useState} from 'react';

const FiltreForm = (props)=> {
    const  [date1, setDate1] = useState(props.date1);
    const  [date2, setDate2] = useState(props.date2);

    return(
        <form onSubmit={props.handleSubmit}>
            <legend>filtrer par date</legend>
            <div className="form-group row">
                <label htmlFor="date1" className="col-sm-1 col-form-label">Entre:</label>
                <div style={{maxWidth:"220px"}}>
                    <input type="date" className="form-control" value={date1} name="date1" id="date1" required onChange={(e)=> setDate1(e.target.value)} />
                </div>
                <label htmlFor="date2" className="col-sm-1 col-form-label">Et:</label>
                <div style={{maxWidth:"220px", marginRight:"20px"}} >
                     <input type="date" className="form-control" value={date2} name="date2" id="date2" required onChange={(e)=> setDate2(e.target.value)} />
                </div>
                <input type="submit" className="btn btn-secondary" value="flitre" />
            </div>
        </form>
    );
}

export default FiltreForm;