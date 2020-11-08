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
            'login': base + '/v1/login',
            'courses' : base + '/v1/courses'
        },
        'get'   : {
            'users' : base + '/v1/users',
            'courses' : base + '/v1/courses',
            'creatorcourses' : base + '/v1/courses/creator'
        },
				'del' : {
						'posts' : base + '/v1/courses/:courseid/posts/:postid'
				}
    }
}

export default ROUTES;
