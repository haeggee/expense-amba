import {createContext} from "react"


export const UserContext = createContext({
    userName: undefined,
    user: undefined,
    userLogin: () => {}
})