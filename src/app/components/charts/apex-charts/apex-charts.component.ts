import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import * as moment from "moment";
import * as dbReport from "data/report.json";
import * as dbContract from "data/contractData.json";

export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	title: ApexTitleSubtitle;
};

@Component({
	selector: 'app-apex-charts',
	templateUrl: './apex-charts.component.html',
	styleUrls: ['./apex-charts.component.css']
})
export class ApexChartsComponent implements OnInit {

	@ViewChild("chart") chart!: ChartComponent;
	public chartOptions: Partial<ChartOptions> | any;

	public report: any;

	constructor() {
		this.initReport();
		this.initChart();
	}

	async ngOnInit(): Promise<void> {
		await this.calculate(dbContract);
		console.log("calculation ended");
	}

	initReport(): void {
		this.report = dbReport;
	}

	initChart(): void {
		this.chartOptions = {
			series: [],
			chart: {
				width: 800,
				height: 250,
				type: "rangeBar"
			},
			plotOptions: {
				bar: {
					horizontal: true,
					barHeight: "80%"
				}
			},
			xaxis: {
				type: "datetime"
			},
			fill: {
				type: "gradient",
				gradient: {
					shade: "light",
					type: "vertical",
					shadeIntensity: 0.25,
					gradientToColors: undefined,
					inverseColors: true,
					opacityFrom: 1,
					opacityTo: 1,
					stops: [50, 0, 100, 100]
				}
			},
			legend: {
				position: "top",
				horizontalAlign: "left"
			}
		};
	}

	calculate(data: any): Promise<void> {
		return new Promise((resolve, reject) => {
			// Calcular días de notice period
			const npStartDate = new Date(data.noticePeriod.startDate);
			const npEndDate = new Date(data.noticePeriod.endDate);
			const npDays = this.getDays(npStartDate, npEndDate);

			// ordena los periodos por fecha de inicio
			data.blockingPeriod.sort((a: any, b: any) => {
				return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
			});

			const labels = data.blockingPeriod.map((x: any) => x.label);
			function onlyUnique(value: any, index: any, self: string | any[]) {
				return self.indexOf(value) === index;
			}

			var unique = labels.filter(onlyUnique);

			unique.map((x: any) => {
				this.chartOptions.series.push(
					{ name: x, data: [] }
				);
			});

			data.blockingPeriod.map((a: any, i: any) => {
				this.chartOptions.series.map((x: any) => {
					if (x.name == a.label) {
						const bpStartDate = new Date(a.startDate);
						const bpEndDate = new Date(a.endDate);
						x.data.push({
							x: "Sparrfrist",
							y: [
								bpStartDate.getTime(),
								bpEndDate.getTime()
							]
						});
					}
				});
			})

			this.divideNoticePeriod(data.noticePeriod, data.blockingPeriod);

			console.log(data);
			setTimeout(() => {
				resolve();
			}, 0);
		});
	}

	getDays(npStartDate: Date, npEndDate: Date): number {
		return (npEndDate.getTime() - npStartDate.getTime()) / 86400000 + 1;
	}
	
	divideNoticePeriod(noticePeriod: any, blockingPeriod: any): any {
		let npStartDate = new Date(noticePeriod.startDate);
		const npEndDate = new Date(noticePeriod.endDate);

		let chartStartdate: any,
				chartEndDate: any,
				daysPassed: number = 0;

		blockingPeriod.map((a: any, i: number) => {
			chartStartdate = npStartDate;
			chartEndDate = npEndDate;
			const startDate = new Date(a.startDate);
			const endDate = new Date(a.endDate);

			if (endDate.getTime() > npStartDate.getTime()) {
				if (endDate.getTime() > npStartDate.getTime()) {
					chartEndDate = startDate;
					npStartDate = endDate;
				}

				daysPassed += (chartEndDate.getTime() - chartStartdate.getTime()) / 86400000;

				const np = this.chartOptions.series.filter((x: any) => x.name == "Notice period")[0];
				if (np == null) {
					this.chartOptions.series.push(
						{
							name: "Notice period",
							data: [
								{
									x: "Sparrfrist",
									y: [
										chartStartdate.getTime(),
										chartEndDate.getTime()
									]
								}
							]
						}
					);
				} else {
					this.chartOptions.series.map((x: any) => {
						if (x.name == "Notice period") {
							x.data.push({
								x: "Sparrfrist",
								y: [
									chartStartdate.getTime(),
									chartEndDate.getTime()
								]
							});
						}
					});
				}
			}
		});

		const firstDate = new Date(blockingPeriod[0].startDate);
		const lastDate = this.getBlockingPeriodLastDate(blockingPeriod);
		const extraDays = this.getDays(firstDate, lastDate)
		const npDays = this.getDays(new Date(noticePeriod.startDate), npEndDate);
		const remainingDays = npDays - daysPassed;
		chartStartdate = lastDate;
		chartEndDate.setDate(lastDate.getDate() + remainingDays);
		
		this.chartOptions.series.map((x: any) => {
			if (x.name == "Notice period") {
				x.data.push({
					x: "Sparrfrist",
					y: [
						chartStartdate.getTime(),
						chartEndDate.getTime()
					]
				});
			}
		});

		return null;
	}

	getBlockingPeriodLastDate(blockingPeriod: any): Date {
		blockingPeriod.sort((a: any, b: any) => {
			return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
		});
		return new Date(blockingPeriod[0].endDate);
	}

}
