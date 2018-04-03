import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class TopicRow extends Component {

  static propTypes = {
    topic: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  render() {
    const { topic, onDelete } = this.props;

    return (
      <div className="topics-topic-row">
          <td>{topic.id}</td>
          <td>{topic.title}</td>
          <td>{topic.description}</td>
          <td>{topic.slug}</td>
          <td>
            <div className="btn-toolbar pull-right">
              <Link to={`/topics/${topic.id}`} className="btn btn-primary">Edit</Link>
              <a onClick={onDelete.bind(this, topic)} className="btn btn-danger">Delete</a>
            </div>
          </td>
      </div>
    );
  }
}
