import Login from './login.js'
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../utils/reducers";
import { BrowserRouter as Router, Link } from 'react-router-dom';

describe('Login component', () => {

  const getState = jest.fn()
  let store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );


  test('Screen should should render correctly', () => {
    render(<Provider store={store}>
      app = shallow(
      <Router>
        <Login />
      </Router>);
    </Provider>);
    screen.getByPlaceholderText(/Password/);
    screen.getByPlaceholderText(/Username/);

  })








})