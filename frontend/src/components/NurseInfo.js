import  axios  from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const NurseInfo = ({nurse, onDelete}) => {

    
    return(
        <tr >
            <td>{nurse.EMPID}</td>
            <td>{nurse.FIRSTNAME}</td>
            <td>{nurse.LASTNAME}</td>
            <td>{nurse.WARD}</td>
            <td>{nurse.EMAIL}</td>
            <td>
                <button className="btn btn-primary" onClick={() => onDelete(nurse.EMPID)}>Delete</button>
           |
                <Link className="btn btn-primary" to={"/edit"} state={{ nurse : nurse}}>Edit</Link>
                
                
            </td>
        </tr>
    )
}