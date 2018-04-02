import React from 'react';
import { shallow } from 'enzyme';
import { ListPage } from '../../../src/features/topics';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ListPage />);
  expect(renderedComponent.find('.topics-list-page').length).toBe(1);
});
