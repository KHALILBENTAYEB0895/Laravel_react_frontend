import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {

    const {token, setToken} = useContext(AppContext);

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const [errors, setErrors] = useState({})
    const [credErrors, setCredErrors] = useState('')

    async function handleLogin(e){
        e.preventDefault();
        setCredErrors(""); // Réinitialiser le message d'erreur
        setErrors({}); // Réinitialiser les erreurs de validation
        const res = await fetch("/api/login", {
            method: "post",
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        console.log(data);
        
        if(res.status === 422){
            // Erreurs de validation (ex. champ vide, email mal formaté)
            setErrors(data.errors || {});

        }else if(res.status === 401){
            // Erreur d'identifiants incorrects
            setCredErrors(data.message || "Email ou mot de passe incorrect.");
        }else if(res.ok){
            // Connexion réussie
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/");
        }
    }


    return(
        <>
            <h1 className="title text-center">Login to your account</h1>
            <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input 
                        type="text"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.email && <p className="error text-center">{errors.email[0]}</p>}
                </div>

                <div>
                    <input 
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.password && <p className="error text-center">{errors.password[0]}</p>}
                </div>

                {credErrors && (
                    <div className="bg-red-100 border border-red-400 text-red-700 
                    p-3 rounded-lg shadow-md w-full 
                    mt-4 text-center"
                    >
                        <p>Email ou mot de passe incorrect.</p>
                    </div>
                )}

                <div className="flex justify-center">
                    <button className="primary-btn w-20 p-2 mt-1">Login</button>
                </div>
            </form>
        </>
    )
}