import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export function getMaterias() {
    return axios.get(BASE_URL + '/subjects');
}

export function getTemasByMateria(id_subject) {
    return axios.get(BASE_URL + '/topics/' + id_subject);
}

export function getSubtemasByTema(id_topic) {
    return axios.get(BASE_URL + '/subtopics/' + id_topic);
}

export function getContenidosByTema(id_topic) {
    return axios.get(BASE_URL + '/contentstopics/' + id_topic);
}

export function sendEmail(body) {
    return axios.post(BASE_URL + '/mails', body, {
        headers: { 'Content-Type': 'application/json', 'cache-control': 'no-cache' }
    });
}

export function postLogin(body) {
    return axios.post(BASE_URL + '/login/signin', body, {
        headers: { 'Content-Type': 'application/json', 'cache-control': 'no-cache' }
    });
}

export function getTreeView() {
    return axios.get(BASE_URL + '/treeview');
}

export function getStudentTopics(user) {
    return axios.get(BASE_URL + '/studenttopics/' + user, {
        headers: {
            'Authorization': 'Beraer ' + JSON.parse(localStorage.getItem('token'))
        }
    });
}

export function getStudentContents(user, id_studentTopic) {
    return axios.get(BASE_URL + '/studentcontents/' + id_studentTopic + '/' + user, {
        headers: {
            'Authorization': 'Beraer ' + JSON.parse(localStorage.getItem('token'))
        }
    });

}

export function getForgotPassword(user) {
    return axios.get(BASE_URL + '/login/forgotpassword/' + user);
}

export function insertNewPassword(body, hash) {
    return axios.put(BASE_URL + '/login/forgotpassword', body, {
        headers: {'Content-Type': 'application/json',
        'Authorization' : 'Beraer ' + hash}
      });
}

