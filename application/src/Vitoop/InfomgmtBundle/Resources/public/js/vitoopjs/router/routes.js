import Index from "../components/Vue/components/project/Index.vue";
import AppLexicon from "../components/Vue/components/AppLexicon.vue";
import UserSettings from "../components/Vue/UserSettings/UserSettings.vue";
import UserHome from "../components/Vue/components/user/UserHome.vue";
import Login from "../components/Vue/components/AppLogin.vue";
import Table from "../components/Vue/components/tables/Table.vue";
import Impressum from "../components/Vue/components/Impressum.vue";
import Tags from "../components/Vue/components/Tags.vue";
import Invite from "../components/Vue/components/Invite.vue";
import EditVitoopBlog from "../components/Vue/components/EditVitoopBlog.vue";
import UserAgreement from "../components/Vue/components/user/UserAgreement.vue";
import UserInvitation from "../components/Vue/components/user/UserInvitation.vue";
import UserRegistrate from "../components/Vue/components/user/UserRegistrate.vue";
import UserDataP from "../components/Vue/components/user/UserDataP.vue";

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
        name: 'userhome'
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        beforeEnter(to,from,next) {
            vitoopState.state.user === null ? next() : next(`${from.path}`);
        }
    },
    {
        path: '/register/:secret',
        component: UserRegistrate,
        name: 'register'
    },
    {
        path: '/invitation/new',
        component: UserInvitation,
        name: 'invitation'
    },
    {
        path: '/conversation',
        component: Table,
        name: 'conversation'
    },
    {
        path: '/prj',
        component: Table,
        name: 'prj'
    },
    {
        path: '/lex',
        component: Table,
        name: 'lex'
    },
    {
        path: '/pdf',
        component: Table,
        name: 'pdf'
    },
    {
        path: '/teli',
        component: Table,
        name: 'teli'
    },
    {
        path: '/book',
        component: Table,
        name: 'book'
    },
    {
        path: '/adr',
        component: Table,
        name: 'adr'
    },
    {
        path: '/link',
        component: Table,
        name: 'link'
    },
    {
        path: '/project/:projectId',
        component: Index,
        name: 'project'
    },
    {
        path: '/lexicon/:lexiconId',
        component: AppLexicon,
        name: 'lexicon'
    },
    {
        path: '/user/settings',
        component: UserSettings,
        name: 'settings'
    },
    {
        path: '/impressum',
        component: Impressum,
        name: 'impressum'
    },
    {
        path: '/tags',
        component: Tags,
        name: 'tags'
    },
    {
        path: '/invite',
        component: Invite,
        name: 'invite'
    },
    {
        path: '/edit-vitoop-blog',
        component: EditVitoopBlog,
        name: 'edit-vitoop-blog'
    },
    {
        path: '/user/agreement',
        component: UserAgreement,
        name: 'user-agreement'
    },
    {
        path: '/user/datap',
        component: UserDataP,
        name: 'user-datap'
    },
]

