const messages = (state = {}, action) => {
  switch (action.type) {
    case 'MESSAGE':
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