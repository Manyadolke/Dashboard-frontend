import axios from "axios"
import { useNavigate } from "react-router-dom"








export const column = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
]

export const DepartmentButtons = ({Id,onDepartmentDelete}) =>{
    const navigate = useNavigate()

    const handleDelete= async (id) =>{
        const confirm = window.confirm("Do you want to delete?")
        if(confirm){
        try{
           
            const response = await axios.delete(
                `https://dahboard-api.vercel.app/api/department/${id}`,
                {
                    headers:{
                        Authorization: `bearer ${localStorage.getItem("token")}`
                    },
                }
            );

            if(response.data.success){
                onDepartmentDelete(id);
                
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
              alert(error.response.data.error);
            }

        }
    }
};

// add

    return(
        <div  className="felx space-x-3">
            <button className="px-3 py-1 bg-green-600 text-white "
            onClick={() => navigate(`/admin-dashboard/department/${Id}`) }
            >Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white " 
            onClick={() => handleDelete(Id)}
            >Delete</button>
        </div>
    )
}