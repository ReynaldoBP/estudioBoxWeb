import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import * as html2pdf from 'html2pdf.js';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const PDF_TYPE = 'application/pdf'
const PDF_EXTENSION = '.pdf'

@Injectable()
export class ExcelService {

  constructor() { }
  objFecha = new Date();
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    let strFecha = this.objFecha.getDate() + "-" + (this.objFecha.getMonth() + 1) + "-" + this.objFecha.getFullYear()
    FileSaver.saveAs(data, fileName + "_" + strFecha + EXCEL_EXTENSION);
  }

  public exportAsPdfFile(cols: any, rows: any, fileName: string) {
    let strFecha = this.objFecha.getDate() + "-" + (this.objFecha.getMonth() + 1) + "-" + this.objFecha.getFullYear()
    var doc = new jsPDF()
    doc.autoTable(cols, rows)
    doc.save(fileName + "_" + strFecha + PDF_EXTENSION)
  }

  convertirHtmlaPdf(strHtml) {
    let strNombreReporte = "Reporte"+this.objFecha.getDate() + "-" + (this.objFecha.getMonth() + 1) + "-" + this.objFecha.getFullYear()+PDF_EXTENSION
    const options = {
      margin: 10,
      filename: strNombreReporte,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // Obtén el contenido HTML de la variable
    const content: Element = document.createElement('div');
    content.innerHTML = strHtml;
    // Usa .outputPdf('datauristring') para obtener los datos en formato base64
    html2pdf()
      .from(content)
      .set(options)
      .outputPdf('datauristring')
      .then((dataUri) => {
        // Crea un enlace de descarga
        const link = document.createElement('a');
        link.href = dataUri;
        link.download = options.filename;
        // Agrega el enlace al documento y haz clic en él para iniciar la descarga
        document.body.appendChild(link);
        link.click();
        // Elimina el enlace del documento
        document.body.removeChild(link);
      });
  }

  public exportAsExcelFilePersonalized(json: any[], excelFileName: string): void {
    // Paso 1: Agrupar los datos por el campo 'area'
    const groupedData = json.reduce((groups, item) => {
        const area = item.area;
        if (!groups[area]) {
            groups[area] = [];
        }
        groups[area].push(item);
        return groups;
    }, {});

    // Crear el libro de trabajo de Excel
    const workbook: XLSX.WorkBook = { Sheets: {}, SheetNames: [] };

    // Lista de claves que quieres excluir
    const excludedKeys = ['id', 'sucursal', 'Nombre del socio', 'Quien lo atendió', 'Indíquenos sus comentarios y sugerencias'];

    // Paso 2: Combinar los datos de todas las áreas en una sola hoja sin repetir encabezados
    const combinedData = [];
    let headersAdded = false;

    Object.keys(groupedData).forEach(area => {
        if (!headersAdded) {
            // Filtrar las claves para excluir las no deseadas
            const headerRow = Object.keys(groupedData[area][0]).filter(key => !excludedKeys.includes(key));
            combinedData.push(headerRow); // Agregar encabezados solo una vez
            headersAdded = true;
        }
         // Agregar datos de cada área, excluyendo las claves no deseadas
        groupedData[area].forEach(item => {
            const row = Object.keys(item).filter(key => !excludedKeys.includes(key)).map(key => item[key]);
            combinedData.push(row);
        });
    });

    // Crear la hoja combinada
    const combinedWorksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(combinedData);
    workbook.Sheets['Datos Combinados'] = combinedWorksheet; // Nombre de la hoja combinada
    workbook.SheetNames.push('Datos Combinados');

    // Paso 3: Crear la hoja de Excel con las áreas dispuestas horizontalmente
    const horizontalData = [];
    const areas = Object.keys(groupedData);
    const maxLength = Math.max(...areas.map(area => groupedData[area].length));

    // Preparar los encabezados de la hoja horizontal
    const headers = [];
    areas.forEach(area => {
        headers.push(...Object.keys(groupedData[area][0]).filter(key => !excludedKeys.includes(key))); // Agregar encabezados de cada área
        headers.push(''); // Agregar una columna en blanco entre áreas
    });
    horizontalData.push(headers); // Agregar los encabezados al inicio de la hoja

    // Añadir los datos de cada área de manera horizontal
    for (let i = 0; i < maxLength; i++) {
        const row = [];
        areas.forEach(area => {
            const item = groupedData[area][i];
            if (item) {
                Object.keys(item).filter(key => !excludedKeys.includes(key)).forEach(key => row.push(item[key]));
            } else {
                Object.keys(groupedData[area][0]).filter(key => !excludedKeys.includes(key)).forEach(() => row.push('')); // Rellenar espacios vacíos si no hay datos
            }
            row.push(''); // Agregar una celda en blanco entre bloques de área
        });
        horizontalData.push(row);
    }

    // Crear la hoja horizontal con delimitaciones
    const horizontalWorksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(horizontalData);

    // Aplicar bordes para delimitar las áreas y rotar los encabezados
    this.applyBordersAndStyleToWorksheet(horizontalWorksheet, areas, maxLength + 1, headers.length);

    workbook.Sheets['Resumen Horizontal'] = horizontalWorksheet; // Nombre de la hoja adicional
    workbook.SheetNames.push('Resumen Horizontal');

    // Convertir el libro de trabajo a un buffer
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Guardar el archivo Excel
    this.saveAsExcelFile(excelBuffer, excelFileName);
}

// Método para aplicar bordes a las celdas de la hoja y rotar los encabezados
private applyBordersAndStyleToWorksheet(worksheet: XLSX.WorkSheet, areas: string[], maxLength: number, headerLength: number): void {
    let startColumn = 0;
    areas.forEach(() => {
        for (let R = 0; R <= maxLength; R++) {
            for (let C = startColumn; C < startColumn + headerLength - 1; C++) { // Ajustar para la columna en blanco
                const cellAddress = { c: C, r: R };
                const cellRef = XLSX.utils.encode_cell(cellAddress);
                if (!worksheet[cellRef]) worksheet[cellRef] = {}; // Crear la celda si no existe

                // Establecer estilo para la rotación de texto en encabezados
                if (R === 0) { // Encabezados en la primera fila
                    worksheet[cellRef].s = {
                        alignment: {
                            textRotation: 90, // Rotar texto 90 grados para que sea vertical
                            vertical: 'center',
                            horizontal: 'center'
                        },
                        border: {
                            top: { style: 'medium', color: { rgb: '000000' } },
                            bottom: { style: 'medium', color: { rgb: '000000' } },
                            left: { style: 'medium', color: { rgb: '000000' } },
                            right: { style: 'medium', color: { rgb: '000000' } }
                        }
                    };
                } else {
                    // Establecer bordes normales
                    worksheet[cellRef].s = {
                        border: {
                            top: { style: 'thin', color: { rgb: '000000' } },
                            bottom: { style: 'thin', color: { rgb: '000000' } },
                            left: { style: 'thin', color: { rgb: '000000' } },
                            right: { style: 'thin', color: { rgb: '000000' } }
                        }
                    };
                }
            }
        }
        startColumn += headerLength; // Mover al siguiente bloque de área
    });
}
}