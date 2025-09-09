import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Home from "./pages/Home";
import Create from "./pages/Create";
import UserDetail from "./pages/UserDetail";
import Update from "./pages/Update";

function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/update/:id" component={Update} />
            <Route path="/user/:id" component={UserDetail} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
