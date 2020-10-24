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
        'post' : {
            'users': base + '/v1/users',
            'login': base + '/v1/login'
        },
        'get'   : {
            'users' : base + '/v1/users',
            'courses' : base + '/v1/courses',
            'creatorcourses' : base + '/v1/courses/creator'
        }
    }
}

export default ROUTES;
