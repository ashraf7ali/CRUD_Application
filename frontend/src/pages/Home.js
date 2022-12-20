import { useState, useEffect, useCallback } from "react";
import  axios  from "axios";
import { Link } from "react-router-dom";
import { TableRows } from "../components/TableRows";
import { Pagination } from "../components/Pagination";






export const HomePage = () => {
    const [nurseData, setNurseData] = useState([])
    const [query, setQuery] = useState("")

    // pagination components
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const[nurseDataPerPage, setnurseDataPerPage] = useState(3)

    // Implementing serach by firstname and Ward
    const filteredNurseData = nurseData.filter(
        nurse => {
            return(
                nurse.FIRSTNAME.toLowerCase().includes(query.toLowerCase()) ||
                nurse.WARD.toLowerCase().includes(query.toLowerCase())
            )
        }
    )

      //Fetch data from Api
    useEffect(() => {
        
        const getallData= async () =>{
            setLoading(true)
            await axios.get('/api/getNurse')
            .then(res => res.data)
            .then((alldata) => setNurseData(alldata.data))
            setLoading(false)
        }
        getallData()
    }, []) 


    const deleteHandler = async (EMPID) => {
        await axios.delete(`/api/deleteNurse/${EMPID}`)
        let newnurseData = nurseData.filter((nurse) => {
            return nurse.EMPID !== EMPID;
          })

          setNurseData(newnurseData)
    }

    //set pagination 
    const indexOfLastPost = currentPage*nurseDataPerPage
    const indexOfFirstPost = indexOfLastPost - nurseDataPerPage
    const currentNurseData = filteredNurseData.slice(indexOfFirstPost, indexOfLastPost)

    // change page
    const paginate = (num) => {
        setCurrentPage(num)
    }

    return (
    <>

            <h3 className="text-center">Nurse List</h3>
            <input type="text" className="form-control" id="query" placeholder="Search by name or ward"
                value = {query}
                onChange={(event)=>{setQuery(event.target.value)}}
                />
            <Link className="btn btn-primary" to={"/add"} >Add Nurse</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>Employee ID</td>
                        <td>First Name </td>
                        <td>Last Name</td>
                        <td>Ward</td>
                        <td>Email Address</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    <TableRows nurseData = {currentNurseData} loading = {loading} deleteHandler= {deleteHandler}/>
                {
                    
                // filteredNurseData.map((nurse) => {
                // return <NurseInfo key ={nurse.EMPID} nurse= {nurse}
                // onDelete = {(EMPID)=>{
                //     deleteHandler(EMPID)
                // }}
                // />})
            }
                </tbody>
            </table>
            <Pagination nurseDataPerPage ={nurseDataPerPage} totalNurseData= {filteredNurseData.length} paginate={paginate}/>
       
    </>)
}