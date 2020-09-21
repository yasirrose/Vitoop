import UserService from "../services/User/UserService";

export default {
    fetchCurrentUser({ commit })  {
        let userService = new UserService();
        userService.getCurrentUser()
            .then((response) => {
                commit("setUser", response);
            })
            .catch((error => {
                commit("setUser", null);
            }))
    }
}