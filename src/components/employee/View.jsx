import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
   
// adddd 


    useEffect(() => {
        console.log("Employee ID from URL:", id);
        const fetchEmployee  = async () => {
            try {
                 const response = await axios.get(
                    `https://dahboard-api.vercel.app/api/employee/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } 
        };
        fetchEmployee();
    }, [id]);

    return (
        <>
            {employee ? (
                <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                    <h2 className='text-2xl font-bold mb-8 text-center'>Employee Details</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <img 
                                src={`https://dahboard-api.vercel.app/${employee.userId.profileImage}`} 
                                className="rounded-full border w-72"
                                alt={`${employee.userId.name}'s profile`}
                            />
                        </div>
                        <div>
                            <div className='flex space-x-3 mb-5'>
                                <p className='text-lg font-bold'>Name:</p>
                                <p className='font-medium'>{employee.userId.name}</p>
                            </div>

                            <div className='flex space-x-3 mb-5'>
                                <p className='text-lg font-bold'>Employee ID:</p>
                                <p className='font-medium'>{employee.employeeId}</p>
                            </div>

                            <div className='flex space-x-3 mb-5'>
                                <p className='text-lg font-bold'>Date of Birth:</p>
                                <p className='font-medium'>
                                    {new Date(employee.dob).toLocaleDateString()}
                                </p>
                            </div>

                            <div className='flex space-x-3 mb-5'>
                                <p className='text-lg font-bold'>Gender:</p>
                                <p className='font-medium'>{employee.gender}</p>
                            </div>

                            <div className='flex space-x-3 mb-5'>
                                <p className='text-lg font-bold'>Department:</p>
                                <p className='font-medium'>{employee.department.dep_name}</p>
                            </div>

                            <div className='flex space-x-3 mb-5'>
                                <p className='text-lg font-bold'>Marital Status:</p>
                                <p className='font-medium'>{employee.maritalStatus}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : 
                <div>No Employee Found</div>
            }
        </>
    );
}

export default View;
