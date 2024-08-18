import React from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState, useEffect } from 'react'

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getpasswords = async() => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        // let passwords = localStorage.getItem("password")
        // if (passwords) {
        setPasswordArray(passwords)
        console.log(passwords)
            // setPasswordArray(JSON.parse(passwords))
        // }
    }
    

    useEffect(() => {
        getpasswords();
       
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordref.current.type = "text"
        if (ref.current.src.includes("eyesclose.svg")) {
            ref.current.src = "eyes.svg"
            passwordref.current.type = "password"
        }
        else {
            ref.current.src = "eyesclose.svg"
            passwordref.current.type = "text"
        }
    }

    const savePassword = async() => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3){

            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast('Error: Password not Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deletePassword = async(id) => {
        console.log("deleting password with id", id)
        let c = confirm("Do You really want to delete this Password")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
        // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        // console.log([...passwordArray, form])
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    }


    const editPassword = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }
    // const editPassword = (id) => {
    //     console.log("Edidting password with id", id)
    //     setform(passwordArray.filter(i=>i.id===id)[0])
    //     setPasswordArray(passwordArray.filter(item=>item.id!==id))
    // }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="md:mycontainer p-3 min-h-[80.9vh]">
                <h1 className='text-4xl text-center font-bold'>  <span className="text-green-500">&lt;</span>
                    pass
                    <span className="text-green-500">OP&gt;</span></h1>
                <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>

                <div className='text-black flex flex-col p-4 gap-8 items-center'>
                    <input value={form.site} onChange={handlechange} className='rounded-full  py-1 p-4 border border-green-500 w-full' type="text" name='site' id='site' placeholder='Enter Website URL' />

                    <div className="flex md:flex-row flex-col w-full gap-8 justify-between">
                        <input value={form.username} onChange={handlechange} className='rounded-full  py-1 p-4 border border-green-500 w-full' type="text" name='username' id='username' placeholder='Enter Username' />
                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handlechange} className='rounded-full  py-1 p-4 border border-green-500 w-full' type="password" name='password' id='password' placeholder='Enter Password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword} >
                                <img ref={ref} className='p-1' width={26} src="eyes.svg" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 rounded-full px-6 py-2 w-fit hover:bg-green-300 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold py-4 text-2xl'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'><span>{item.site}</span></a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" ></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '><span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" ></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>  <div className='flex items-center justify-center '><span>{"*".repeat(item.password.length)}</span>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" ></lord-icon>
                                        </div>
                                    </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager
