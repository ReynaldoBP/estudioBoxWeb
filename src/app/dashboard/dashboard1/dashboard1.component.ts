import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";
import { RestauranteService } from 'app/_services/restaurante.service';
import { ClienteService } from 'app/_services/cliente.service';
import { EncuestaService } from 'app/_services/encuesta.service';
import { SucursalService } from 'app/_services/sucursal.service';
import { EmpresaService } from 'app/_services/empresa.service';
import { ChartsService } from 'app/_services/charts.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
declare var require: any;

const data: any = require('../../shared/data/chartist.json');

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}


@Component({
    selector: 'app-dashboard1',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component implements OnInit {
    objParametrosEmpresa: any = {
        strEstado: "ACTIVO",
        strContador: "SI"
    }
    date: any = new Date();
    intTotalEmpresas: string
    totalClientes: string
    totalPublicaciones: string
    monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    totalEncuestasMensual: any
    totalEncuestaSemanal: any
    redSocialMensual: any
    clientesGeneroMensual: any
    clientesEdadMensual: any
    encuestaActual: any = {
        id: '',
        titulo: '',
        cantidad: ''
    }
    parametros: any = {
        fechaInicio: '',
        fechaFin: '',
    }
    // Line area chart configuration Starts
    lineArea: Chart = {
        type: 'Line',
        data: data['lineAreaDashboard'],
        options: {
            low: 0,
            showArea: true,
            fullWidth: true,
            onlyInteger: true,
            axisY: {
                low: 0,
                scaleMinSpace: 50,
            },
            axisX: {
                showGrid: false
            }
        },
        events: {
            created(data: any): void {
                var defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'gradient',
                    x1: 0,
                    y1: 1,
                    x2: 1,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(0, 201, 255, 1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(146, 254, 157, 1)'
                });

                defs.elem('linearGradient', {
                    id: 'gradient1',
                    x1: 0,
                    y1: 1,
                    x2: 1,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(132, 60, 247, 1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(56, 184, 242, 1)'
                });
            },

        },
    };
    // Line area chart configuration Ends

    // Stacked Bar chart configuration Starts
    Stackbarchart: Chart = {
        type: 'Bar',
        data: {
            labels: [],
            series: [[], []]
        },
        options: {
            stackBars: true,
            fullWidth: true,
            axisX: {
                showGrid: false,
            },
            axisY: {
                showGrid: false,
                showLabel: false,
                offset: 0
            },
            chartPadding: 30
        },
        events: {
            created(data: any): void {
                var defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'linear',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgba(0, 201, 255,1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgba(17,228,183, 1)'
                });
            },
            draw(data: any): void {
                if (data.type === 'bar') {
                    data.element.attr({
                        style: 'stroke-width: 5px',
                        x1: data.x1 + 0.001
                    });

                }

            }
        },
    };

    EdadesChart: Chart = {
        type: 'Bar',
        data: {
            labels: [
            ],
            series: [
                [
                ],
                [
                ]
            ]
        },
        options: {
            stackBars: true,
            fullWidth: true,
            axisX: {
                showGrid: false,
            },
            axisY: {
                showGrid: false,
                showLabel: false,
                offset: 0
            },
            chartPadding: 60
        },
        events: {
            created(data: any): void {
                var defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'gradient2',
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-color': 'rgb(255, 133, 51)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-color': 'rgb(204, 0, 0)'
                });
            },
            draw(data: any): void {
                if (data.type === 'bar') {
                    data.element.attr({
                        style: 'stroke-width: 15px',
                        x1: data.x1 + 0.001
                    });

                }
                else if (data.type === 'label') {
                    data.element.attr({
                        y: 240
                    })
                }

            }
        },
    };
    // Stacked Bar chart configuration Ends

    // Line area chart 2 configuration Starts
    lineArea2: Chart = {
        type: 'Line',
        data: data['lineArea2'],
        options: {
            showArea: true,
            fullWidth: true,
            lineSmooth: Chartist.Interpolation.none(),
            axisX: {
                showGrid: false,
            },
            axisY: {
                low: 0,
                scaleMinSpace: 50,
            }
        },
        responsiveOptions: [
            ['screen and (max-width: 640px) and (min-width: 381px)', {
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 2 === 0 ? value : null;
                    }
                }
            }],
            ['screen and (max-width: 380px)', {
                axisX: {
                    labelInterpolationFnc: function (value, index) {
                        return index % 3 === 0 ? value : null;
                    }
                }
            }]
        ],
        events: {
            created(data: any): void {
                var defs = data.svg.elem('defs');
                defs.elem('linearGradient', {
                    id: 'gradient2',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0,
                    'stop-opacity': '0.2',
                    'stop-color': 'rgba(255, 255, 255, 1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-opacity': '0.2',
                    'stop-color': 'rgba(0, 201, 255, 1)'
                });

                defs.elem('linearGradient', {
                    id: 'gradient3',
                    x1: 0,
                    y1: 1,
                    x2: 0,
                    y2: 0
                }).elem('stop', {
                    offset: 0.3,
                    'stop-opacity': '0.2',
                    'stop-color': 'rgba(255, 255, 255, 1)'
                }).parent().elem('stop', {
                    offset: 1,
                    'stop-opacity': '0.2',
                    'stop-color': 'rgba(132, 60, 247, 1)'
                });
            },
            draw(data: any): void {
                var circleRadius = 4;
                if (data.type === 'point') {

                    var circle = new Chartist.Svg('circle', {
                        cx: data.x,
                        cy: data.y,
                        r: circleRadius,
                        class: 'ct-point-circle'
                    });
                    data.element.replace(circle);
                }
                else if (data.type === 'label') {
                    // adjust label position for rotation
                    const dX = data.width / 2 + (30 - data.width)
                    data.element.attr({ x: data.element.attr('x') - dX })
                }
            }
        },
    };
    // Line area chart 2 configuration Ends

    // Line chart configuration Starts
    lineChart: Chart = {
        type: 'Line', data: data['LineDashboard'],
        options: {
            axisX: {
                showGrid: false
            },
            axisY: {
                showGrid: false,
                showLabel: false,
                low: 0,
                high: 100,
                offset: 0,
            },
            fullWidth: true,
            offset: 0,
        },
        events: {
            draw(data: any): void {
                var circleRadius = 4;
                if (data.type === 'point') {
                    var circle = new Chartist.Svg('circle', {
                        cx: data.x,
                        cy: data.y,
                        r: circleRadius,
                        class: 'ct-point-circle'
                    });

                    data.element.replace(circle);
                }
                else if (data.type === 'label') {
                    // adjust label position for rotation
                    const dX = data.width / 2 + (30 - data.width)
                    data.element.attr({ x: data.element.attr('x') - dX })
                }
            }
        },

    };
    // Line chart configuration Ends

    // Donut chart configuration Starts
    DonutChart: Chart = {
        type: 'Pie',
        data: {
            series: [
                {
                    name: "done",
                    className: "ct-done",
                    value: 23
                },
                {
                    name: "progress",
                    className: "ct-progress",
                    value: 14
                },
                {
                    name: "progress",
                    className: "ct-progress",
                    value: 14
                }
            ],
            labels: [3, 2, 1],
        },
        options: {
            donut: true,
            startAngle: 0,
            showAllTooltips: true,
            legend: {
                position: 'left',
                placement: 'outside'
            },
        }
    };
    // Donut chart configuration Ends

    //  Bar chart configuration Starts
    BarChart: Chart = {
        type: 'Bar', data: {
            labels: [],
            series: [
                []
            ]
        }, options: {
            axisX: {
                showGrid: false,
            },
            axisY: {
                showGrid: false,
                showLabel: false,
                offset: 0
            },
            low: 0,
            high: 60, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        },
        responsiveOptions: [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ]

    };
    // Bar chart configuration Ends

    // line chart configuration Starts
    WidgetlineChart: Chart = {
        type: 'Line', data: data['WidgetlineChart'],
        options: {
            axisX: {
                showGrid: true,
                showLabel: false,
                offset: 0,
            },
            axisY: {
                showGrid: false,
                low: 40,
                showLabel: false,
                offset: 0,
            },
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            fullWidth: true,
        },
    };
    // Line chart configuration Ends

    permisos: any
    acciones: any
    totalAlcance: any
    nivelSatisfaccion: any = 0
    user: any
    objSelectRestaurante: any = null
    listRestaurante: any
    intAnioEncuestas: number = this.date.getFullYear()
    intMesEncuestas: number = this.date.getMonth() + 1
    arrayMonthNames = [
        { anio: "Enero", numanio: 1 },
        { anio: "Febrero", numanio: 2 },
        { anio: "Marzo", numanio: 3 },
        { anio: "Abril", numanio: 4 },
        { anio: "Mayo", numanio: 5 },
        { anio: "Junio", numanio: 6 },
        { anio: "Julio", numanio: 7 },
        { anio: "Agosto", numanio: 8 },
        { anio: "Septiembre", numanio: 9 },
        { anio: "Octubre", numanio: 10 },
        { anio: "Noviembre", numanio: 11 },
        { anio: "Diciembre", numanio: 12 }
    ];
    constructor(private sucursalService: SucursalService,
        private objEmpresaService: EmpresaService,
        private clienteService: ClienteService,
        private encuestaService: EncuestaService,
        private chartsService: ChartsService,
        private restauranteService: RestauranteService,
        private toastr: ToastrService) {
        this.getPermisos("Dashboard")
        this.user = JSON.parse(localStorage.getItem('usuario'))
    }
    ngOnInit() {
        this.getDashboard(this.objSelectRestaurante)
    }
    getDashboard(objSelectRestaurante) {
        if (this.getAccion('VER')) {
            let intMesFiltro = (this.intMesEncuestas != undefined) ? this.intMesEncuestas : (this.date.getMonth() + 1).toString()
            let intAnioFiltro = (this.intAnioEncuestas != undefined) ? this.intAnioEncuestas : this.date.getFullYear().toString()
            /*this.getTotalClientes()
            this.getTotalEncuestaActiva()
            this.getTotalEncuestaMensual()
            this.getTotalEncuestaSemanal()
            this.getRedSocialMensual(intMesFiltro, intAnioFiltro)
            this.getClientesGeneroMensual(intMesFiltro, intAnioFiltro)
            this.getClientesEdadMensual(intMesFiltro, intAnioFiltro)*/
            if (this.user.strTipoRol == "ADMINISTRADOR") {
                //this.getRestaurantes()
                console.log("entro");
                this.getTotalEmpresas()

            }
            else {
                this.parametros.fechaInicio = (new Date(Date.now() - (30 * 24 * 60 * 60 * 1000))).toISOString().slice(0, 10);
                this.parametros.fechaFin = (new Date(Date.now())).toISOString().slice(0, 10);
                //this.getPreguntasEncuestaActiva()
            }
        }
    }
    getWeek() {
        let firstDayOfYear: any = new Date(this.date.getFullYear(), 0, 1);
        let pastDaysOfYear = (this.date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    getPermisos(descModulo: string) {
        this.permisos = JSON.parse(localStorage.getItem('permisos'))
        this.acciones = this.permisos.filter(item => item['DESCRIPCION_MODULO'] == descModulo)
    }

    getAccion(descAccion: string) {
        return (this.acciones.find(item => item['DESCRIPCION_ACCION'] == descAccion) != undefined)
    }
    getTotalEmpresas() {
        //Para la proxima listar todas las sucursales si no soy admin
        /*if (this.objSelectRestaurante != null) {
            this.sucursalService.getSucursalByIdRestaurante(this.objSelectRestaurante)
                .subscribe(
                    data => {
                        if (data['status'] == 200) {
                            this.intTotalEmpresas = data['resultado']['cantidad']
                        } else {
                            this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                        }
                    },
                    error => {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                )
        }
        else {*/
        this.objEmpresaService.getEmpresa(this.objParametrosEmpresa)
            .subscribe(
                data => {
                    if (data['intStatus'] != 200) {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    } else {
                        this.intTotalEmpresas = data['arrayEmpresa'][0]['intCantidad']
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
        //}
    }

    getTotalClientes() {
        this.clienteService.getTotalClientes(this.user.ID_USUARIO)
            .subscribe(
                data => {
                    if (data['resultado']['cantidad'] != null && data['resultado']['cantidad'] != '') {
                        this.totalClientes = data['resultado']['cantidad']
                    }
                    else {
                        this.totalClientes = '0'
                    }

                },
                error => {

                }
            )
    }

    getTotalEncuestaActiva() {
        let intMesFiltro = (this.intMesEncuestas != undefined) ? this.intMesEncuestas : (this.date.getMonth() + 1).toString()
        let intAnioFiltro = (this.intAnioEncuestas != undefined) ? this.intAnioEncuestas : this.date.getFullYear().toString()
        this.encuestaService.getTotalEncuestaActiva(intMesFiltro, intAnioFiltro, this.user.ID_USUARIO, this.objSelectRestaurante)
            .subscribe(
                data => {
                    if (data['status'] == 200) {
                        this.encuestaActual.id = data['resultado']['resultados'][0].ENCUESTA_ID
                        this.encuestaActual.titulo = data['resultado']['resultados'][0].TITULO
                        this.encuestaActual.cantidad = data['resultado']['resultados'][0].CANTIDAD
                    } else {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    getTotalEncuestaMensual() {
        this.encuestaService.getTotalEncuestaMensual(this.user.ID_USUARIO, this.objSelectRestaurante)
            .subscribe(
                data => {
                    if (data['status'] == 200) {
                        this.totalEncuestasMensual = data['resultado']['resultados']
                        if (this.totalEncuestasMensual != null && this.totalEncuestasMensual != '') {
                            let maxValue = this.totalEncuestasMensual.reduce(function (prev, current) {
                                return (Number.parseInt(prev.CANTIDAD) > Number.parseInt(current.CANTIDAD)) ? prev : current
                            })
                            this.Stackbarchart.data = {
                                labels:
                                    this.totalEncuestasMensual.map(item => item.CANTIDAD + "\n \n" + this.monthNames[item.MES - 1]),
                                series: [this.totalEncuestasMensual.map(item => item.CANTIDAD), this.totalEncuestasMensual.map(item => maxValue.CANTIDAD - item.CANTIDAD)
                                ]
                            }
                        }
                    } else {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    getTotalEncuestaSemanal() {
        this.encuestaService.getTotalEncuestaSemanal(this.user.ID_USUARIO, this.objSelectRestaurante)
            .subscribe(
                data => {
                    if (data['status'] == 200) {
                        this.totalEncuestaSemanal = data['resultado']['resultados']
                    } else {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    getRedSocialMensual(mes: string, anio: string) {
        this.encuestaService.getRedesSocialMensual(mes, anio, this.user.ID_USUARIO, this.objSelectRestaurante)
            .subscribe(
                data => {
                    if (data['status'] == 200) {
                        this.redSocialMensual = data['resultado']['resultados']
                        let sumRedes = this.redSocialMensual.filter(item => item.DESCRIPCION != 'NO COMPARTIDO').map(element => Number.parseInt(element.CANTIDAD))
                            .reduce(function (prev, current) {
                                return Number.parseInt(prev) + Number.parseInt(current)
                            })
                        this.totalAlcance = this.redSocialMensual.filter(item => item.DESCRIPCION != 'NO COMPARTIDO').map(element => {
                            switch (element.DESCRIPCION) {
                                case 'INSTAGRAM':
                                    return Number.parseInt(element.CANTIDAD) * 150
                                case 'FACEBOOK':
                                    return Number.parseInt(element.CANTIDAD) * 100
                                case 'TWITTER':
                                    return Number.parseInt(element.CANTIDAD) * 200
                            }
                        }
                        )
                            .reduce(function (prev, current) {
                                return Number.parseInt(prev) + Number.parseInt(current)
                            })
                        this.totalPublicaciones = sumRedes
                        this.BarChart.data = {
                            labels: ['', '', ''],//this.redSocialMensual.filter(item => item.DESCRIPCION != 'NO COMPARTIDO').map(element => element.DESCRIPCION),
                            series: [[
                                this.redSocialMensual.filter(item => item.DESCRIPCION == 'INSTAGRAM')
                                    .map(element => (Number.parseInt(element.CANTIDAD) * 100 / sumRedes))
                                    .reduce(function (prev, current) {
                                        return Number.parseInt(prev) + Number.parseInt(current)
                                    }),
                                this.redSocialMensual.filter(item => item.DESCRIPCION == 'FACEBOOK')
                                    .map(element => (Number.parseInt(element.CANTIDAD) * 100 / sumRedes))
                                    .reduce(function (prev, current) {
                                        return Number.parseInt(prev) + Number.parseInt(current)
                                    }),
                                this.redSocialMensual.filter(item => item.DESCRIPCION == 'TWITTER')
                                    .map(element => (Number.parseInt(element.CANTIDAD) * 100 / sumRedes))
                                    .reduce(function (prev, current) {
                                        return Number.parseInt(prev) + Number.parseInt(current)
                                    }),
                            ]]
                        }
                    } else {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    getClientesGeneroMensual(mes: string, anio: string) {
        this.encuestaService.getClienteGenero(mes, anio, this.user.ID_USUARIO, this.objSelectRestaurante)
            .subscribe(
                data => {
                    if (data['status'] == 200) {
                        this.clientesGeneroMensual = data['resultado']['resultados']
                        this.DonutChart.data = {
                            series: [
                                {
                                    name: "Masculino",
                                    className: "ct-done",
                                    value: this.clientesGeneroMensual.filter(item => item.GENERO == 'MASCULINO')
                                        .map(element => Number.parseInt(element.CANTIDAD))
                                        .reduce(function (prev, current) {
                                            return (prev + current)
                                        }, 0)
                                },
                                {
                                    name: "Femenino",
                                    className: "ct-progress",
                                    value: this.clientesGeneroMensual.filter(item => item.GENERO == 'FEMENINO')
                                        .map(element => Number.parseInt(element.CANTIDAD))
                                        .reduce(function (prev, current) {
                                            return (prev + current)
                                        }, 0)
                                },
                                {
                                    name: "Sin Genero",
                                    className: "ct-outstanding",
                                    value: this.clientesGeneroMensual.filter(item => item.GENERO == 'SIN GENERO')
                                        .map(element => Number.parseInt(element.CANTIDAD))
                                        .reduce(function (prev, current) {
                                            return (prev + current)
                                        }, 0)
                                }
                            ],
                            labels: [
                                (((this.clientesGeneroMensual.filter(item => item.GENERO == 'MASCULINO')
                                    .map(element => Number.parseInt(element.CANTIDAD))
                                    .reduce(function (prev, current) {
                                        return (prev + current)
                                    }, 0)) / (this.clientesGeneroMensual.map(element => Number.parseInt(element.CANTIDAD))
                                        .reduce(function (prev, current) {
                                            return (prev + current)
                                        }, 0))) * 100).toFixed(2) + "%",
                                (((this.clientesGeneroMensual.filter(item => item.GENERO == 'FEMENINO')
                                    .map(element => Number.parseInt(element.CANTIDAD))
                                    .reduce(function (prev, current) {
                                        return (prev + current)
                                    }, 0)) / (this.clientesGeneroMensual.map(element => Number.parseInt(element.CANTIDAD))
                                        .reduce(function (prev, current) {
                                            return (prev + current)
                                        }, 0))) * 100).toFixed(2) + "%",

                                (this.clientesGeneroMensual.filter(item => item.GENERO == 'SIN GENERO')
                                    .map(element => Number.parseInt(element.CANTIDAD))
                                    .reduce(function (prev, current) {
                                        return (prev + current)
                                    }, 0)) != 0 ?

                                    (((this.clientesGeneroMensual.filter(item => item.GENERO == 'SIN GENERO')
                                        .map(element => Number.parseInt(element.CANTIDAD))
                                        .reduce(function (prev, current) {
                                            return (prev + current)
                                        }, 0)) / (this.clientesGeneroMensual.map(element => Number.parseInt(element.CANTIDAD))
                                            .reduce(function (prev, current) {
                                                return (prev + current)
                                            }, 0))) * 100).toFixed(2) + "%" : "0%",
                            ],
                        }
                    } else {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    getClientesEdadMensual(mes: string, anio: string) {
        this.encuestaService.getClienteEdad(mes, anio, this.user.ID_USUARIO, this.objSelectRestaurante)
            .subscribe(
                data => {
                    if (data['status'] == 200) {
                        if (data['resultado']['resultados'] != null && data['resultado']['resultados'] != '') {
                            this.clientesEdadMensual = data['resultado']['resultados']
                            let maxValue = this.clientesEdadMensual.reduce(function (prev, current) {
                                return (Number.parseInt(prev.CANTIDAD) > Number.parseInt(current.CANTIDAD)) ? prev : current
                            })

                            let labels: any[] = []
                            this.clientesEdadMensual.forEach(element => {
                                labels.push(element['GENERACION'])
                            });

                            this.EdadesChart.data = {
                                labels: labels,
                                series: [
                                    this.clientesEdadMensual.map(item => item.CANTIDAD),
                                    this.clientesEdadMensual.map(item => maxValue.CANTIDAD - item.CANTIDAD)
                                ]
                            }
                        }
                    } else {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    getPreguntasEncuestaActiva() {
        this.chartsService.getPreguntasEncuestaActiva(this.parametros, this.user.ID_USUARIO)
            .subscribe(
                data => {
                    if (data['resultado']['resultados'] != null && data['resultado']['resultados'] != '') {
                        let resultados = data['resultado']['resultados']
                        this.nivelSatisfaccion = resultados.map(element => Number.parseFloat(element.PROMEDIO))
                            .reduce(function (prev, current) {
                                return (prev + current)
                            }, 0)
                        this.nivelSatisfaccion = Math.round(this.nivelSatisfaccion / resultados.length)
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
    getRestaurantes() {
        this.restauranteService.getRestaurantesACTIVOS()
            .subscribe(
                data => {
                    this.listRestaurante = data['resultado']['resultados']
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
}
