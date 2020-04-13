import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// connect enzyme to react v16
configure({
    adapter: new Adapter()
});

describe('<NavigationItems />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems isAuthenticated={ false } />);
    });

    it('Should render two <NavigationItem /> elements if not authenticated', () => {

        wrapper.setProps({
            isAuthenticated: false
        });

        expect(wrapper.find(NavigationItem)).toHaveLength(2);

    });

    it('Should render three <NavigationItem /> elements if authenticated', () => {
        
        wrapper.setProps({
            isAuthenticated: true
        });

        expect(wrapper.find(NavigationItem)).toHaveLength(3);

    });

    it('Should render a logout <NavigationItem /> if authenticated', () => {
        
        wrapper.setProps({
            isAuthenticated: true
        });

        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);

    });

});
