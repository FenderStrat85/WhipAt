import Register from './Register';
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
    year: "2011",
    make: "TOYOTA",
    model: "COMMANDER",
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

  test('Button should be disabled by default', async () => {
    render(<MockRegister store={store} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('Should call Register function with the correct credentials', async () => {

    // fireEvent.change(getByTestId('year'), { target: { value: 1 } })
    // let options = getAllByTestId('select-option')

    const spyRegister = jest.spyOn(apiService, 'register')
    // const file = new File(['hello'], 'hello.png', { type: 'image/png' })

    render(<MockRegister store={store} />);

    const userNameInput = screen.getByTestId(/user_name/);
    const passwordInput = screen.getByTestId(/password/);
    const emailInput = screen.getByTestId(/user_email/);
    const profileInput = screen.getByTestId(/profile/);

    const submitButton = screen.getByRole('button', { name: 'Register' });

    userEvent.type(userNameInput, 'Test');
    userEvent.type(passwordInput, '123');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(profileInput, 'www.google.com');
    userEvent.selectOptions(screen.getByTestId(/year/), ['2011'])
    userEvent.selectOptions(screen.getByTestId(/make/), ['TOYOTA'])
    userEvent.selectOptions(screen.getByTestId(/model/), ['COMMANDER'])

    await userEvent.click(submitButton);
    expect(spyRegister).toHaveBeenCalledWith(credentials);
  })
})