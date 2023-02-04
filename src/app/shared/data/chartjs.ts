//line chart

export var lineChartData: Array<any> = [

  { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' },
  { data: [45, 25, 16, 36, 67, 18, 76], label: 'My Third dataset - No bezier' }

];
export var lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export var lineChartOptions: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
    mode: 'label'
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'bottom',
  },
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: true,
        labelString: 'Month'
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: true,
        labelString: 'Value'
      }
    }]
  },
  title: {
    display: true,
    text: 'Chart.js Line Chart - Legend'
  }
};
export var lineChartColors: Array<any> = [

  {

    fill: false,
    borderDash: [5, 5],
    borderColor: "#9C27B0",
    pointBorderColor: "#9C27B0",
    pointBackgroundColor: "#FFF",
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
  },
  {

    fill: false,
    borderDash: [5, 5],
    borderColor: "#00A5A8",
    pointBorderColor: "#00A5A8",
    pointBackgroundColor: "#FFF",
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
  },
  {
    lineTension: 0,
    fill: false,
    borderColor: "#FF7D4D",
    pointBorderColor: "#FF7D4D",
    pointBackgroundColor: "#FFF",
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
  },

];
export var lineChartLegend = true;
export var lineChartType = 'line';


//area chart
export var areaChartData: Array<any> = [

  { data: [0, 150, 140, 105, 190, 230, 270], label: 'Series A' },
  { data: [0, 90, 120, 240, 140, 250, 190], label: 'Series B' }

];
export var areaChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export var areaChartOptions: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: true,
        labelString: 'Month'
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        display: true,
        labelString: 'Value'
      }
    }]
  },
};
export var areaChartColors: Array<any> = [


  {

    backgroundColor: 'rgba(255, 141, 96, 0.4)',
    borderColor: 'transparent',
    pointBackgroundColor: '#FFF',
    pointBorderColor: 'rgba(255, 141, 96,1)',
    pointHoverBackgroundColor: 'rgba(255, 141, 96,1)',
    pointRadius: '5',
    pointHoverBorderColor: '#FFF',
    pointHoverRadius: '5',
    pointBorderWidth: '2'
  },
  {

    backgroundColor: 'rgba(0, 157, 160, 0.7)',
    borderColor: 'transparent',
    pointBackgroundColor: '#FFF',
    pointBorderColor: 'rgba(0, 157, 160,1)',
    pointHoverBackgroundColor: 'rgba(0, 157, 160,1)',
    pointRadius: '5',
    pointHoverBorderColor: '#FFF',
    pointHoverRadius: '5',
    pointBorderWidth: '2'
  },

];
export var areaChartLegend = true;
export var areaChartType = 'line';

//scatter chart
export var scatterChartData: Array<any> = [

  {
    data: [
      {
        x: 1,
        y: -1.711e-2,
      }, {
        x: 1.26,
        y: -2.708e-2,
      }, {
        x: 1.58,
        y: -4.285e-2,
      }, {
        x: 2.0,
        y: -6.772e-2,
      }, {
        x: 2.51,
        y: -1.068e-1,
      }, {
        x: 3.16,
        y: -1.681e-1,
      }, {
        x: 3.98,
        y: -2.635e-1,
      }, {
        x: 5.01,
        y: -4.106e-1,
      }, {
        x: 6.31,
        y: -6.339e-1,
      }, {
        x: 7.94,
        y: -9.659e-1,
      }, {
        x: 10.00,
        y: -1.445,
      }, {
        x: 12.6,
        y: -2.110,
      }, {
        x: 15.8,
        y: -2.992,
      }, {
        x: 20.0,
        y: -4.102,
      }, {
        x: 25.1,
        y: -5.429,
      }, {
        x: 31.6,
        y: -6.944,
      }, {
        x: 39.8,
        y: -8.607,
      }, {
        x: 50.1,
        y: -1.038e1,
      }, {
        x: 63.1,
        y: -1.223e1,
      }, {
        x: 79.4,
        y: -1.413e1,
      }, {
        x: 100.00,
        y: -1.607e1,
      }, {
        x: 126,
        y: -1.803e1,
      }, {
        x: 158,
        y: -2e1,
      }, {
        x: 200,
        y: -2.199e1,
      }, {
        x: 251,
        y: -2.398e1,
      }, {
        x: 316,
        y: -2.597e1,
      }, {
        x: 398,
        y: -2.797e1,
      }, {
        x: 501,
        y: -2.996e1,
      }, {
        x: 631,
        y: -3.196e1,
      }, {
        x: 794,
        y: -3.396e1,
      }, {
        x: 1000,
        y: -3.596e1,
      }
    ], label: 'V(node2)'
  }

];
export var scatterChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export var scatterChartOptions: any = {
  animation: {
    duration: 1000, // general animation time
    easing: 'easeOutBack'
  },
  hover: {
    animationDuration: 1000, // duration of animations when hovering an item
  },
  responsiveAnimationDuration: 1000, // animation duration after a resize
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false,
    text: 'Chart.js Scatter Chart - Logarithmic X-Axis'
  },
  scales: {
    xAxes: [{
      type: 'logarithmic',
      position: 'bottom',
      gridLines: {
        zeroLineColor: "rgba(0,0,0,.1)",
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        labelString: 'Frequency',
        display: true,
      }
    }],
    yAxes: [{
      type: 'linear',
      ticks: {
        userCallback: function (tick) {
          return tick.toString() + "dB";
        }
      },
      gridLines: {
        zeroLineColor: "rgba(81,117,224,1)",
        color: "#f3f3f3",
        drawTicks: false,
      },
      scaleLabel: {
        labelString: 'Voltage',
        display: true
      }
    }]
  }
};
export var scatterChartColors: Array<any> = [
  {

    backgroundColor: "rgba(81,117,224,.6)",
    borderColor: "transparent",
    pointBorderColor: "#5175E0",
    pointBackgroundColor: "#FFF",
    pointBorderWidth: 2,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
  }

];
export var scatterChartLegend = true;
export var scatterChartType = 'scatter';

// barChart
export var barChartOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true,
  maintainAspectRatio: false,
  plugins:{
    labels:{
      render: 'value'
    }
  },
  scales: {
    xAxes: [{
        gridLines: {
            display:false
        }
    }],
    yAxes: [{
        gridLines: {
            display:true
        }   
    }]
  }
};

export var barChartOptionsPublicacion: any = {
  scaleShowVerticalLines: false,
  responsive: true,
  maintainAspectRatio: false,
  plugins:{
    labels:{
      render: 'value'
    }
  },
  scales: {
    xAxes: [{
        gridLines: {
            display:false
        }
    }],
    yAxes: [{
        gridLines: {
            display:true
        }   
    }]
  }
};

export var barChartOptionsIPN: any = {
  scaleShowVerticalLines: false,
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  plugins:{
    labels:{
      render: 'value',
    }
  },
  scales: {
    xAxes: [{
        gridLines: {
            display:false
        }
    }],
    yAxes: [{
        gridLines: {
            display:true
        }   
    }]
  }
};

export var barChartOptionsClt: any = {
  scaleShowVerticalLines: false,
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  plugins:{
    labels:{
      render: 'value',
    }
  },
  scales: {
    xAxes: [{
        gridLines: {
            display:false
        }
    }],
    yAxes: [{
        gridLines: {
            display:true
        }   
    }]
  }
};

export var barChartOptionsCompRest: any = {
  scaleShowVerticalLines: false,
  responsive: true,
  maintainAspectRatio: false,
  plugins:{
    labels:{
      render: 'value',
      precision: 2
    }
  }
};

export var barChartLabels: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
export var barChartLabelsPreguntas: string[] = ["Pregunta 1 abcdefghij vbjh dsjfhj ?", 
                                                "Pregunta 2 abcdefghij vbjh dsjfhj ?", 
                                                "Pregunta 3 abcdefghij vbjh dsjfhj ?", 
                                                "Pregunta 4 abcdefghij vbjh dsjfhj ?", 
                                                "Pregunta 5 abcdefghij vbjh dsjfhj ?", 
                                                "Pregunta 6 abcdefghij vbjh dsjfhj ?"
];
export var barChartLabelsIPN: string[] = ["1","2","3","4","5","6","7","8","9","10"];
export var barChartLabelsClt: string[] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
export var barChartType = 'bar';
export var barChartLegend = true;

export var barChartData: any[] = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Encuestas' },
  { data: [28, 48, 40, 19, 86, 27, 100], label: 'Compartidos' }
];

export var barChartDataPreguntas: any[] = [
  { data: [1, 5, 2, 4, 1, 5, 4, 5, 2, 4, 5, 3], label: '5 estrellas' }
];

export var barChartDataPublicacion: any[] = [
  { data: [], label: 'Facebook' },
  { data: [], label: 'Instagram' },
  { data: [], label: 'Twitter' }
];

export var barChartDataIPN: any[] = [
  { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], label: null },
];

export var barChartDataCompRest: any[] = [
  { data: [65, 59, 80, 81, 56, 55, 70, 50, 81, 56, 55, 40], label: 'Mi restaurante' },
  { data: [28, 15, 40, 19, 86, 27, 100, 80, 50, 40, 30, 60], label: 'Otros restaurantes' },
];

export var barChartColors: Array<any> = [
  {
    backgroundColor: 'rgba(255, 141, 96, 0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {
    backgroundColor: 'rgba(0, 157, 160, 0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },

];

export var barChartColorsEncuesta: Array<any> = [
  {
    backgroundColor: 'rgba(0, 157, 160, 0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },

];

export var barChartColorsPublicidad: Array<any> = [
  {
    backgroundColor: 'rgba(244, 67, 54, 0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {
    backgroundColor: 'rgba(63, 81, 181, 0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {
    backgroundColor: 'rgba(0, 150, 136, 0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {
    backgroundColor: 'rgba(205, 220, 57, 0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {
    backgroundColor: 'rgba(255, 152, 0, 0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },

];

export var barChartColorsPublicaciones: Array<any> = [
  {
    backgroundColor: 'rgba(0, 61, 153,0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {
    backgroundColor: 'rgba(219, 53, 137,0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {
    backgroundColor: 'rgba(0, 172, 237,0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },

];

export var barChartColorsCompRest: Array<any> = [
  {
    backgroundColor: 'rgba(0, 191, 105,0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  {
    backgroundColor: 'rgba(0, 137, 191,0.8)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
];

export var barChartColorsIPN: Array<any> = [
  {
    backgroundColor: [
      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',      
      'rgba(251, 176, 64, 0.8)',
      'rgba(251, 176, 64, 0.8)',
      'rgba(50, 168, 84, 0.8)',
      'rgba(50, 168, 84, 0.8)'
    ],
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
];

export var barChartColorsClt: Array<any> = [
  {
    backgroundColor: [
      'rgba(50, 168, 84, 0.8)',
      'rgba(50, 168, 84, 0.8)',
      'rgba(50, 168, 84, 0.8)',
      'rgba(50, 168, 84, 0.8)',
      'rgba(50, 168, 84, 0.8)',

      'rgba(251, 176, 64, 0.8)',
      'rgba(251, 176, 64, 0.8)',
      'rgba(251, 176, 64, 0.8)',
      'rgba(251, 176, 64, 0.8)',
      'rgba(251, 176, 64, 0.8)',

      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',

      'rgba(50, 168, 84, 0.8)',
      'rgba(50, 168, 84, 0.8)',
      'rgba(50, 168, 84, 0.8)',
      'rgba(50, 168, 84, 0.8)',
      'rgba(50, 168, 84, 0.8)',

      'rgba(251, 176, 64, 0.8)',
      'rgba(251, 176, 64, 0.8)',
      'rgba(251, 176, 64, 0.8)',
      'rgba(251, 176, 64, 0.8)',
      'rgba(251, 176, 64, 0.8)',

      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',
      'rgba(181, 18, 27, 0.8)',
    ],
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }
];

// Doughnut
export var doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
export var doughnutChartLabelsIPN: string[] = ['Detractores', 'Pasivos', 'Promotores'];
export var doughnutChartData: number[] = [10, 40, 50];
export var doughnutChartColors: any[] = [{ backgroundColor: ["rgba(181, 18, 27, 0.8)", "rgba(251, 176, 64, 0.8)", "rgba(50, 168, 84, 0.8)"] }];
export var doughnutChartType = 'doughnut';
export var doughnutChartOptions: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    labels: {
      render: 'percentage',
      fontColor: ['white', 'black', 'black'],
      precision: 2
    }
  }
};

//MEDIA DONA
export var doughnutChartLabelsLIKES: string[] = ['Me gusta', 'No me gusta'];
export var doughnutChartDataLIKES: number[] = [75, 25];
export var doughnutChartColorsLIKES: any[] = [{ backgroundColor: ["rgba(0, 157, 160, 0.8)", "rgba(255, 141, 96, 0.8)"] }];
export var doughnutChartTypeLIKES = 'doughnut';
export var doughnutChartOptionsLIKES: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    labels: {
      render: 'percentage',
      fontColor: ['white', 'white'],
      precision: 2
    }
  },
  rotation: 1 * Math.PI,
  circumference: 1 * Math.PI
};


// Radar
export var radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

export var radarChartData: any = [
  { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
  { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
];
export var radarChartType = 'radar';
export var radarChartColors: any[] = [
  {
    backgroundColor: ["rgba(255, 141, 96, 0.8)"]
  },
  {
    backgroundColor: ["rgba(0, 157, 160, 0.8)"]
  }
];
export var radarChartOptions: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false
};


// Pie
export var pieChartLabels: string[] = ['Me gusta', 'No me gusta'];
export var pieChartData: number[] = [75, 25 ];
export var pieChartType = 'pie';
export var pieChartColors: any[] = [{ backgroundColor: ["rgba(0, 157, 160, 0.8)", "rgba(255, 141, 96, 0.8)"] }];
export var pieChartOptions: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  plugins:{
    labels: {
      render: 'percentage',
      fontColor: ['white', 'white'],
      precision: 2
    }
  }
};

// PolarArea
export var polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
export var polarAreaChartData: number[] = [300, 500, 100, 40, 120];
export var polarAreaLegend = true;
export var ploarChartColors: any[] = [{ backgroundColor: ["rgba(0, 157, 160, 0.8)", "rgba(28, 188, 216, 0.8)", "rgba(255, 141, 96, 0.8)", "rgba(12, 194, 126, 0.8)", "rgba(255, 88, 107, 0.8)"] }];


export var polarAreaChartType = 'polarArea';
export var polarChartOptions: any = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false
};