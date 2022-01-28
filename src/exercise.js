import { createStore } from 'redux'

//createStore는 스토어를 만들어주는 함수 입니다.
// 리액트 프로젝트에서는 단 하나의 스토어를 만듭니다.

/* 리덕스에서 관리 할 상태 정의*/
const initialState = {
    counter:0,
    text : '',
    list: []
}

/* 액션 타입 정의 */
// 액션 타입은 주로 대문자로 작성합니다.
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';


/* 액션 생성함수 정의 */
// 액션 생성함수는 주로 camelCase 로 작성합니다.
function increase(){
    return{
        type: INCREASE //액션 객체에는 type 값이 필수!
    };
}

//화살표 함수로 작성하는 것이 더욱 코드가 간결해집니다.
const decrease = () => ({   //객체 리터럴를 괄호로 감싸는 것을 기억하세요:
    type: DECREASE         //화살표 함수의 유일한 문장이 return일때 return과 {}를 생략할 수 있다.
});

const changeText = text => ({     //화살표 함수는 파라미터가 하나만 있을 때는 주변 괄호를 생략할 수 있다.
    type: CHANGE_TEXT,
    text //액션안에는 type외에 추가적인 필드를 마음대로 넣을 수 있습니다.
});

const addToList = item => ({
    type: ADD_TO_LIST,
    item
});

/* 리듀서 만들기 */
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여 
// 새로운 상태를 만드는 함수를 만들어봅시다.
// 주의: 리듀서에서는 불변성을 꼭 지켜줘야 합니다.
function reducer(state=initialState, action) {
    //state 의 초깃값을 initialState로 지정했스빈다.
    switch(action.type){
        case INCREASE:
            return {
                ...state,
                counter: state.counter + 1
            };
        case DECREASE:
            return {
                ...state,
                counter: state.counter -1
            };
        case CHANGE_TEXT:
            return {
                ...state,
                text: action.text
            };
        case ADD_TO_LIST:
            return {
                ...state,
                list: state.list.concat(action.item)
            };
        default:
            return state;
    }
}

/* store 만들기 */
const store = createStore(reducer);

console.log(store.getState()); //현재 store 안에 들어있는 상태를 조회합니다.

//스토어 안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
 const state = store.getState();
 console.log(state);   
}

const unsubscribe = store.subscribe(listener);
//구독을 해제하고 싶을 때는 unsubscribe()를 호출하면 됩니다.

//dispatch를 통해 액션을 호출
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕하세요'));
store.dispatch(addToList({id:1, text:'꺼억'}));
