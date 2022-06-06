import { composeWithDevTools } from 'redux-devtools-extension';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './auth';
import statusErrorReducer from './status-error'
import {persistReducer, persistStore} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({
  auth: authReducer,
  statusError: statusErrorReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const rootPersistedReducer = persistReducer(persistConfig, reducers);

const middleware = [ReduxThunk];

const store = createStore(
  rootPersistedReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
export const persistor = persistStore(store);