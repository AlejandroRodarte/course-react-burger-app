import React from 'react'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// connect enzyme to react v16
configure({
    adapter: new Adapter()
});

describe('<BurgerBuilder />', () => {

    let wrapper;

    beforeEach(() => wrapper = shallow(<BurgerBuilder />));

    it('Should render <BuildControls /> when receiving ingredients', () => {

        wrapper.setProps({
            hasIngredients: true
        });

        expect(wrapper.find(BuildControls)).toHaveLength(1);

    });

});
