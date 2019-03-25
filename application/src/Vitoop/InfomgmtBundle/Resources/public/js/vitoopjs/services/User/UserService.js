import axios from 'axios';

export default class UserService {
    getCurrentUser() {
        return axios.get(vitoop.baseUrl + 'api/user/me')
            .then(function (response) {
                return response.data;
            });
    }

    deactivateUser(userId) {
        return axios.delete(vitoop.baseUrl + 'api/user/'+ userId)
            .then(function (response) {
                return response.data;
            });
    }

    updateCredentials(userId, credentials) {
        return axios.post(vitoop.baseUrl + 'api/user/'+ userId + '/credentials', credentials)
            .then(function (response) {
                return response.data;
            });
    }
}