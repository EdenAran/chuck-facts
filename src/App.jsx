import { HomePage } from './views/HomePage';
import { AppHeader } from './cmps/AppHeader'
import { NavBar } from './cmps/NavBar';
import { Search } from './views/Search';
import { HashRouter as Router, Switch, Route, } from "react-router-dom";
import './style/main.scss'


function App() {
  return (
    <div className="app">
      <Router>
        <AppHeader />
        <NavBar></NavBar>
        <Switch>
          <Route path="/search" component={Search}></Route>
          <Route path="/" component={HomePage}></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
