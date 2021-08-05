const mainReducer = (state = { users: [],movies:[],subscriptions:[],members:[]}, action) => {

    
    switch (action.type) {
      case "ADD_DATA":
        return { ...state, users: action.payload.users, movies:action.payload.movies ,subscriptions:action.payload.subscriptions,members:action.payload.members}
      
      default:
        return { ...state };
    }
  };
  
  export default mainReducer;
  