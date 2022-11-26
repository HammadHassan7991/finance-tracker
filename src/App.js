import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar';
import useAuthContext from './hooks/useAuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';


function App() {
  const { authIsReady, user } = useAuthContext()
  return (
    <div className="App">
      {authIsReady && (


        <BrowserRouter>
          <Navbar></Navbar>
          <Switch>
            <Route exact path='/'>
              {!user && <Redirect to='/login'></Redirect>}
              {user && <Home></Home>}

            </Route>
            <Route path='/login'>
              {user && <Redirect to='/'></Redirect>}
              {!user && <Login />}

            </Route>
            <Route path='/signup'>
              {user && <Redirect to='/'></Redirect>}
              {!user && <Signup></Signup>}

            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App