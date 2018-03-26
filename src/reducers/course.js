import { Course_Join,
    Course_Join_Fail,
    Course_Join_Success
 } from '../app-constant';

const initial_state = {
    passwordMatchLoading:false,
    passwordMatchFail:false,
    passwordMatchSuccess:null,
}

const CourseReducer = (state = initial_state, action) => {

    switch (action.type) {
            case Course_Join :{
                return{...state, passwordMatchLoading:true, passwordMatchSuccess: null}
            }
            case Course_Join_Success :{
                return{...state, passwordMatchLoading:false, passwordMatchSuccess:action.payload.status ? 'MATCHED' : "NOT_MATCHED"}
            }
            case Course_Join_Fail :{
                return{...state, passwordMatchLoading:false, passwordMatchSuccess:false}
            }
            default:
            return state
        }
}
export default CourseReducer
