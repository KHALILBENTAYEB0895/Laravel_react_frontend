import { createContext } from "react";
import App from "../App";

export const AppContext = createContext()

export default function AppProvider({children}) {

    return (
        <AppContext.Provider value={{name: "John Doe"}}>
        {children}
        </AppContext.Provider>
    );
    
}

