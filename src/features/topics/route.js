// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
} from './';

import ListPage from './ListPage.js';
import EditPage from './EditPage.js';
import ViewPage from './ViewPage.js';

export default {
  path: 'topics',
  name: 'Topics',
  childRoutes: [
    { path: '', component: DefaultPage, name: 'Topic List', isIndex: true },
    { path: 'topic/add', component: EditPage, name: 'New Topic' },
    { path: 'topic/:topicId', component: ViewPage },
  ],
};
