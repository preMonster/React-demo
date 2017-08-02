import initialState from '../initialState.js';
var Objectassign = require('object-assign');


const TEST_REQUEST = "TEST_REQUEST";
const TEST_SUCCESS = "TEST_SUCCESS";
const TEST_ERROR = "TEST_ERROR";

export default function permissions(state=initialState,action){
  switch (action.type) {
    case TEST_REQUEST:
      return Objectassign({},state,{
        isFetching:true
      });
    case TEST_SUCCESS:
        return Objectassign({},state,{
          isFetching:false,
          data:action.test.data
        });
    case TEST_ERROR:
          return Objectassign({},state,{
            isFetching: false
          });
    default:
      return state;
  }
}
