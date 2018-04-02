import React from 'react';
import { shallow } from 'enzyme';
import { ViewPage } from '../../../src/features/topics';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ViewPage />);
  expect(renderedComponent.find('.topics-view-page').length).toBe(1);
});
