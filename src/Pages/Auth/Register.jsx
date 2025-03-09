import { useState } from "react"

export default function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    

    async function handleRegister(e){
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        console.log(data);
    }


    return(
        <>
        <h1 className="title">Register a new account</h1>
        <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
            <div>
                <input type="text"
                 placeholder="Name"
                 value={formData.name}
                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <div>
                <input type="text"
                 placeholder="Email"
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>

            <div>
                <input type="text"
                 placeholder="Password"
                 value={formData.password}
                 onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>

            <div>
                <input type="text"
                 placeholder="Confirm Password" 
                 value={formData.password_confirmation}
                 onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                />
            </div>

            <button className="primary-btn">Register</button>
        </form>
        </>
    )
}