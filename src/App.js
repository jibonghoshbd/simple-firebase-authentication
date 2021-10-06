import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initilizeAuthentication from './Firebase/firebase-initilize';

initilizeAuthentication()
const googleProvider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({})
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }
  return (
    <div className="App">

      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <br />
      {
        user.email && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

    </div>
  );
}

export default App;
