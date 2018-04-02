import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Navbar />);
  expect(renderedComponent.find('.common-navbar').length).toBe(1);
});
