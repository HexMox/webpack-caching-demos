import '../common/util';
import 'lodash';
import './a.css';

// import(/* webpackChunkName: "a_async" */'../async/a.async').then((a) => a.log());
// import(/* webpackChunkName: "a2_async" */'../async/a2.async').then((a2) => a2.log());
import('../async/a.async').then((a) => a.log());
import('../async/a2.async').then((a2) => a2.log());