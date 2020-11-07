import axios from 'axios';

export default class UserService {
    getCurrentUser() {
        return axios.get(vitoop.baseUrl + 'api/user/me', {
                maxRedirects: 0
            })
            .then(function (response) {
                if (response.status === 200) {
                    if ('object' === typeof response.data) {
                        return response.data;
                    }
                }

                return null;
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