import Navbar from "./Navbar";
import { useState, useEffect } from "react";


function showImageTable(images){
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
                    images.map((file)=>(
                        <tr key={file._id}>
                            <td className="px-4 py-2 border-b border-gray-300">{file._id}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{file.create_at}</td>
                            <td className="px-4 py-2 border-b border-gray-300">{file.file_type}</td>
                            <td className="px-4 py-2 border-b border-gray-300">
                              <button onClick={()=>resizeImage(file._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">
                                Reszie
                              </button>
                              <button onClick={()=>cropImage(file._id)} className="bg-blue-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs ml-1">
                                Crop
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


const resizeImage = (id)=>{
    const requestOptions = {
          method: "POST",
          body: JSON.stringify({
            "size": [10, 10]
          }),
          headers: {
            'Content-Type': 'application/json',
          }
    }

    const response = fetch(`http://localhost:5000/api/image/${id}/resize`, requestOptions,)
      .then((response) => response.json())
      .then((json) => json)
    return response
}


const cropImage = (id)=>{
    const requestOptions = {
          method: "POST",
          body: JSON.stringify(
            {
                "left": 100,
                "right": 300,
                "top": 50,
                "bottom": 200
            }
          ),
          headers: {
            'Content-Type': 'application/json',
          }
    }

    const response = fetch(`http://localhost:5000/api/image/${id}/crop`, requestOptions,)
      .then((response) => response.json())
      .then((json) => json)
    return response
}



export default function Images(active) {

    const [images, setImages] = useState([]);

    const requestOptions = {
      method: "GET",
    };

    useEffect(()=>{
        const filesApi = ()=>{
            fetch("http://localhost:5000/api/tabular?filter=image", requestOptions)
              .then((response) => response.json())
              .then((json) => setImages(json['data']))
        }
        filesApi();

    }, []);

    return (
        <div>
            <Navbar active="Image" />
            {showImageTable(images)}
        </div>
    )
}