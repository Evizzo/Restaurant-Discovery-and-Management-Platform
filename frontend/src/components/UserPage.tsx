import { useEffect, useState, ChangeEvent } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { executeGoogleLogin } from '../api/ApiService';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../api/AuthContex';
import { Link } from 'react-router-dom';

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

//   const handleDeleteAccount = () => {
//     deleteCurrentUser()
//       .then(() => {
//         authContext.logout();
//         alert('Account deleted successfully');
//       })
//       .catch((error) => {
//         alert(error.response.data.message);
//       });
//   };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 bg-gradient-to-r from-[#D1A373] to-[#8B5A2B]">
      <Container className="mt-4">
        <h1 className="font-semibold text-4xl text-center mb-8">Vaši detalji.</h1>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Card className="w-full max-w-lg">
            <Card.Body>
              {/* <Card.Title className="text-lg font-semibold">Vaši detalji</Card.Title> */}
              <Card.Text>
                <img src={userData.pictureUrl} alt="Profile" />
                <strong>Ime:</strong> {userData.firstname}<br />
                <strong>Prezime:</strong> {userData.lastname}<br />
                <strong>Email:</strong> {userData.email}<br />
                {/* <Link to={`/user-profile/${userData.email}`} className="text-blue-500 hover:underline"><strong>Public profile page</strong></Link> */}
              </Card.Text>
              <br />
              {/* <Button variant="danger" onClick={handleDeleteAccount}>
                Delete your account
              </Button> */}
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default UserPage;
