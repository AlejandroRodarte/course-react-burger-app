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

    it('Should render two <NavigationItem /> elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItems isAuthenticated={ false } />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

});
