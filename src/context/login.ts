import { createContext } from "react";

interface ILogin {
    loggedIn: boolean,
    setLoggedin: React.Dispatch<React.SetStateAction<boolean>>,
}
export const Login = createContext<ILogin>({
    loggedIn:  false,
    setLoggedin:  () => {}
})

