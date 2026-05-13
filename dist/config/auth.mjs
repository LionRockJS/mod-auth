export default {
    databaseMap: new Map([
        ['user', 'database/user.sqlite'],
    ]),
    databaseMapName: 'user',
    defaultRoles: ['user'],
    destination: '/account',
    requireActivate: true,
    rootRole: 'root',
    identifiers: [],
    verified: {}
};
