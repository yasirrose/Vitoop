export default {
    get() {
        return axios('/api/v1/users/notes').then(({ data }) => data.notes);
    },
    save(notes) {
        return axios.put('/api/v1/users/notes', { notes })
            .then(({ data: { notes } }) => notes);
    }
}
