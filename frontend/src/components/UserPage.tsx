import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { executeGoogleLogin } from '../api/ApiService';
import { useAuth } from "../api/AuthContex";
import Button from '../layouts/Button';
import { Link } from "react-router-dom";

function UserPage() {
  const authContext = useAuth();

  interface UserData {
    firstname: string;
    lastname: string;
    email: string;
    pictureUrl: string;
  }

  const [userData, setUserData] = useState<UserData>({
    firstname: '',
    lastname: '',
    email: '',
    pictureUrl: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    executeGoogleLogin()
      .then((response) => {
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
       <Container className="mt-4 text-center"> 
        <h1 className="font-semibold text-4xl text-center mb-8">Vaši detalji.</h1>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Card className="w-full max-w-lg mx-auto">
            <Card.Body>
              <div>
                <img src={userData.pictureUrl} alt="Profile" className="mx-auto" />
                <strong>Ime:</strong> {userData.firstname}<br />
                <strong>Prezime:</strong> {userData.lastname}<br />
                <strong>Email:</strong> {userData.email}<br />
                <strong>Uloga:</strong> {authContext.role}<br />
                <Link to="/add-spot">
                  <Button title="Dodaj objekat"></Button>
                </Link>
                {authContext.role === 'SPOT_OWNER' && (
                  <Link to="/edit-spot">
                    <Button title="Izmeni objekat"></Button>
                  </Link>
                )}
                {authContext.role === 'ADMIN' && (
                  <Link to="/edit-spot">
                    <Button title="Izmeni objekat"></Button>
                  </Link>
                )}
                {authContext.role === 'ADMIN' && (                
                  <Link to={`/admin`} className="text-blue-500 hover:underline"><strong>Admin page</strong></Link>
                )}
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default UserPage;
