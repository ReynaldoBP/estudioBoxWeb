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
}