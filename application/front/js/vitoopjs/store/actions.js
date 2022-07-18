import UserService from "../services/User/UserService";
import NotesService from "../services/NotesService";

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
    },
    async getNotes({ commit }) {
        const key = 'notes';
        const value = await NotesService.get();
        commit('set', { key, value });
    },
    saveNotes({ commit }, notes) {
        const key = 'notes';
        NotesService.save(notes);
        commit('set', { key, value: notes });
    }
}
