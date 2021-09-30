import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './portfel-component.css';
import { PortfelApi }  from '../store/api';
import { PortfelState } from '../reducers/portfel';

import moment from "moment";
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import '@grapecity/wijmo.styles/wijmo.css';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import * as wjInput from '@grapecity/wijmo.react.input';
import * as wjGrid from '@grapecity/wijmo.grid';
import * as wjChart from '@grapecity/wijmo.chart';
import * as wjRange from '@grapecity/wijmo.chart.interaction';
import * as wjcGridXlsx from '@grapecity/wijmo.grid.xlsx';

import { FlexChart, FlexChartLegend, FlexChartAxis, FlexChartSeries  } from '@grapecity/wijmo.react.chart';
import { FlexChartAnimation } from '@grapecity/wijmo.react.chart.animation';
import { SortDescription } from "@grapecity/wijmo";
import { FlexChartRangeSelector } from '@grapecity/wijmo.react.chart.interaction';
import { DataChangeAction } from '@grapecity/wijmo.grid.immutable';
import { ImmutabilityProvider } from '@grapecity/wijmo.react.grid.immutable';

import { ReactComponent as BeamSVG } from '../assets/svg/beam.svg';
import { ReactComponent as PrevSVG } from '../assets/svg/arrow_prev.svg';
import { ReactComponent as NextSVG } from '../assets/svg/arrow_next.svg';
import { ReactComponent as RefreshSVG } from '../assets/svg/refresh.svg';
import { ReactComponent as ExcelSVG } from '../assets/svg/excel.svg';
import { ReactComponent as SplitSVG } from '../assets/svg/split.svg';
import { ReactComponent as RecountSVG } from '../assets/svg/recount.svg';
import { ReactComponent as AddSVG } from '../assets/svg/add.svg';
import GrafikElementu from '../models/GrafikElementu';
import ObiektPortfela from '../models/ObiektPortfela';

let gridObjects: wjGrid.FlexGrid; 
let gridElements: wjGrid.FlexGrid; 
let chart: wjChart.FlexChart;
let chartRangeSelector!: wjChart.FlexChart;
let graphic: [number[]] = [[]];
let header: [string[]] = [[]];

export const PortfelComponent: React.FC = () => {  
  const [dataOd, setDataOd] = useState(new Date());
  const [dataDo, setDataDo] = useState(new Date());
 
  const portfel: PortfelState = useSelector(state => state.portfel);
  const dispatch = useDispatch();
       
  useEffect(() => {
    dispatch(PortfelApi.dajPortfel(32));
  }, [dispatch]);

  useEffect(() => {
    if(!portfel.isLoading && portfel.data !== undefined && portfel.data?.mpObiektyPortfelas?.length === 0){      
      dispatch(PortfelApi.dajListeObiektowPortfela(portfel.data.id));      
    }
  }, [portfel.isLoading])

  useEffect(() => {
    if(portfel.selectedObject > -1){ 
      const row = portfel.data?.mpObiektyPortfelas[portfel.selectedObject] as ObiektPortfela;
      fillFlexGridGraphic(row);
    }
  }, [portfel.selectedObject])
  

  function onDateFromChange(date: Date) {
    if(dataOd !== date){     
       setDataOd((a) => a = date);
      if(dataDo < date){ 
        setDataDo((a) => a = date); 
      }
    }
  }
  function onDateToChange(date: Date) {
    if(dataDo !== date){
      setDataDo((a) => a = date);
      if(dataOd > date){ 
        setDataOd((a) => a = date); 
      }
    }
  }  
  function onButtonChangeDate(count: number): void {
    setDataOd((a) => a = new Date(dataOd.getTime() + count * 86400000));
    setDataDo((a) => a =new Date(dataDo.getTime() + count * 86400000));
  }

  function onFlexInitializedObjects(e: wjGrid.FlexGrid) {
    gridObjects = e;
  }
  function onFlexInitializedElements(e: wjGrid.FlexGrid) {
    gridElements = e;
  }
  function rangeChanged(e: wjRange.RangeSelector) {
    chart.axisX.min = e.min;
    chart.axisX.max = e.max;
  }
  function onChartRangeSelectorInitialized(e: wjChart.FlexChart) {
    chartRangeSelector = e;
  }
  function onChartInitialized(e: wjChart.FlexChart) {
    chart = e;
  }  
  function formatItemElements(s: wjGrid.FlexGrid, e: wjGrid.FormatItemEventArgs) {
    if (e.panel.cellType === wjGrid.CellType.Cell && e.col > 1) {
      e.cell.textContent = graphic[e.row][e.col - 2]?.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    } else if(e.panel.cellType === wjGrid.CellType.ColumnHeader && e.col > 1) {
      e.cell.textContent = header[e.row][e.col - 2];
    }
  }
  function onSelectionChange(e: wjGrid.FlexGrid) {  
    const rowSelected = e.selectedItems[0] as ObiektPortfela;    
    if(rowSelected !== undefined){
      fillFlexGridGraphic(rowSelected);
    }     
  }

  function onGridDataChanged(s: any, e: any) {
    switch (e.action) {
        case DataChangeAction.Add:
            var a = 'aa';
            break;
        case DataChangeAction.Remove:
            var a = 'aa';
            break;
        case DataChangeAction.Change:
            var a = 'aa';
            break;
        default:
            throw 'Unknown data action';
    }
  }

  function fillFlexGridObject(){
    if(gridObjects === undefined 
      || portfel.data === undefined 
      || portfel.data.mpObiektyPortfelas?.length === 0) { return; }

    const elements = portfel.data.mpObiektyPortfelas as ObiektPortfela[];

    if(elements === undefined 
      || elements.length === 0) { return; }

    gridObjects.rows.splice(0, gridObjects.rows.length);
    gridObjects.columnHeaders.rows.splice(0, gridObjects.columnHeaders.rows.length);  
    
    const column = new wjGrid.Column();
    column.cssClass = "headerCol";
    column.allowMerging = true;
    column.isReadOnly = true;
    column.width = '*';
    column.dataType = 1;
    column.format = "";          
    gridObjects.columns.push(column);

    //dodawanie wierszy
    for(let i = 0; i < elements.length; i++){
      const newRow = new wjGrid.GroupRow();      
      newRow.cssClassAll = "dataRow";
      newRow.isReadOnly = false;
      newRow.level = elements[i].poziom;
      newRow.dataItem = elements[i];
      gridObjects.rows.push(newRow);       
    }

    var headerHoursRow = new wjGrid.Row();
    headerHoursRow.allowMerging = true;
    var panel = gridObjects.columnHeaders;   
    panel.rows.splice(0, 0, headerHoursRow);    
    panel.setCellData(0, 0,  'Struktura portfela');

    let row = 0;
    elements.forEach(element => {
      gridObjects.cells.setCellData(row, 0,  element.nazwaWlasna);
      row++;
    })
  }

  function fillFlexGridGraphic(rowSelected: ObiektPortfela | undefined){ 
    if(rowSelected === undefined){
      if(portfel.data !== undefined){
        dispatch(PortfelApi.dajListeElementowPortfela(0, portfel.data?.id, 306, dataOd, dataDo)); 
      }
    } else {
      if(gridElements === undefined 
        || portfel.data === undefined 
        || portfel.data.mpObiektyPortfelas?.length === 0) { return; }

      const elements = portfel.data.mpObiektyPortfelas[0].mpElementyPortfelas;

      if(elements === undefined 
        || elements.length === 0) { return; }

      gridElements.rows.splice(0, gridElements.rows.length);
      gridElements.columnHeaders.rows.splice(0, gridElements.columnHeaders.rows.length);

      //dodawanie wierszy
      for(let i = 0; i < elements.length; i++){
          const newRow = new wjGrid.GroupRow();
          newRow.cssClassAll = "dataRow";
          newRow.isReadOnly = false;
          newRow.level = elements[i].poziom;
          gridElements.rows.push(newRow);       
      }
    
      let row = 0;
      let isHeader = true;    
      graphic.splice(0, graphic.length);
      header.splice(0, header.length);
      elements.forEach(element => {
        if(isHeader){
          let newHeaderDays: string[] = [];
          let newHeaderHours: string[] = [];
          let dateFrom = moment(dataOd.toISOString().slice(0, 10)).add(60, 'minute');
          let dateTo = moment(dataDo.toISOString().slice(0, 10)).add(1, 'day');

          while(dateFrom < dateTo){
            newHeaderDays.push(dateFrom.format('DD MMMM YYYY'));
            newHeaderHours.push(dateFrom.format('HH'));
            dateFrom = dateFrom.add(60, 'minute');
          }        

          gridElements.columns.splice(0, gridElements.columns.length);

          //dodawanie kolumn
          let columnCount = 2 + newHeaderDays.length;
          for(let i = 0; i < columnCount; i++){          
            const column = new wjGrid.Column();
            column.allowMerging = true;
            column.isReadOnly = true;
            column.dataType = 2;
            column.format = "n3"
            column.width = 80;
            if(i === 0){
              column.cssClass = "headerCol";
              column.minWidth = 250;
              column.dataType = 1;
              column.format = "";
            } else if (i === 1) {
              column.isReadOnly = false;
              column.cssClass = "headerRow";    
              column.dataType = 3;  
              column.format = "";          
            }
            gridElements.columns.push(column);
          }
          
          //dodawanie nagłówków
          var headerHoursRow = new wjGrid.Row();
          headerHoursRow.allowMerging = true;
          headerHoursRow.cssClass = "headerRow";
          var headerDayRow = new wjGrid.Row();
          headerDayRow.cssClass = "headerRow";
          var panel = gridElements.columnHeaders;
          panel.rows.splice(0, 0, headerDayRow);
          panel.rows.splice(0, 0, headerHoursRow);        
          panel.setCellData(0, 0,  'Obiekt/Wielkość');
          panel.setCellData(1, 0,  'Obiekt/Wielkość');
          panel.setCellData(0, 1,  'Wykres');
          panel.setCellData(1, 1,  'Wykres');
          header.push(newHeaderDays);
          header.push(newHeaderHours);     
          isHeader = false; 
        }

        if(element?.element?.mpGafikiElementows !== undefined){
          gridElements.cells.setCellData(row, 0,  element.nazwaWlasna);
          gridElements.cells.setCellData(row, 1,  element.naWykresie ?? false);
          graphic.push(element.element.mpGafikiElementows.map((item) => item.wartosc ?? 0));
        }
        row++;
      });
      
      refreshChart();
    }
  }


  function refreshChart() {
    if(portfel.data === undefined) { return; }

    chart.series.splice(0, chart.series.length);
    chartRangeSelector.series.splice(0, chartRangeSelector.series.length);  
    
    const elements = portfel.data.mpObiektyPortfelas[0].mpElementyPortfelas;

    elements.forEach(element => {
      if(element.naWykresie){
        const grafik: GrafikElementu[] = [];
        for(let i = 0; i < element.element.mpGafikiElementows.length; i++){
          grafik.push({ elementId: element.element.mpGafikiElementows[i].elementId,
            uDtczas: element.element.mpGafikiElementows[i].uDtczas,
            wartosc: element.element.mpGafikiElementows[i].wartosc,
            day: element.element.mpGafikiElementows[i].uDtczas.toString().slice(0, 10),
            hour: element.element.mpGafikiElementows[i].uDtczas.toString().slice(11, 16)
          });
        }       

        var series = new wjChart.Series();
        series.binding = "wartosc";
        series.itemsSource = grafik;
        series.name = element.nazwaWlasna;
        chart.series.push(series);
        chartRangeSelector.series.push(series);
      }
    });
  }  

  function testFillObiekty() {
    if(portfel.data !== undefined){
      dispatch(PortfelApi.dajListeObiektowPortfela(portfel.data?.id))
    }
  }  

  return (
    <div>      
        <div id="toolBar">
          <div id="toolBarL">
            <button onClick={() => dispatch(PortfelApi.dajPortfel(32))}>
              <RefreshSVG height={20} width={20} fill={"#495057"}/>
              <label className="buttonLabel">{"Odśwież"}</label>
            </button>
            <button  onClick={() =>  testFillObiekty()}>
              <ExcelSVG height={20} width={20} fill={"#495057"}/>
              <label className="buttonLabel">{"Eksportuj"}</label>
            </button>
            <button onClick={() => dispatch(PortfelApi.dajListeElementowPortfela(0, 32, 306, dataOd, dataDo))}>
              <SplitSVG height={20} width={20} fill={"#495057"}/>
              <label className="buttonLabel">{"Dopasuj"}</label>
            </button>
            <button onClick={() => fillFlexGridGraphic(undefined)}>
              <RecountSVG height={20} width={20} fill={"#495057"}/>
              <label className="buttonLabel">{"Przelicz"}</label>
            </button>
          </div>
          <div id="toolBarR">
            <button onClick={() => onButtonChangeDate(-1)}>
              <PrevSVG height={20} width={20} fill={"#495057"}/>
            </button>

            <wjInput.InputDate className="inputDate" value={dataOd} valueChanged={(e) => onDateFromChange(e.value)} format={'yyyy-MM-dd'}></wjInput.InputDate>   
            <BeamSVG height={20} width={35} fill={"#495057"}/>
            <wjInput.InputDate className="inputDate" value={dataDo} valueChanged={(e) => onDateToChange(e.value)} format={'yyyy-MM-dd'}></wjInput.InputDate>                  
            
            <button onClick={() => onButtonChangeDate(1)}>
              <NextSVG height={20} width={20} fill={"#495057"}/>
            </button>
          </div>
        </div>
        <div id="workspace">
        <SplitterLayout percentage={true} primaryMinSize={20}  secondaryInitialSize={80}>
            <div className="splitter">
              <FlexGrid isReadOnly={true} 
                        alternatingRowStep={1}
                        showMarquee={false} 
                        headersVisibility="Column" 
                        showSelectedHeaders="All"
                        selectionMode="Row" 
                        initialized={(e) => onFlexInitializedObjects(e)}  
                        selectionChanged={(e) => onSelectionChange(e)}
                        treeIndent={30}>
                        <ImmutabilityProvider itemsSource={portfel.data?.mpObiektyPortfelas} dataChanged={(s, e) => onGridDataChanged(s, e)}/>
                        <FlexGridColumn header="Struktura portfela" binding="nazwaWlasna" minWidth={220} width="*"/>                      
              </FlexGrid> 
            </div>
            <div className="splitter"> 
              <SplitterLayout vertical={true}>
                <div className="splitterB container-fluid">
                  <FlexChart bindingX="hour" chartType="Line" initialized={(e) => onChartInitialized(e)}>
                    <FlexChartLegend position="Bottom"></FlexChartLegend>                       
                    <FlexChartAxis wjProperty="axisX" position="Bottom" labelAngle={0}></FlexChartAxis>   
                    <FlexChartAnimation animationMode="Point"></FlexChartAnimation>
                    <FlexChartSeries binding="wartosc" name="Wartość"></FlexChartSeries>
                  </FlexChart>

                  <FlexChart className="chart-selector" tooltipContent="" bindingX="day" chartType="Line" initialized={(e) => onChartRangeSelectorInitialized(e)}>
                    <FlexChartLegend position="None"></FlexChartLegend>
                    <FlexChartAxis wjProperty="axisX" position="Bottom" labelAngle={0}></FlexChartAxis> 
                    <FlexChartAxis wjProperty="axisY" position="None"></FlexChartAxis>    
                    <FlexChartSeries binding="wartosc" name="Wartość"></FlexChartSeries> 

                    <FlexChartRangeSelector minScale={0.00} maxScale={1} rangeChanged={(e) => rangeChanged(e)}/>
                  </FlexChart>
                </div>
                <div className="splitter">
                  <FlexGrid allowMerging="ColumnHeaders" 
                            alternatingRowStep={1}
                            showMarquee={false} 
                            headersVisibility="Column" 
                            showSelectedHeaders="All"
                            selectionMode="Row"
                            frozenColumns={2}
                            initialized={(e) => onFlexInitializedElements(e)}  
                            formatItem={(s, e) => formatItemElements(s, e)}  
                            treeIndent={30}>  
                  </FlexGrid>  
                </div>    
             </SplitterLayout>        
            </div>
          </SplitterLayout>  
        </div>        
      </div>
  );
}