import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom'

import TopicList from './TopicList.js';
import SearchInput from './../common/SearchInput.js';

export class DefaultPage extends Component {
  static propTypes = {
    topics: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);


    this.fetchTopics = this.fetchTopics.bind(this);
    this.deleteTopic = this.deleteTopic.bind(this);
  }

  componentDidMount() {
    this.fetchTopics();
  }

  deleteTopic(topic) {
    this.props.actions.deleteTopic(topic);
  }

  fetchTopics() {
    this.props.actions.fetchTopics();
  }

  render() {
    const {
      list,
    } = this.props.topics;

    return (
      <div className="topics-default-page">
        <div className="row">
          <div className="col-md-6">
            {/* <SearchInput
              value={params.q}
              onSearch={this.handleSearch}
              placeholder="Title search ..."
            /> */}
          </div>
          <div className="col-md-6 text-right">
            <Link to="/topics/add" className="btn btn-primary">New Post</Link>
          </div>
        </div>
        {list.length > 0 &&
        <TopicList list={list} onDelete={this.deleteTopic} />}
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
)(DefaultPage);
