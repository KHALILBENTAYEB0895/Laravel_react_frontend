import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";

export default function Create(){

    const {token} = useContext(AppContext);

    const [formData, setFormData] = useState({
        title:"",
        content:""
    });

    async function handleCreate(e){
        e.preventDefault()

        const res = await fetch("/api/posts",{
            method:"post",
            headers:{
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        console.log(formData);
    }

    return(
        <>
            <h1 className="title">Create a new Post</h1>
            <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input type="text"
                     placeholder="Post Title"
                     value={formData.title}
                     onChange={(e)=>setFormData({...formData, title: e.target.value})}/>
                </div>
                <div>
                    <textarea rows="6"
                     placeholder="Post Content"
                     value={formData.content}
                     onChange={(e)=>setFormData({...formData, content: e.target.value})}>
                    </textarea>
                </div>
                <button className="primary-btn">Create</button>
            </form>
        </>
    );
}