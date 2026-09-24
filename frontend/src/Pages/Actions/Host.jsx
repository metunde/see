import { useState, useEffect } from "react";


export default function Hosts() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        position: ""
    });

    const [hostData, setHostData] = useState(null);
    const [popup, setPopup] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [token] = useState(localStorage.getItem("token"));
    const [hostId, setHostId] = useState(null);


    const showModal = () => {

        setFormData(hostData)
        console.log(hostData)
        setPopup(true)
    }

    const getId = (id) => {
        setHostId(id);
        console.log("Selected Host ID:", id);
    };

    const closeModal = () => {
        setPopup(false);
        setIsUpdate(false);
        setIsAdd(false);
    }

    const createHost = async (e) => {
        e.preventDefault()

        const res = await fetch("api/host", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: "post",
            body: JSON.stringify(formData)
        })
        const data = await res.json();

        console.log(data)
        setFormData({})
        setPopup(false)
        getHost()
    }


    const getHost = async () => {
      
            const res = await fetch("api/host", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
            });

            
            const data = await res.json();

            setHostData(data)




      
    };

    const updateHost = async (hostId) => {
    
            const res = await fetch(`api/host/${hostId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            console.log(data.id)
            console.log(data);
            setPopup(false);
            getHost(); 
     
       
    };


    const deleteHost = async (id) => {

        const res = await fetch(`api/host/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        const data = await res.json();
        setDelModal(false)
        getHost()
    };




    useEffect(() => {
        getHost();
    }, []);
    return (

        <div className="">
            <header title="Hosts" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <div className="flex flex-wrap items-center justify-between pb-4 space-y-4 bg-white flex-col md:flex-row md:space-y-0">
                                <div className="mt-4 ml-5">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => {
                                                setIsAdd(true);
                                                showModal();
                                            }}
                                            className="inline-flex items-center px-3 py-2 pl-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                            type="button"
                                        >
                                            <div className="pr-1">Add</div>
                                            <svg
                                                className="w-3 h-3 mb-1 text-white me-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 16"
                                            >
                                                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                                            </svg>
                                        </button>
                                        <input
                                            type="search"
                                            placeholder="Search..."
                                            className="search-input border border-blue-600 rounded-lg ml-20"
                                        />
                                    </div>

                                    {popup && (


                                        <div
                                            id="static-modal"
                                            tabIndex="-1"

                                            className="flex overflow-y-auto overflow-x-hidden fixed top-1/2 right-1/2 left-1/2 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                                        >
                                            <div className="relative w-full max-w-2xl max-h-full p-4">
                                                <div className="relative bg-white rounded-lg shadow">
                                                    <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5">

                                                        <h3 className="text-xl font-semibold text-gray-900">
                                                            Edit Host
                                                        </h3>
                                                        <button onClick={closeModal}
                                                            type="button"
                                                            className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto"
                                                        >

                                                            <span className="sr-only">Close modal</span>
                                                        </button>
                                                    </div>
                                                    <div className="p-4 space-y-4 md:p-5">
                                                        <form className="max-w-sm mx-auto">
                                                            <div className="mb-5">
                                                                <label htmlFor="name" />
                                                                <input
                                                                    id="name"
                                                                    type="text"
                                                                    required
                                                                    placeholder="Omoboriola Chukwudi Danjuma"
                                                                    autoComplete="off"
                                                                    value={formData.name}
                                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="mb-5">
                                                                <label htmlFor="email" />
                                                                <input
                                                                    id="email"
                                                                    type="email"
                                                                    required
                                                                    placeholder="example@example.com"
                                                                    autoComplete="off"
                                                                    value={formData.email}
                                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="mb-5">
                                                                <label htmlFor="phone" />
                                                                <input
                                                                    id="phone"
                                                                    type="text"
                                                                    required
                                                                    placeholder="07000000000"
                                                                    autoComplete="off"
                                                                    value={formData.phone}
                                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="mb-5">
                                                                <label htmlFor="department" />
                                                                <input
                                                                    id="department"
                                                                    type="text"
                                                                    required
                                                                    placeholder="XYZ Limited"
                                                                    autoComplete="off"
                                                                    value={formData.department}
                                                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                                />
                                                            </div>
                                                            <div className="mb-5">
                                                                <label htmlFor="position" />
                                                                <input
                                                                    id="position"
                                                                    type="text"
                                                                    required
                                                                    placeholder="XYZ Limited"
                                                                    autoComplete="off"
                                                                    value={formData.position}
                                                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                                                />
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="flex items-center justify-center p-4 border-t border-gray-200 rounded-b md:p-5">
                                                        {isAdd && popup && (
                                                            <button onClick={createHost} type="submit" className="primary-btn">
                                                                Create
                                                            </button>
                                                        )}

                                                        {isUpdate && popup &&  (
                                                            <button
                                                              
                                                                onClick={() => updateHost(hostId)}
                                                                className="primary-btn"
                                                            >
                                                                Update
                                                            </button>
                                                        )}


                                                        <button
                                                            onClick={closeModal}
                                                            type="button"
                                                            className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    )}


                                </div>

                            </div>

                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center"></div>
                                        </th>
                                        <th scope="col" className="px-6 py-3">Full Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Phone Number</th>
                                        <th scope="col" className="px-6 py-3">Department</th>
                                        <th scope="col" className="px-6 py-3">Position</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hostData ? (
                                        hostData.map((host, id) => (
                                            <tr key={id} className="bg-white border-b">
                                                <td className="p-4">
                                                    <div className="flex items-center"></div>
                                                </td>
                                                <td className="px-6 py-3">{host.name}</td>
                                                <td className="px-6 py-3">{host.email}</td>
                                                <td className="px-6 py-3">{host.phone}</td>
                                                <td className="px-6 py-3">{host.department}</td>
                                                <td className="px-6 py-3">{host.position}</td>
                                                <td className="px-6 py-3 flex space-x-2">
                                                    <button onClick={() => {
                                                        getId(host.id)
                                                        setIsUpdate(true);
                                                        showModal();
                                                    }}
                                                        className="font-medium text-blue-600 hover:underline">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => setDelModal(true)} className="font-medium text-red-600 hover:underline">
                                                        Delete
                                                    </button>
                                                    {
                                                        delModal && (
                                                            <div className="flex overflow-y-auto overflow-x-hidden fixed top-1/2 right-1/2 left-1/2 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                                                            >
                                                                <div className="relative p-4 w-full max-w-md max-h-full">
                                                                    <div className="relative bg-white rounded-lg shadow">
                                                                        <button onClick={() => setDelModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                            </svg>
                                                                            <span className="sr-only">Close modal</span>
                                                                        </button>
                                                                        <div className="p-4 md:p-5 text-center">
                                                                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                            </svg>
                                                                            <h3 className="mb-5 text-lg font-normal text-gray-500" >message</h3>
                                                                            <button onClick={() => deleteHost(host.id)} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                                                                                delete
                                                                            </button>
                                                                            <button onClick={() => setDelModal(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                                                                cancel
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-3 text-center">Loading...</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                            <div className="flex justify-between p-4">
                                <button
                                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    Previous
                                </button>
                                <span className="text-gray-700">Page 1 of 1</span>
                                <button
                                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}



