var initialState = {
  data:{},
};

export default function RootReducer(state=initialState,action) {
  console.log("mani reducer check", action);

  switch (action.type) 
  {
    case "ADD-TASK":
      state.data[action.payload[0]] = action.payload[1]
      console.log("ADD Task check",state.data);
      return { data: state.data };
    
    case "EDIT-TASK":
      state.data[action.payload[0]] = action.payload[1]
      console.log("EDIT Task check",state.data);
      return { data: state.data };

    case "DELETE-TASK":
       delete state.data[action.payload[0]]
      console.log("Delete Task check",state.data);
      return { data: state.data };
      
      default:
      return {data:state.data}
    }
    
}
