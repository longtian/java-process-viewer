import { FETCH_HOSTS }  from '../constants';

const hosts = (state = [], action) => {
  switch (action.type) {
    case FETCH_HOSTS:
      return action.payload;
    default:
      return state;
  }
};
export default hosts;