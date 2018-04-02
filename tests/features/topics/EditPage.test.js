import React from 'react';
import { shallow } from 'enzyme';
import { EditPage } from '../../../src/features/topics';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<EditPage />);
  expect(renderedComponent.find('.topics-edit-page').length).toBe(1);
});
