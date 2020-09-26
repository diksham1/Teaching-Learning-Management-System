const base = 'http://localhost:8080'

const ROUTES = {
    'student': {
        'dashboard': '/dashboard'
    },
    'api' :{
        'get' : {
            'login': base + '/v1/login'
        }
    }
}

export default ROUTES;
