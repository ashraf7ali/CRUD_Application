import { NurseInfo } from "./NurseInfo"


export const TableRows = ({nurseData, loading, deleteHandler}) =>{
    
    return (
        nurseData.map((nurse) => {
            return <NurseInfo key ={nurse.EMPID} nurse= {nurse}
            onDelete = {(EMPID)=>{
                deleteHandler(EMPID)
            }}
            />})
    )
}