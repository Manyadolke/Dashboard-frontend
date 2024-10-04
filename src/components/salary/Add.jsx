import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { fetchDepartments, getEmployees} from '../../utils/EmployeeHelpers';

const Add = () => {
    const [employee, setEmployee] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,
    });
    const [employees, setEmployees] = useState([]);
    const[departments,setDepartments] = useState([]); 
    const navigate = useNavigate();
  
    useEffect(()=>{
      const getDepartments= async () => {
      const departments =  await fetchDepartments()
      setDepartments(departments)
    }
    getDepartments();

    }, [])

   

    // useEffect(() => {
    //     const fetchEmployee = async () => {
    //         try {
    //             const response = await axios.get(
    //                 http://localhost:5000/api/employee/${id},
    //                 {
    //                     headers: {
    //                         Authorization: Bearer ${localStorage.getItem("token")},
    //                     },
    //                 }
    //             );
    //             if (response.data.success) {
    //                 const employee = response.data.employee;
    //                 setEmployee({
    //                     name: employee.userId.name,
    //                     maritalStatus: employee.maritalStatus,
    //                     designation: employee.designation,
    //                     salary: employee.salary,
    //                     department: employee.department,
    //                 });
    //             }
    //         } catch (error) {
    //             console.error("Error fetching employee data:", error);
    //             if (error.response && !error.response.data.success) {
    //                 alert(error.response.data.error);
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchEmployee();
    // }, [id]);

 

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value); // Fetch employees by department name
        setEmployees(emps);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `https://dahboard-api.vercel.app/api/salary/add`,
                 employee,
                {
                    headers: {
                        // "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            console.error("Error updating employee:", error);
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <>

        {departments  ? (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Add Salary</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                
                  {/*Department*/}
             <div>
              <label className='block text-sm font-medium text-gray-700'>
              Department
              </label>
              <select
              name="department"
              onChange={handleDepartment}
              value={employees.department}
         
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
              >
              <option value="">Select Department</option>
              {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
              { dep.dep_name}
              </option>
    ))}
        
              </select>
              </div> 
 
                    {/* Employees */}
                    <div >
                        <label className='block text-sm font-medium text-gray-700'>
                            Employee
                        </label>
                        <select
                            name="employeeId"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Employee</option>
                            {employees.map((emp) => (
                                <option key={emp._id} value={emp._id}>
                                    {emp.employeeId}
                                </option>
                            ))}
                        </select>
                    </div>


                              {/* basic salary  */}
                    <div >
                        <label className='block text-sm font-medium text-gray-700'>
                            Basic Salary
                        </label>
                        <input
                            type="number"
                            name="basicSalary"
                            onChange={handleChange}
                            placeholder='basic salary'
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required/>
                    </div>


                    
                    {/* salary  */}
                    <div >
                        <label className='block text-sm font-medium text-gray-700'>
                            Allowances
                        </label>
                        <input
                            type="number"
                            name="allowances"
                            onChange={handleChange}
                            placeholder='allowances'
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required/>
                    </div>

                    {/* deductions */}
                    <div >
                        <label className='block text-sm font-medium text-gray-700'>
                            Deductions
                        </label>
                        <input
                            type="number"
                            name="deductions"
                            onChange={handleChange}
                            placeholder='deductions'
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required/>
                            {/* add */}
                    </div>
                    {/* pay date */}
                    <div >
                        <label className='block text-sm font-medium text-gray-700'>
                            Pay Date
                        </label>
                        <input
                            type="date"
                            name="payDate"
                            onChange={handleChange}
                           
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required/>
                    </div>


                </div>
                <button
                    type="submit"
                    className='w-full mt-6 bg-green-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                >
                    Add Salary
                </button>
            </form>
        </div>
        ) : (
            <div> Loading...</div>
        )}
    </>
    );
};

export default Add;