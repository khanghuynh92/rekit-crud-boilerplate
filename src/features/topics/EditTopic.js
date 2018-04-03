import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Textarea from 'react-textarea-autosize';
import { isEqual } from 'lodash';

export class EditTopic extends Component {
  static propTypes = {
    topics: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    params: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      topicId: this.props.match && this.props.match.params ? this.props.match.params.topicId : null,
      topic: {
        id: '',
        title: '',
        description: '',
        slug: '',
      }
    };
  }


  async componentDidMount() {
    if (this.state.topicId) {
      // get posts
      const topic = await this.props.actions.fetchTopic({
        id: this.state.topicId,
      });

      this.setState({
        topic: {
          ...topic,
        }
      })
    }
  }

  handleChange(field, e) {
    const topic = Object.assign({}, this.state.topic, {[field]: e.target.value});
    this.setState(Object.assign({}, this.state, {topic}));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.topicId) {
      // update topics
      this.props.actions.updateTopic({
        ...this.state.topic,
      })
    } else {
      // create topics
      this.props.actions.addTopic({
        ...this.state.topic,
      })
    }

    this.props.history.push("/topics");
  }


  render() {
    return (
      <div className="topics-edit-topic">
        <form onSubmit={this.handleSubmit.bind(this)} noValidate>
        <div className="form-group">
          <label className="label-control">Title</label>
          <input
            type="text"
            className="form-control"
            value={this.state.topic.title}
            onChange={this.handleChange.bind(this, 'title')} />
        </div>

        <div className="form-group">
          <label className="label-control">Body</label>
          <Textarea
            style={{ minHeight: 20, maxHeight: 80 }}
            className="form-control"
            value={this.state.topic.description}
            onChange={this.handleChange.bind(this, 'description')} />
        </div>

        <div className="form-group">
          <label className="label-control">Slug</label>
          <input
            type="text"
            className="form-control"
            value={this.state.topic.slug}
            onChange={this.handleChange.bind(this, 'slug')} />
        </div>

        <button type="submit" className="btn btn-default">{this.state.topicId ? 'Update' : 'Create' } Post</button>
      </form>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    topics: state.topics,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTopic);
