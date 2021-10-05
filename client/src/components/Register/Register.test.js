import Register from './Register.js';
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../../utils/reducers";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import apiService from '../../utils/ApiService';
import userEvent from '@testing-library/user-event';

const MockRegister = (props) => {
  return (<Provider store={props.store}>
    app = shallow(
    <Router>
      <Register />
    </Router>);
  </Provider>)
}

describe('Register component', () => {
  // const getState = jest.fn()
  let store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const credentials = {
    user_name: "Test",
    password: "123",
    user_email: "test@test.com",
    year: "",
    make: "",
    model: "",
    profile: "www.google.com"
  }

  test('Screen should should render correctly', () => {

    render(<MockRegister store={store} />);

    screen.getByTestId(/user_name/);
    screen.getByTestId(/password/);
    screen.getByTestId(/user_email/);
    screen.getByTestId(/profile/);
    screen.getByTestId(/year/);
    screen.getByTestId(/make/);
    screen.getByTestId(/model/)
    screen.getByRole('button', { name: 'Register' });
  })

  test('Should call Register function with the correct credentials', async () => {

    const spyRegister = jest.spyOn(apiService, 'register')

    render(<MockRegister store={store} />);

    const userNameInput = screen.getByTestId(/user_name/);
    const passwordInput = screen.getByTestId(/password/);
    const emailInput = screen.getByTestId(/user_email/);
    const profileInput = screen.getByTestId(/profile/);
    const yearInput = screen.getByTestId(/year/);
    const makeInput = screen.getByTestId(/make/);
    const modelInput = screen.getByTestId(/model/);

    const submitButton = screen.getByRole('button', { name: 'Register' });

    userEvent.type(userNameInput, 'Test');
    userEvent.type(passwordInput, '123');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(profileInput, 'www.google.com');
    userEvent.type(yearInput, '');
    userEvent.type(makeInput, '')
    userEvent.type(modelInput, '');

    await userEvent.click(submitButton);
    expect(spyRegister).toHaveBeenCalledWith(credentials);
  })
})