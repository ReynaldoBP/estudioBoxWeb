import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";
import { ClienteService } from 'app/_services/cliente.service';
import { EncuestaService } from 'app/_services/encuesta.service';
import { SucursalService } from 'app/_services/sucursal.service';
import { EmpresaService } from 'app/_services/empresa.service';
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
    totalClientesEdadMensual: number;
    totalBarrasEdades: number;
    contadorBarrasEdades: number;
    porcentajeTotal: number;
    objParametrosEmpresa: any = {
        strEstado: "ACTIVO",
        strContador: "SI"
    }
    objParametrosSucursal: any = {
        strEstado: "ACTIVO",
        strContador: "SI",
        intIdUsuario: ""
    }
    date: any = new Date();
    intTotalEmpresas: string
    intTotalSucursal: string
    totalClientes: string
    totalPublicaciones: string
    monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    totalEncuestasPorArea: any
    totalEncuestasSemestral: any
    totalEncuestaSemanal: any
    clientesGeneroMensual: any
    clientesEdadMensual: any
    objClientesEdadSinGeneracion: any
    intClientesEdadSinGeneracion: any
    intTotalEncuesta: 0
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

    // Stacked Bar chart configuration Starts
    StackbarchartArea: Chart = {
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
            labels: [],
            series: [
                [],
                []
            ]
        },
        options: {
            stackBars: true,
            fullWidth: true,
            seriesBarDistance: 10,
            axisX: {
                showGrid: false,
            },
            axisY: {
                showGrid: false,
                showLabel: true,
                offset: 0
            },
            chartPadding: 60,
        },
        events: {
            created: (data: any) => {
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
            draw: (data: any) => {
                if (data.type === 'bar') {
                    data.element.attr({
                        style: 'stroke-width: 15px',
                        x1: data.x1 + 0.001
                    });
                    this.contadorBarrasEdades++
                    if (this.totalClientesEdadMensual && this.contadorBarrasEdades <= this.totalBarrasEdades) {
                        let percentage = (data.value.y / this.totalClientesEdadMensual * 100).toFixed(2) + '%';
                        data.group.elem('text', {
                            dx: data.x2 - 0, // Ajusta la posición según sea necesario
                            dy: data.y1 - 170, // Ajusta la posición según sea necesario
                            'text-anchor': 'middle',
                            class: 'ct-bar-label'
                        }).text(data.value.y +" = "+percentage);
                    }
                } else if (data.type === 'label') {
                    data.element.attr({
                        y: 240
                    });
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
                    name: "Masculino",
                    className: "ct-done",
                    value: 23
                },
                {
                    name: "Femenino",
                    className: "ct-progress",
                    value: 14
                },
                {
                    name: "Sin Género",
                    className: "ct-outstanding",
                    value: 14
                }
            ],
            labels: ['Masculino', 'Femenino', 'Sin Género'], // Etiquetas descriptivas
        },
        options: {
            donut: true,
            startAngle: 0,
            showAllTooltips: true,
            chartPadding: 30, // Añadir espacio entre gráfico y bordes
            labelOffset: 50,
            labelDirection: 'explode',
            showLabel: true,
            legend: {
                position: 'left',
                placement: 'outside'
            },
        },
        responsiveOptions: [], // Añade opciones responsivas si las tienes
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
    objSelectEmpresa: any = null
    arrayRestaurante: any
    intAnioEncuestas: number = this.date.getFullYear()
    intMesEncuestas: number = this.date.getMonth() + 1
    arrayMonthNames = [
        { strMes: "Enero", intIdMes: 1 },
        { strMes: "Febrero", intIdMes: 2 },
        { strMes: "Marzo", intIdMes: 3 },
        { strMes: "Abril", intIdMes: 4 },
        { strMes: "Mayo", intIdMes: 5 },
        { strMes: "Junio", intIdMes: 6 },
        { strMes: "Julio", intIdMes: 7 },
        { strMes: "Agosto", intIdMes: 8 },
        { strMes: "Septiembre", intIdMes: 9 },
        { strMes: "Octubre", intIdMes: 10 },
        { strMes: "Noviembre", intIdMes: 11 },
        { strMes: "Diciembre", intIdMes: 12 }
    ];
    arrayAnio = [
        { strAnio: "2023", intIdAnio: 2023 },
        { strAnio: "2024", intIdAnio: 2024 },
        { strAnio: "2025", intIdAnio: 2025 },
        { strAnio: "2026", intIdAnio: 2026 },
        { strAnio: "2027", intIdAnio: 2027 }
    ];
    boolMostrarGeneroEdad = "SI";
    objSelectSucursal: any
    intSelectSucursal: any = null
    arraySucursal: any
    arrayParametrosSucursal: any = {
        strEstado: "ACTIVO",
        intIdUsuario: ""
    }
    constructor(private objSucursalService: SucursalService,
        private objEmpresaService: EmpresaService,
        private objClienteService: ClienteService,
        private objEncuestaService: EncuestaService,
        private toastr: ToastrService) {
        this.getPermisos("Dashboard")
        this.user = JSON.parse(localStorage.getItem('usuario'))
    }
    ngOnInit() {
        this.getDashboard(this.objSelectEmpresa)
    }
    getDashboard(objSelectEmpresa) {
        this.boolMostrarGeneroEdad = this.user.intIdUsuario == 14 ? "NO" : "SI"
        if (this.getAccion('VER')) {
            console.log(this.user)
            this.objParametrosSucursal.intIdUsuario = this.user.intIdUsuario
            let intMesFiltro = (this.intMesEncuestas != undefined) ? this.intMesEncuestas : (this.date.getMonth() + 1).toString()
            let intAnioFiltro = (this.intAnioEncuestas != undefined) ? this.intAnioEncuestas : this.date.getFullYear().toString()
            this.getTotalEncuestaMensual()
            this.getTotalEncuestaSemanal()
            this.getTotalEncuestaSemestral()
            this.getTotalEncuestaPorArea()
            this.getTotalCliente()
            this.getTotalClientePorEdad(intMesFiltro, intAnioFiltro)
            this.getPromedioClteGenero()
            if (this.user.strTipoRol == "ADMINISTRADOR") {
                this.getTotalEmpresas()
                this.getEmpresas()
            }
            else if (this.user.strTipoRol == "EMPRESA") {
                this.getTotalSucursal()
                this.getSucursales()
            }
            else {
                this.parametros.fechaInicio = (new Date(Date.now() - (30 * 24 * 60 * 60 * 1000))).toISOString().slice(0, 10);
                this.parametros.fechaFin = (new Date(Date.now())).toISOString().slice(0, 10);
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

    getEmpresas() {
        this.objParametrosEmpresa.strContador = "NO"
        this.objEmpresaService.getEmpresa(this.objParametrosEmpresa)
            .subscribe(
                data => {
                    if (data['intStatus'] != 200) {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    } else {
                        this.arrayRestaurante = data["arrayEmpresa"]
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
    getSucursales() {
        this.arrayParametrosSucursal.intIdUsuario = this.user.intIdUsuario
        this.objSucursalService.getSucursal(this.arrayParametrosSucursal)
            .subscribe(
                data => {
                    this.arraySucursal = data["arraySucursal"]
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }
    getTotalEmpresas() {
        this.objParametrosEmpresa.strContador = "SI"
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
    }

    getTotalSucursal() {
        this.objSucursalService.getSucursal(this.objParametrosSucursal)
            .subscribe(
                data => {
                    if (data['intStatus'] != 200) {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    } else {
                        this.intTotalSucursal = data['arraySucursal'][0]['intCantidad']
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    getTotalCliente() {
        this.objClienteService.getTotalCliente(this.user.intIdUsuario)
            .subscribe(
                data => {
                    if (data["arrayData"][0]["intCantidad"] != null && data["arrayData"][0]["intCantidad"] != "") {
                        this.totalClientes = data["arrayData"][0]["intCantidad"]
                    }
                    else {
                        this.totalClientes = '0'
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    getTotalEncuestaMensual() {
        let intMesFiltro = (this.intMesEncuestas != undefined) ? this.intMesEncuestas : (this.date.getMonth() + 1).toString()
        let intAnioFiltro = (this.intAnioEncuestas != undefined) ? this.intAnioEncuestas : this.date.getFullYear().toString()
        this.objEncuestaService.getTotalEncuestaMensual(intMesFiltro, intAnioFiltro, this.user.intIdUsuario, this.objSelectEmpresa, this.intSelectSucursal)
            .subscribe(
                data => {
                    if (data["intStatus"] == 200) {
                        this.intTotalEncuesta = data["arrayData"][0]["intCantidad"]
                    } else {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    getTotalEncuestaSemestral() {
        this.objEncuestaService.getTotalEncuestaSemestral(this.user.intIdUsuario, this.objSelectEmpresa, this.intSelectSucursal)
            .subscribe(
                data => {
                    if (data["intStatus"] == 200) {
                        this.totalEncuestasSemestral = data['arrayData']
                        if (this.totalEncuestasSemestral != null && this.totalEncuestasSemestral != '') {
                            let maxValue = this.totalEncuestasSemestral.reduce(function (prev, current) {
                                return (Number.parseInt(prev.intCantidad) > Number.parseInt(current.intCantidad)) ? prev : current
                            })
                            this.Stackbarchart.data = {
                                labels:
                                    this.totalEncuestasSemestral.map(item => item.intCantidad + "\n \n" + this.monthNames[item.intMes - 1]),
                                series: [this.totalEncuestasSemestral.map(item => item.intCantidad), this.totalEncuestasSemestral.map(item => maxValue.intCantidad - item.intCantidad)
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

    getTotalEncuestaPorArea() {
        let intMesFiltro = (this.intMesEncuestas != undefined) ? this.intMesEncuestas : (this.date.getMonth() + 1).toString()
        let intAnioFiltro = (this.intAnioEncuestas != undefined) ? this.intAnioEncuestas : this.date.getFullYear().toString()
        this.objEncuestaService.getTotalEncuestaPorArea(intMesFiltro, intAnioFiltro, this.user.intIdUsuario, this.objSelectEmpresa, this.intSelectSucursal)
            .subscribe(
                data => {
                    if (data["intStatus"] == 200) {
                        this.totalEncuestasPorArea = data['arrayData']
                        if (this.totalEncuestasPorArea != null && this.totalEncuestasPorArea != '') {
                            let maxValue = this.totalEncuestasPorArea.reduce(function (prev, current) {
                                return (Number.parseInt(prev.intCantidad) > Number.parseInt(current.intCantidad)) ? prev : current
                            })
                            this.StackbarchartArea.data = {
                                labels:
                                    this.totalEncuestasPorArea.map(item => item.intCantidad + "\n \n" + item.strArea),
                                series: [this.totalEncuestasPorArea.map(item => item.intCantidad), this.totalEncuestasPorArea.map(item => maxValue.intCantidad - item.intCantidad)
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
        this.objEncuestaService.getTotalEncuestaSemanal(this.user.intIdUsuario, this.objSelectEmpresa, this.intSelectSucursal)
            .subscribe(
                data => {
                    if (data['intStatus'] == 200) {
                        this.totalEncuestaSemanal = data['arrayData']
                    } else {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error')
                }
            )
    }

    getPromedioClteGenero() {
        let intMesFiltro = (this.intMesEncuestas != undefined) ? this.intMesEncuestas : (this.date.getMonth() + 1).toString()
        let intAnioFiltro = (this.intAnioEncuestas != undefined) ? this.intAnioEncuestas : this.date.getFullYear().toString()
        this.objEncuestaService.getPromedioClteGenero(intMesFiltro, intAnioFiltro, this.user.intIdUsuario, this.objSelectEmpresa)
            .subscribe(
                data => {
                    if (data["intStatus"] == 200) {
                        this.clientesGeneroMensual = data["arrayData"]
                        this.DonutChart.data = {
                            series: [
                                {
                                    name: "Masculino",
                                    className: "ct-done",
                                    value: this.clientesGeneroMensual.filter(item => item.intGenero == 'MASCULINO')
                                        .map(element => Number.parseInt(element.intCantidad))
                                        .reduce(function (prev, current) {
                                            return (prev + current)
                                        }, 0)
                                },
                                {
                                    name: "Femenino",
                                    className: "ct-progress",
                                    value: this.clientesGeneroMensual.filter(item => item.intGenero == 'FEMENINO')
                                        .map(element => Number.parseInt(element.intCantidad))
                                        .reduce(function (prev, current) {
                                            return (prev + current)
                                        }, 0)
                                },
                                {
                                    name: "Sin Genero",
                                    className: "ct-outstanding",
                                    value: this.clientesGeneroMensual.filter(item => item.intGenero == 'SIN GENERO')
                                        .map(element => Number.parseInt(element.intCantidad))
                                        .reduce(function (prev, current) {
                                            return (prev + current)
                                        }, 0)
                                }
                            ],
                            labels: [
                                (((this.clientesGeneroMensual.filter(item => item.intGenero == 'MASCULINO')
                                    .map(element => Number.parseInt(element.intCantidad))
                                    .reduce(function (prev, current) {
                                        return (prev + current)
                                    }, 0)) / (this.clientesGeneroMensual.map(element => Number.parseInt(element.intCantidad))
                                        .reduce(function (prev, current) {
                                            return (prev + current)
                                        }, 0))) * 100).toFixed(2) + "%",
                                (((this.clientesGeneroMensual.filter(item => item.intGenero == 'FEMENINO')
                                    .map(element => Number.parseInt(element.intCantidad))
                                    .reduce(function (prev, current) {
                                        return (prev + current)
                                    }, 0)) / (this.clientesGeneroMensual.map(element => Number.parseInt(element.intCantidad))
                                        .reduce(function (prev, current) {
                                            return (prev + current)
                                        }, 0))) * 100).toFixed(2) + "%",

                                (this.clientesGeneroMensual.filter(item => item.intGenero == 'SIN GENERO')
                                    .map(element => Number.parseInt(element.intCantidad))
                                    .reduce(function (prev, current) {
                                        return (prev + current)
                                    }, 0)) != 0 ?

                                    (((this.clientesGeneroMensual.filter(item => item.intGenero == 'SIN GENERO')
                                        .map(element => Number.parseInt(element.intCantidad))
                                        .reduce(function (prev, current) {
                                            return (prev + current)
                                        }, 0)) / (this.clientesGeneroMensual.map(element => Number.parseInt(element.intCantidad))
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

    // Guarda el total de clientes
    getTotalClientePorEdad(intMes: string, intAnio: string) {
        this.objClienteService.getTotalClientePorEdad(intMes, intAnio, this.user.intIdUsuario, this.objSelectEmpresa)
            .subscribe(
                data => {
                    if (data["intStatus"] == 200) {
                        if (data["arrayData"] != null && data["arrayData"] != '') {
                            this.objClientesEdadSinGeneracion = data["arrayData"].filter(element => element.strGeneracion == null);
                            this.intClientesEdadSinGeneracion = this.objClientesEdadSinGeneracion[0].intCantidad;
                            this.clientesEdadMensual = data["arrayData"].filter(element => element.strGeneracion !== null);

                            this.totalClientesEdadMensual = this.clientesEdadMensual.reduce((sum, item) => sum + item.intCantidad, 0) + this.intClientesEdadSinGeneracion;
                            this.totalBarrasEdades = data["arrayData"].length - 1
                            this.contadorBarrasEdades = 0
                            this.porcentajeTotal = (this.intClientesEdadSinGeneracion * 100) / this.totalClientesEdadMensual
                            this.porcentajeTotal = Number.parseInt(this.porcentajeTotal.toFixed(2))
                            let maxValue = this.clientesEdadMensual.reduce((prev, current) => {
                                return (Number.parseInt(prev.intCantidad) > Number.parseInt(current.intCantidad)) ? prev : current;
                            });

                            let labels: any[] = [];
                            this.clientesEdadMensual.forEach(element => {
                                labels.push(element['strGeneracion']);
                            });
                            this.EdadesChart.data = {
                                labels: labels,
                                series: [
                                    this.clientesEdadMensual.map(item => item.intCantidad),
                                    this.clientesEdadMensual.map(item => maxValue.intCantidad - item.intCantidad)
                                ]
                            };
                        }
                    } else {
                        this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
                    }
                },
                error => {
                    this.toastr.warning('Hubo un error, por favor comuníquese con el departamento de sistemas.', 'Error');
                }
            )

    }


}
