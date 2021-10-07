import Login from './login.tsx'
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../utils/reducers";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import apiService from '../../utils/ApiService';
import userEvent from '@testing-library/user-event';

const MockLogin = (props) => {
  return (<Provider store={props.store}>
    app = shallow(
    <Router>
      <Login />
    </Router>);
  </Provider>)
}

describe('Login component', () => {

  let store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  //Mock fetch with this:
  // apiService.login = jest.fn().mockImplementation(() => { });

  // jest.mock('node-fetch')
  // mocked(fetch).mockImplementation(() => {
  //   return Promise.resolve({
  //     json: () => Promise.resolve("Hello world")
  //   } as Response)
  // })

  const credentials = { password: "123", user_name: "Test" }

  test('Screen should should render correctly', () => {

    render(<MockLogin store={store} />);

    screen.getByPlaceholderText(/Password/);
    screen.getByPlaceholderText(/Username/);
    screen.getByRole('button', { name: 'Login' });
  })

  test('Should call login function with the correct credentials', async () => {



    //spyOn (obj, 'method inside object)
    const spyLogin = jest.spyOn(apiService, 'login')

    render(<MockLogin store={store} />);

    const userNameInput = screen.getByPlaceholderText(/Username/);
    const passwordInput = screen.getByPlaceholderText(/Password/);
    const submitButton = screen.getByRole('button', { name: 'Login' });

    userEvent.type(userNameInput, 'Test');
    userEvent.type(passwordInput, '123');

    await userEvent.click(submitButton);
    expect(spyLogin).toHaveBeenCalledWith(credentials);
  })
})