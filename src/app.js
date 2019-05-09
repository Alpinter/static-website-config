import './main.scss';

window.onload = () => {

    const routes = [
        {
            path: '/',
            name: 'home'
        },
        {
            path: '/about',
            name: 'about'
        },
        {
            path: '/contact',
            name: 'contact'
        }
    ]

    const showPage = (page) => {
        const activeRoute = document.getElementsByClassName('active');
        Array.prototype.forEach.call(activeRoute, function (route) {
            route.classList.remove('active');
          });
        document.getElementById(page).className += ' active';
    }

    const changeRoute = (event) => {
        const route = event.target.attributes[0].value;
        const routeInfo = routes.filter((r) => r.path === route)[0];

        if (!routeInfo) {
            console.log('not found');
        } else {
            navigate(routeInfo);
        }
    }

    const navigate = (route) => {
        showPage(route.name);
        window.history.pushState(
            {}, 
            route.path,
            window.location.origin + route.path
        );
    }

    const activeRoutes = Array.from(document.querySelectorAll('[route]'));

    activeRoutes.forEach((route) => {
        route.addEventListener('click', changeRoute, false);
    })

    const currentPath = window.location.pathname;
    const route = routes.filter((r) => r.path === currentPath)[0];
    if (route) {
        showPage(route.name);
    } else {
        console.log('not found 404');
    }

    window.onpopstate = (e) => {
        showPage(e.state);
      }
    
}
