import React from 'react';
import { shallow } from 'enzyme';
import { SearchInput } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SearchInput />);
  expect(renderedComponent.find('.common-search-input').length).toBe(1);
});
