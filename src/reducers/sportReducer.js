const initState = {
  sport: [],
};

const sportReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_HOLIDAYS':
      return { ...state, sport: action.payload };

    default:
      return initState;
  }
};

export default sportReducer;
