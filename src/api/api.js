import axios from 'axios';

const API_URL = 'https://school-management-backend-one.vercel.app/api/admin';



/// /////// teacher api//////////
export const addTeacher = (teacher) => axios.post(`${API_URL}/add/new-teacher`, teacher, {
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getAllTeachers = (page = 1, limit = 10, filter = '', sortBy = 'name', sortOrder = 'asc') => 
    axios.get(`${API_URL}/getAllTeachers`, {
      params: {
        page,
        limit,
        filter,
        sortBy,
        sortOrder
      }
    });
  
export const getTeacherById = (id) => axios.get(`${API_URL}/getATeacher/${id}`);

export const updateTeacher = (id, teacher) => axios.put(`${API_URL}/updateATeacher/${id}`, teacher, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  

export const deleteTeacher = (id) => axios.delete(`${API_URL}/deleteATeacher/${id}`);



////student api/////////////

export const addStudent = (student) => axios.post(`${API_URL}/add/new-student`, student, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export const getAllStudents = (page = 1, limit = 10, filter = '', sortBy = 'name', sortOrder = 'asc') => 
      axios.get(`${API_URL}/getAllStudents`, {
        params: {
          page,
          limit,
          filter,
          sortBy,
          sortOrder
        }
      });
  
  export const getStudentById = (id) => axios.get(`${API_URL}/getAStudent/${id}`);
  
  export const updateStudent = (id, student) => axios.put(`${API_URL}/updateAStudent/${id}`, student, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export const deleteStudent = (id) => axios.delete(`${API_URL}/deleteAStudent/${id}`);



  //////////////// class api ////////////////////

  export const addClass = (classData) => axios.post(`${API_URL}/add/new-class`, classData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export const getAllClasses = (page = 1, limit = 10, filter = '', sortBy = 'className', sortOrder = 'asc') => 
    axios.get(`${API_URL}/getAllClasses`, {
      params: {
        page,
        limit,
        filter,
        sortBy,
        sortOrder
      }
    });
  
  export const getClassById = (id) => axios.get(`${API_URL}/getASingleClass/${id}`);
  
  export const updateClass = (id, classData) => axios.put(`${API_URL}/updateASingleClass/${id}`, classData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export const deleteClass = (id) => axios.delete(`${API_URL}/deleteASingleClass/${id}`)