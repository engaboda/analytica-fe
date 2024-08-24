import Navbar from "./Navbar";
import { useState, useEffect } from "react";


function showFileTable(files){
    return (
    <div className="overflow-x-auto">
              <table className="min-w-700 bg-white" style={{margin: "auto"}}>
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold" style={{textAlign: "center"}}>
                      fileID
                    </th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold" style={{textAlign: "center"}}>
                      Created At
                    </th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold" style={{textAlign: "center"}}>
                      File Type
                    </th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-600 border-b border-gray-300 text-left text-sm uppercase font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    files.map((file)=>(
                        <tr key={file._id}>
                            <td className="px-4 py-2 border-b border-gray-300">{file._id}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{file.create_at}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{file.file_type}</td>
                            <td className="px-4 py-2 border-b border-gray-300">
                              <button
                                onClick={()=>getHeadForTabular(file._id)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                              >
                                ShowHead
                              </button>
                              <button
                                onClick={()=>getMeanForTabular(file._id, "Age")}
                                className="bg-blue-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs ml-1"
                              >
                                Mean
                              </button>
                            </td>
                        </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
    )
}


const getHeadForTabular = (id)=>{
    const requestOptions = {
      method: "GET",
    }

    const response = fetch(`http://localhost:5000/api/tabular/${id}/head`, requestOptions)
      .then((response) => response.json())
      .then((json) => json)
    return response
}


const getMeanForTabular = (id, columnName)=>{
    const requestOptions = {
      method: "GET",
    }

    const response = fetch(`http://localhost:5000/api/tabular/${id}/${columnName}/mean`, requestOptions)
      .then((response) => response.json())
      .then((json) => json)
    return response
}


const getModeForTabular = (id, columnName)=>{
    const requestOptions = {
      method: "GET",
    }

    const response = fetch(`http://localhost:5000/api/tabular/${id}/${columnName}/mode`, requestOptions)
      .then((response) => response.json())
      .then((json) => json)
    return response
}


const getMedianForTabular = (id, columnName)=>{
    const requestOptions = {
      method: "GET",
    }

    const response = fetch(`http://localhost:5000/api/tabular/${id}/${columnName}/median`, requestOptions)
      .then((response) => response.json())
      .then((json) => json)
    return response
}


export default function Tabular(active) {
    const [files, setFiles] = useState([]);

    const requestOptions = {
      method: "GET",
    };

    useEffect(()=>{
        const filesApi = ()=>{
            fetch("http://localhost:5000/api/tabular", requestOptions)
              .then((response) => response.json())
              .then((json) => setFiles(json['data']))
        }
        filesApi();

    }, []);

    return (
        <div>
            <Navbar active="Tabular" />
            {showFileTable(files)}
        </div>
    )
}