import userReducer from './reducer/user.reducer';
import actorReducer from './reducer/actor.reducer'
import hireReducer from './reducer/hire.reducer'
import profileReducer from './reducer/profile.reducer'

const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit")
const { combineReducers } = require("redux")

const rootReducer = combineReducers({
  userReducer,
  hireReducer,
  actorReducer,
  profileReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()]
})

export default store;