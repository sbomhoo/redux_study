import { combineReducers } from "redux";
import counter from './counter';
import todos from './todos';

//루트 리듀서  여러개의 리듀서를 하나로 합침
const rootReducer = combineReducers({
    counter,
    todos
});

export default rootReducer;

