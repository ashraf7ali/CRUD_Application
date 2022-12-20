
export const Pagination = ({nurseDataPerPage, totalNurseData, paginate}) => {
    const pageNums = []

    for (let i = 1; i <= Math.ceil(totalNurseData/ nurseDataPerPage); i++){
        pageNums.push(i)
    }
    console.log(Math.ceil(totalNurseData/ nurseDataPerPage))
    console.log(totalNurseData, nurseDataPerPage)
    return (
        <nav>
            <ul className="pagination">
                {
                    pageNums.map(num => (
                        <li key={num} className='page-tem'>
                            <button  className="page-link"
                             onClick={() => paginate(num)}
                             >
                                {num}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}