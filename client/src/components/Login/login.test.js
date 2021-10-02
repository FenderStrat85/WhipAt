import Login from './login.js'
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../utils/reducers";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import apiService from '../../utils/ApiService';
import userEvent from '@testing-library/user-event';

console.log(apiService.login, 'login');

describe('Login component', () => {

  const getState = jest.fn()
  let store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  jest.mock('../../utils/ApiService', () => ({
    login: () => ({ user_name: 'Test', password: '123' })
  }))

  test('Screen should should render correctly', () => {
    render(<Provider store={store}>
      app = shallow(
      <Router>
        <Login />
      </Router>);
    </Provider>);
    screen.getByPlaceholderText(/Password/);
    screen.getByPlaceholderText(/Username/);
    screen.getByRole('button', { name: 'Login' });
  })

  test('Should call login function with the correct credentials', async () => {

    const login = jest.fn();
    const credentials = { password: "123", user_name: "Test" }
    render(<Provider store={store}>
      app = shallow(
      <Router>
        <Login />
      </Router>);
    </Provider>);
    const userNameInput = screen.getByPlaceholderText(/Username/);
    const passwordInput = screen.getByPlaceholderText(/Password/);
    const submitButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(userNameInput, 'Test');
    userEvent.type(passwordInput, '123');

    await userEvent.click(submitButton);
    expect(login).toHaveBeenCalledWith(credentials);
  })
})