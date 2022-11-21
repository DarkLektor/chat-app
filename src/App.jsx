import Login from "@/views/login";
import Home from "@/views/home";
import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

function App() {
  const [user] = useAuthState(auth);

  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  }

  return (
    <div className="App">
      {user?.email ? <Home /> : <Login signIn={() => googleSignIn()} />}
    </div>
  );
}

export default App;
