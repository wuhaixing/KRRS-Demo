import { createStore } from 'redux';
import reducer from './league_reducer';

export default function makeStore() {
  return createStore(reducer)
}