import Index from "../components/Vue/components/project/Index.vue";
import AppLexicon from "../components/Vue/components/AppLexicon.vue";
import UserSettings from "../components/Vue/UserSettings/UserSettings.vue";
import UserHome from "../components/Vue/components/UserHome.vue";
import Login from "../components/Vue/components/AppLogin.vue";
import Table from "../components/Vue/components/tables/Table.vue";

export default [
    {
        path: '/userhome',
        component: UserHome
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/:restype',
        component: Table
    },
    {
        path: '/project/:projectId',
        component: Index
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

