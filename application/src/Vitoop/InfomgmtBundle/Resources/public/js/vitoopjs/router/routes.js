import Index from "../components/Vue/components/project/Index.vue";
import AppLexicon from "../components/Vue/components/AppLexicon.vue";
import UserSettings from "../components/Vue/UserSettings/UserSettings.vue";
import UserHome from "../components/Vue/components/UserHome.vue";
import Login from "../components/Vue/components/AppLogin.vue";
import Table from "../components/Vue/components/tables/Table.vue";

export default [
    {
        path: '',
        beforeEnter: (to,from,next) => {
            vitoopState.state.user === null ? next('/login') : next('/userhome');
        }
    },
    {
        path: '/userhome',
        component: UserHome,
    },
    {
        path: '/login',
        component: Login,
        beforeEnter(to,from,next) {
            vitoopState.state.user === null ? next() : next(`${from.path}`);
        }
    },
    {
        path: '/:restype',
        component: Table,
    },
    {
        path: '/project/:projectId',
        component: Index,
        name: 'project'
    },
    {
        path: '/lexicon/:lexiconId',
        component: AppLexicon
    },
    {
        path: '/user/settings',
        component: UserSettings
    }
]

