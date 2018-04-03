import React from 'react';
import { shallow } from 'enzyme';
import { EditTopic } from '../../../src/features/topics/EditTopic';

describe('topics/EditTopic', () => {
  it('renders node with correct class name', () => {
    const props = {
      topics: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EditTopic {...props} />
    );

    expect(
      renderedComponent.find('.topics-edit-topic').length
    ).toBe(1);
  });
});
