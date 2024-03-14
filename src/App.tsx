import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../src/components/BarLine';
import PostsList from './components/Posting/PostsList';
import Register from './components/Registeration/Register';
//import test from '../src/components/test';
import Profile from './components/Profile/Profile';
import MyPosts from './components/Posting/MyPosts';
import Login from '../src/components/Registeration/Login';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/' component={PostsListfunc} />
          <Route path='/register' component={Register} />

          <Route path='/profile' component={Profile} />

          <Route path='/myposts' component={MyPosts} />
          <Route path='/login' component={Login} />

          {/* Add more routes here as needed */}
        </Switch>
      </Router>
    </div>
  );
}

function PostsListfunc() {
  return (
    <>
      <Navbar />
      <PostsList />
    </>
  );
}

export default App;
