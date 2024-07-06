import { ReactNode, createContext, useContext, useState } from "react";
import { executeGoogleLogin, executeLogout } from "./ApiService";

export const AuthContext = createContext({
    isAuthenticated: false,
    login: async () => false,
    logout: () => {},
    email: '',
    role: '',
    firstname: '',
    lastname: '',
  })
  
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [role, setRole] = useState("")

    async function login() {
        try {
            const response = await executeGoogleLogin()
            if(response.status === 200){
                setAuthenticated(true)
                setEmail(response.data.email)
                setRole(response.data.role)
                setFirstname(response.data.firstname)
                setLastname(response.data.lastname)

                return true            
            } else {
                logout()
                return false
            }    
        } catch(error) {
            logout()
            return false
        }
    }

    function logout() {
        async function performLogout() {
          try {
            const response = await executeLogout();
            if (response.status === 200) {
              setAuthenticated(false);
              setEmail('')
              setRole('')
              setFirstname('')
              setLastname('')
              
            } else {
            }
          } catch (error) {
          }
        }
      
        performLogout();
      }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, email, role, lastname, firstname}  }>
            {children}
        </AuthContext.Provider>
    )
} 