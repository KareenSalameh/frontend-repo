import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../src/components/BarLine';
import PostsList from './components/Posting/PostsList';
import Register from './components/Registeration/Register';
//import test from '../src/components/test';
import Profile from './components/Profile/Profile';
import MyPosts from './components/Posting/MyPosts';
import Login from '../src/components/Registeration/Login';
import PostComments from './components/PostComment';
//import Parent from './components/ParentFetching';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/' component={PostsListfunc} />
          <Route path='/register' component={Register} />

          <Route path='/profile' component={ProfilePage} />

          <Route path='/myposts' component={MyPost} />
          <Route path='/login' component={Login} />
          <Route path='/comments/:postId' component={PostComments} />

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
function ProfilePage() {
  return (
    <>
      <Navbar />
      <Profile />
    </>
  );
}
function MyPost() {
  return (
    <>
      <Navbar />
      <MyPosts />
    </>
  );
}

export default App;
