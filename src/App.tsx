import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from '../src/components/BarLine';
import PostsList from '../src/components/PostsList';
import Register from '../src/components/Register';
//import test from '../src/components/test';
import Profile from '../src/components/Profile';
import MyPosts from '../src/components/MyPosts';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/' component={PostsListfunc} />
          <Route path='/register' component={Register} />

          <Route path='/profile' component={Profile} />

          <Route path='/myposts' component={MyPosts} />

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
