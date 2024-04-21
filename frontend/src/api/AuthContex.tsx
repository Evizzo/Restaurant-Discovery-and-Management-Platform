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
                // console.log(response)
                
                setAuthenticated(true)
                setEmail(response.data.email)
                setRole(response.data.role)
                setFirstname(response.data.firstname)
                setLastname(response.data.firstname)
                
                return true            
            } else {
                console.log("failed at authcontext 47")
                logout()
                return false
            }    
        } catch(error) {
            console.error(error)
            logout()
            return false
        }
    }

    function logout() {
        async function performLogout() {
          try {
            const response = await executeLogout();
            console.log(response.status)
            if (response.status === 200) {
              setAuthenticated(false);
              setEmail('')
              setRole('')
              setFirstname('')
              setLastname('')
              
              console.log('Logout successful');
            } else {
              console.error('Logout failed');
            }
          } catch (error) {
            console.error('Error during logout:', error);
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