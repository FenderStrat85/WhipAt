import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from '../../../utils/reducers';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import apiService from '../../../utils/ApiService';
import userEvent from '@testing-library/user-event';
import CreateMeet from "./CreateMeet";

const MockCreateMeet = (props) => {
  return (<Provider store={props.store}>
    app = shallow(
    <Router>
      <CreateMeet />
    </Router>);
  </Provider>)
}

describe('CreateMeet Component', () => {

  let store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const credentials = {
    meet_name: 'test meet',
    meet_date: "",
    meet_description: 'first meet',
    meet_location: {
      lat: 0,
      lng: 0
    }
  }

  test('CreateMeet screen should render correctly', () => {
    render(<MockCreateMeet store={store} />)

    screen.getAllByPlaceholderText(/Meet Name/);
    screen.getAllByPlaceholderText(/Meet Date/);
    screen.getAllByPlaceholderText(/Meet Description/);
    screen.getAllByRole('button', { name: 'Create Meet' });
  })

  test('Should call createMeet function with correct credentials', async () => {

    const spyCreateMeet = jest.spyOn(apiService, 'createMeet')
    render(<MockCreateMeet store={store} />)
   

    const meetNameInput = screen.getByPlaceholderText(/Meet Name/)
    const meetDateInput = screen.getByPlaceholderText(/Meet Date/)
    const meetDescriptionInput = screen.getByPlaceholderText(/Meet Description/)
    // const meetLocationInput = screen.getByPlaceholderText(/Meet Location/)

    //form in create meets is set to disabled so it the function isn't called.
    //Need to find a way to disable this
    const submitButton = screen.getByRole('button', { name: 'Create Meet' })
    

    userEvent.type(meetNameInput, 'test meet')
    userEvent.type(meetDateInput, '2021-10-01-T19:30')
    userEvent.type(meetDescriptionInput, 'first meet')
    // userEvent.type(meetLocationInput, 'location')

    await userEvent.click(submitButton);
    expect(spyCreateMeet).toHaveBeenCalledWith(credentials);
  })

})