import { Dispatcher } from 'flux';

/**
 * @description This class exports the Flux
 * App Dispatcher
 * 
 * @class DispatcherClass
 * @extends {Dispatcher}
 */
class DispatcherClass extends Dispatcher {
  /**
   * @description This method handles all actions
   * 
   * @param {any} action 
   * @memberof DispatcherClass
   */
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action,
    });
  }
}

const AppDispatcher = new DispatcherClass();

export default AppDispatcher;
