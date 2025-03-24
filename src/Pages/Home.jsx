import { useEffect, useState } from "react";
import { data } from "react-router-dom";

export default function Home() {

    const [posts, setPosts] = useState([]);

    async function getPosts(){
        const res = await fetch("/api/posts");
        const data = await res.json();
        
        console.log(data);
        
        if(res.ok){
            setPosts(data)
        }
    }

    useEffect(() => {
        getPosts();
    },[])

    return(
        <>
            <h1 className="title">Latest Posts</h1>

            {posts.length > 0 ? posts.map(post => (
                <div key={post.id} className="mb-4 p-4 border rounded-md border-dashed border-slate-400">
                    <div className="mb-2 flex items-start justify-between">
                        <div>
                            <h2 className="font-bold text-2xl">{post.title}</h2>
                            <small className="text-xs text-slate-600">
                                Create by {post.user.name}{" "} 
                                on{" :"} {new Date(post.created_at)
                                .toLocaleTimeString()}
                            </small>
                        </div>
                        {/* here !!! */}
                    </div>
                    <p>{post.body}</p>
                </div>
            )) : <p>No posts found</p> }
        </>
    )
}