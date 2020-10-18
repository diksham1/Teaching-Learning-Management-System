const base = 'http://localhost:8080'

const ROUTES = {
    'student': {
        'dashboard': '/dashboard',
        'class'    : '/class'
    },
    'teachers' :{
        'dashboard' : '/dashboard2',
        'class'     : '/class2'
    },
    'api' :{
        'get' : {
            'login': base + '/v1/login'
        },
        'post' : {
            'users': base + '/v1/users'
        }
    }
}

export default ROUTES;
