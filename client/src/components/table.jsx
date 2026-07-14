import "../styles/table.css";

function Table({ headers, data }) {

    return (

        <table className="table">

            <thead>

                <tr>

                    {headers.map((header)=>

                        <th key={header}>{header}</th>

                    )}

                </tr>

            </thead>

            <tbody>

                {data.map((row,index)=>

                    <tr key={index}>

                        {row.map((cell,i)=>

                            <td key={i}>{cell}</td>

                        )}

                    </tr>

                )}

            </tbody>

        </table>

    );

}

export default Table;