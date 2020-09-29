import React from 'react'
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NotFound from '../components/NotFound'

configure({ adapter: new Adapter() });

describe('NotFound', () => {
    it('should show 404 error', () => {
        const notFound = shallow(<NotFound/>);
        const errorMessage = notFound.find('h3');
        expect(errorMessage.text()).toBe('404 page not found');
    });

    it('should show error message', () => {
        const notFound = shallow(<NotFound/>);
        const errorMessage = notFound.find('p');
        expect(errorMessage.text()).toBe('We are sorry but the page you are looking for does not exist.');
    });
});

