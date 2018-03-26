import {User_Roles_Instructor, User_Roles_Student} from '../app-constant';
/**
 * Get User Type of Loggedin User
 * @param {*} auth 
 * @param {*} course 
 * @param {*} courseId 
 */
export const getUserType = (auth, course, courseId) => {
    let selectedCourse;
    for( let i = 0; i< course.length;i++ ){
        if(course[i].key === courseId){
            selectedCourse = course[i].value.uid;
        }
    }
    if(auth.uid === selectedCourse){
        return User_Roles_Instructor
    } else{
        return User_Roles_Student
    }
}