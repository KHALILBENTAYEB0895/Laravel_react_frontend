import { useContext } from "react"
import { AppContext } from "../Context/AppContext"

export default function Home() {

    // const {name} = useContext(AppContext)

    return(
        <div>
            <h1 className="title">Latest Posts of {name} !</h1>
        </div>
    )
}