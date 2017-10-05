import AppDispatcher from '../dispatcher/AppDispatcher';
import { GET_GROUPS, CREATE_GROUP } from '../constants/groupConstants';

// Define action methods
const GroupActions = {
  /**
 * Action method to get User's groups
 * @param {string} userUid 
 */
  getGroups: (userUid) => {
    AppDispatcher.handleViewAction({
      type: GET_GROUPS,
      payload: { userUid },
    });
  },
  /**
 * Action methods that lets User create a group .
 * @param {*} groupName name of the group created
 */

  createGroup: (groupName, userId, userName) => {
    AppDispatcher.handleViewAction({
      type: CREATE_GROUP,
      payload: { groupName, userId, userName },
    });
  },

};

export default GroupActions;
