import React from 'react'
import {shallow, mount, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Default from '../components/Default'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk]);
const initialState = {
    categories: [],
    postList: [],
    comments: []
}

const store = mockStore(initialState);
const mockHistory = { push: jest.fn() }

describe('Default', () => {
    it('should render correctly', () => {
        const defaultComponent = shallow(<Default store={store}/>);
        expect(defaultComponent).toMatchSnapshot();
    });

    it('should click Button', () => {
        const defaultComponent = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <Default history={mockHistory} location={{ pathname: '/test' }}/>
                </BrowserRouter>
            </Provider>
        );
        const button = defaultComponent.find('button');
        button.first().simulate('click');
        expect(mockHistory.push.mock.calls[0]).toEqual(['/']);
    });

    // it('should select dropdown', () => {
    //     const defaultComponent = mount(
    //         <Provider store={store}>
    //             <BrowserRouter>
    //                 <Default history={mockHistory} location={{ pathname: '/test' }}/>
    //             </BrowserRouter>
    //         </Provider>
    //     );
    //     const selectBox = defaultComponent.find('button');
    //     selectBox.at(1).simulate('click');
    //     expect(defaultComponent.state('sort')).toEqual('voteScore');
    // });
});