import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { dataProvider } from './dataProvider';
import authProvider from './services/authProvider';

//stuck?

const AdminApp = () => (
    <Admin basename="/admin" dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="users" list={ListGuesser} />
    </Admin>
);

export default AdminApp;