const base = 'https://localhost:8080'

const ROUTES = {
    'student': {
        'dashboard': '/dashboard'
    },
    'api' :{
        'post' : {
            'login': base + '/v1/login'
        }
    }
}

export default ROUTES;
