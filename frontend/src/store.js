import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, verifyEmailReducer } from './reducers/authReducers'
import {
  postCreateReducer,
  postListReducer,
  userPostListReducer,
} from './reducers/postReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  postList: postListReducer,
  postCreate: postCreateReducer,
  verifyEmail: verifyEmailReducer,
  userPostList: userPostListReducer,
})

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : ''

const intialState = {
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
}

const middleware = [thunk]

// console.log(userInfoFromLocalStorage)

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
