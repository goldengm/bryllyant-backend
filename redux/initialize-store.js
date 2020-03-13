import { createStore, applyMiddleware /* , compose */ } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { Map } from "immutable";
import { persistStore, persistReducer } from "redux-persist";
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./reducers";
import rootEpic from "./epics";

const defaultState = Map({});

export default (initialState = defaultState) => {
  /*
  const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
  */

  let store;
  const epicMiddleware = createEpicMiddleware();
  store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(rootEpic);
  return store;

  /*

  const epicMiddleware = createEpicMiddleware();
  const persistConfig = {
    key: "root",
    storage,
    transforms: [immutableTransform()]
  };
  let store = createStore(
    persistReducer(persistConfig, rootReducer),
    initialState,
    applyMiddleware(epicMiddleware)
  );
  epicMiddleware.run(rootEpic);
  store.__PERSISTOR = persistStore(store);

  return store;
  */
};
