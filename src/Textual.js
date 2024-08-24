import Navbar from "./Navbar";
import { useState, useEffect } from "react";


function showDocTable(docs){
    console.log('1:', docs)
    return (
    <div className="overflow-x-auto">
              <table className="min-w-700 bg-white" style={{margin: "auto"}}>
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold" style={{textAlign: "center"}}>
                      Category
                    </th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold" style={{textAlign: "center"}}>
                      Content
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    docs.map((file)=>(
                        <tr key={file._id}>
                            <td className="px-4 py-2 border-b border-gray-300">{file._source.category}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{file._source.content}</td>
                        </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
    )
}


export default function Textual() {
    const [document, setDocument] = useState([]);

    const requestOptions = {
      method: "GET",
    };

    useEffect(()=>{
        const getDocumentsApi = ()=>{
            fetch("http://localhost:5000/api/text/all", requestOptions)
              .then((response) => response.json())
              .then((json) => {
                  if(json.status == "failed"){
                    setDocument([])
                  }
                  else{
                    setDocument(json['hits']['hits'])
                  }
              })
        }
        getDocumentsApi();
        if(document.length != 0){
            console.log('000000000000000')
        }

    }, []);

    return (
        <div>
            <Navbar active="Textual" />
            {showDocTable(document)}
        </div>
    )
}