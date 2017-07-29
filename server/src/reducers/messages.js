import { EXEC_RESULT } from '../../constants';

const messages = (state = {}, action) => {
  switch (action.type) {
    case EXEC_RESULT:
      const {
        uuid
      } = action.payload;
      return Object.assign({}, state, {
        [uuid]: action.payload
      });
    default:
      return state;
  }
}
export default messages;