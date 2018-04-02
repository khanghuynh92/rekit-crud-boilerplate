import React, { Component } from 'react';
import Row from './ViewPage';
import PropTypes from 'prop-types';

export default class ListPage extends Component {
  static defaultProps = {
    list: [],
  }
  static propTypes = {
    list: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="topics-list-page">
        <table className="table table-hover">
         <thead>
         <tr>
           <th>Id</th>
           <th>Title</th>
           <th>Description</th>
           <th>Slug</th>
           <th></th>
         </tr>
         </thead>
         <tbody>
           {this.props.list.length > 0 && this.props.list.map(topic =>
             <tr key={topic.id}>
               <Row topic={topic} onDelete={this.props.onDelete} />
             </tr>
           )}
         </tbody>
       </table>
      </div>
    );
  }
}
