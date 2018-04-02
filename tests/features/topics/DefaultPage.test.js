import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/topics/DefaultPage';

describe('topics/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      topics: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.topics-default-page').length
    ).toBe(1);
  });
});
