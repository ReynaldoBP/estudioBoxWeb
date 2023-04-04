import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
    { value: "1", path: '/dashboard/dashboard1', title: 'Dashboard', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    /*{
        value: "0", path: '', title: 'Mantenimientos', icon: 'ft-edit', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-success float-right mr-1 mt-1', isExternalLink: false, submenu: [
            { value: "3", path: '/tables/restaurante', title: 'Restaurantes', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "4", path: '/tables/sucursal', title: 'Sucursales', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "5", path: '/tables/tipocomida', title: 'Tipos de Comida', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "6", path: '/tables/encuesta', title: 'Encuestas', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "7", path: '/tables/promocion', title: 'Promociones', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "8", path: '/tables/publicidad', title: 'Publicidad', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "20", path: '/tables/influencer', title: 'Influencer', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "21", path: '/tables/banner', title: 'Banner', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "22", path: '/tables/bitacora', title: 'Bitacora', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "25", path: '/tables/cupon', title: 'Cupón', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "26", path: '/tables/centroComercial', title: 'Centro Comercial', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "27", path: '/tables/clienteMovil', title: 'Usuario Móvil', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        value: "0", path: '', title: 'Promoción', icon: 'ft-lock', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-success float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            { value: "28", path: '/tables/redimirCupon', title: 'Redimir Cupón', icon: 'ft-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "9", path: '/tables/clientes', title: 'Redimir', icon: 'ft-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "23", path: '/tables/puntosEstadistica', title: 'Reportes', icon: 'ft-bar-chart-2', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },*/
    { value: "5", path: '/tables/publicaciones', title: 'Data Encuestas', icon: 'ft-camera', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    {
        value: "0", path: '', title: 'Estadística', icon: 'ft-bar-chart-2', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-success float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            { value: "2", path: '/charts/encuesta', title: 'Encuesta', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "3", path: '/charts/preguntas', title: 'Preguntas', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "4", path: '/charts/ipn', title: 'IPN', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            /*{ value: "13", path: '/charts/publicaciones', title: 'Publicaciones', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "16", path: '/charts/compara-restaurante', title: 'Industria', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "17", path: '/charts/publicidades', title: 'Publicidad', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "24", path: '/charts/registros', title: 'Registros', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            */
        ]
    },
    /*{
        value: "0", path: '', title: 'Seguridad', icon: 'ft-lock', class: 'has-sub', badge: '', badgeClass: 'badge badge-pill badge-success float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            { value: "18", path: '/tables/usuario', title: 'Usuarios', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { value: "19", path: '/tables/permisos', title: 'Permisos', icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },*/
];
