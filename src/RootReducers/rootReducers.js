import {CHANGE,CHANGELOADSTATE,CHANGELOADSTATEBACK} from '../ActionTypes/Actions'


const initialState={

    loading:false,
    name:"jess"

}

function rootReducer(state=initialState, action){
    switch(action.type) {
        case CHANGE: 
            return {...state, name: "joe" }
       
        case CHANGELOADSTATE:
            return {...state, loading:true}
        case CHANGELOADSTATEBACK:
            return {...state, loading:false}
        default:
            return state;
    }

}


export default rootReducer