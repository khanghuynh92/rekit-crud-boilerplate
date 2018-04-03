// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
} from './';

import TopicList from './TopicList.js';
import EditTopic from './EditTopic.js';

export default {
  path: 'topics',
  name: 'Topics',
  childRoutes: [
    { path: '', component: DefaultPage, name: 'Topic List', isIndex: true },
    { path: '/topics/add', component: EditTopic, name: 'New Topic' },
    { path: '/topics/:topicId', component: EditTopic, name: 'Update Topic' },
  ],
};
