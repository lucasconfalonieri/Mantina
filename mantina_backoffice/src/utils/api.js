import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export function getMaterias() {
    return axios.get(BASE_URL + '/subjects');
}

export function saveMateria(body) {
    return axios.post(BASE_URL + '/subjects', body, {
        headers: {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}

export function updateMateria(id_materia, body) {
    return axios.put(BASE_URL + '/subjects/' + id_materia, body, {
        headers: {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}

export function deleteMateria(id_materia) {
    return axios.delete(BASE_URL + '/subjects/' + id_materia, {
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
      });
}

export function getTemasByMateria(id_subject) {
    return axios.get(BASE_URL + '/topics/' + id_subject);
}

export function saveTema(body) {
    return axios.post(BASE_URL + '/topics', body, {
        headers: {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}

export function updateTema(id_tema, body) {
    return axios.put(BASE_URL + '/topics/' + id_tema, body, {
        headers: {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}

export function deleteTema(id_tema) {
    return axios.delete(BASE_URL + '/topics/' + id_tema, {
        headers: {
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}

export function getContenidosByTema(id_topic) {
    return axios.get(BASE_URL + '/contentstopics/' + id_topic);
}

export function saveAllContent(idTopic, nombrePdf, namePdf) {
    const url = BASE_URL + '/contentstopics';

    let formData = new FormData();
    formData.append('pdf', nombrePdf);
    formData.append('textPdf', namePdf);
    formData.append('idTopic', idTopic);

    return axios.post(url, formData, {
        headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token"))}
      });
}

export function editContentPdf(id_content_topic, nombrePdf) {
    const url = BASE_URL + '/contentstopics/pdf/' + id_content_topic;

    let formData = new FormData();
    formData.append('pdf', nombrePdf);

    return axios.put(url, formData, {
        headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token"))}
      });
}

export function editContentText(id_content_topic, body) {
    return axios.put(BASE_URL + '/contentstopics/text/' + id_content_topic, body, {
        headers: {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}

export function deleteContenido(id_content_topic) {
    return axios.delete(BASE_URL + '/contentstopics/' + id_content_topic, {
        headers: {
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}

export function postLogin(body) {
    return axios.post(BASE_URL + '/login/signina', body, {
        headers: {'Content-Type': 'application/json' }
      });
}

export function postRegister(body) {
    return axios.post(BASE_URL + '/login/signup', body, {
        headers: {'Content-Type': 'application/json' }
      });
}

//Seccion Alumnos

export function getTemasAlumnos() {
    return axios.get(BASE_URL + '/studenttopics/all/topics', {
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
        }
    );
}

export function deleteTemaAlumno(id_studenttopic, order) {
    return axios.delete(BASE_URL + '/studenttopics/' + id_studenttopic + '/' + order, {
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
    });
}

export function getContenidosByStudentTopic(id_studenttopic) {
    return axios.get(BASE_URL + '/studenttopics/' + id_studenttopic + '/topic', {
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
        }
    );
}

export function getUsers() {
    return axios.get(BASE_URL + '/users/', {
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
        }
    );
}

export function saveStudentTopic(body) {
    return axios.post(BASE_URL + '/studenttopics', body, {
        headers: {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}

export function editStudentTopic(id_studenttopic, body) {
    return axios.put(BASE_URL + '/studenttopics/' + id_studenttopic, body, {
        headers: {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}

export function getUsersPrivilegesStudentTopic(id_studenttopic) {
    return axios.get(BASE_URL + '/studenttopics/edit/' + id_studenttopic, {
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
        }
    );
}

export function getUsersStudentContent(id_studenttopic) {
    return axios.get(BASE_URL + '/studentcontents/' + id_studenttopic, {
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
        }
    );
}

export function saveAllStudentContent(idstudenttopics, pdf, textPdf, usersStr) {
    const url = BASE_URL + '/studentcontents';

    let formData = new FormData();
    formData.append('pdf', pdf);
    formData.append('textPdf', textPdf);
    formData.append('idstudenttopics', idstudenttopics);
    formData.append('usersStr', usersStr);

    return axios.post(url, formData, {
        headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token"))}
      });
}

export function editStudentContentPdf(id_studentcontent, pdf) {
    const url = BASE_URL + '/studentcontents/pdf/' + id_studentcontent;

    let formData = new FormData();
    formData.append('pdf', pdf);

    return axios.put(url, formData, {
        headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("token"))}
      });
}

export function editStudentContentTextUsers(id_studentcontent, body) {
    return axios.put(BASE_URL + '/studentcontents/textpdfusers/' + id_studentcontent, body, {
        headers: {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}

export function deleteStudentContent(id_studentcontent,order, id_studenttopic) {
    return axios.delete(BASE_URL + '/studentcontents/' + id_studentcontent + '/' + order + '/' + id_studenttopic, {
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
    });
}

export function getUsersPrivilegesStudentContent(id_studentcontent,id_studenttopic) {
    return axios.get(BASE_URL + '/studentcontents/' +id_studentcontent + '/privileges/' + id_studenttopic, {
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
        }
    );
}

export function deleteUser(id_user) {
    return axios.delete(BASE_URL + '/users/' + id_user, {
        headers: {
            'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
    });
}

export function editUser(id_user, body) {
    return axios.put(BASE_URL + '/users/' + id_user, body, {
        headers: {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}

export function changeOrderStudentTopic(body) {
    return axios.put(BASE_URL + '/studenttopics/alltopics/changeorder', body, {
        headers: {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}

export function changeOrderStudentContent(body) {
    return axios.put(BASE_URL + '/studentcontents/allcontents/changeorder', body, {
        headers: {'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))}
      });
}