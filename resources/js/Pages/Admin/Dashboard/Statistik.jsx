import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import Highcharts from "highcharts";
import { useForm } from "@inertiajs/react";
import moment from "moment";
// Aktifkan modul ekspor
HighchartsExporting(Highcharts);
// Aktifkan modul aksesibilitas jika diperlukan
HighchartsAccessibility(Highcharts);
export default function Statistik(props) {
    const countJenisPengaduan = props.countJenisPengaduan;
    const statPengaduan = props.statPengaduan;
    const stat_total_tagihan = props.stat_total_tagihan;
    const [params, setParams] = useState({
        tahun: moment(new Date()).format("YYYY"),
    });

    const stat_status_pengaduan = props.stat_status_pengaduan;
    const barChart = {
        chart: {
            animation: {
                duration: 500,
            },
            marginRight: 50,
        },
        title: {
            text:
                "Total Pengaduan Berdasarkan Jenis Pengaduan Tahun " +
                params.tahun,
            align: "center",
        },
        subtitle: {
            useHTML: true,
            // text: getSubtitle(),
            floating: true,
            align: "right",
            verticalAlign: "middle",
            y: -80,
            x: -100,
        },

        legend: {
            enabled: false,
        },
        xAxis: {
            type: "category",
        },
        yAxis: {
            opposite: true,
            tickPixelInterval: 150,
            title: {
                text: null,
            },
        },
        plotOptions: {
            series: {
                animation: false,
                groupPadding: 0,
                pointPadding: 0.1,
                borderWidth: 0,
                colorByPoint: true,
                dataSorting: {
                    enabled: true,
                    matchByName: true,
                },
                type: "bar",
                dataLabels: {
                    enabled: true,
                },
            },
        },
        series: [
            {
                type: "bar",
                // name: startYear,
                data: countJenisPengaduan.map((item) => ({
                    name: item.jenis_pengaduan,
                    y: item.pengaduan_count,
                })),
            },
        ],
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 550,
                    },
                    chartOptions: {
                        xAxis: {
                            visible: false,
                        },
                        subtitle: {
                            x: 0,
                        },
                        plotOptions: {
                            series: {
                                dataLabels: [
                                    {
                                        enabled: true,
                                        y: 8,
                                    },
                                    {
                                        enabled: true,
                                        format: "{point.name}",
                                        y: -8,
                                        style: {
                                            fontWeight: "normal",
                                            opacity: 0.7,
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            ],
        },
    };
    const vBarChart = {
        chart: {
            type: "column",
        },
        title: {
            text: "Total Pengaduan Pelanggan Tahun " + params.tahun,
            align: "center",
        },

        xAxis: {
            categories: Object.keys(statPengaduan),
            crosshair: true,
            accessibility: {
                description: "Countries",
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Statistik Pengaduan",
                align: "high",
            },
        },

        plotOptions: {
            column: {
                pointPadding: 0.1,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                },
            },
        },
        series: [
            {
                name: "Jumlah",
                data: Object.values(statPengaduan),
            },
        ],
    };
    const series = [];
    const totalTagihan = [];

    for (const status in stat_total_tagihan) {
        totalTagihan.push({
            name: status,
            data: Object.values(stat_total_tagihan[status]),
        });
    }
    console.log(totalTagihan);

    for (const status in stat_status_pengaduan) {
        series.push({
            name: status,
            data: Object.values(stat_status_pengaduan[status]),
        });
    }
    const chart = {
        chart: {
            type: "column",
        },
        title: {
            text: "Total Pengaduan Pelanggan Tahun " + params.tahun,
            align: "center",
        },

        xAxis: {
            categories: Object.keys(statPengaduan),
            crosshair: true,
            accessibility: {
                description: "Countries",
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Statistik Pengaduan",
                align: "high",
            },
        },

        plotOptions: {
            column: {
                pointPadding: 0.1,
                borderWidth: 0,

                dataLabels: {
                    enabled: true,
                },
            },
        },
        series: series,
    };
    const spline = {
        chart: {
            type: "spline",
        },
        title: {
            text: "Statistik Total Tagihan Tahun " + params.tahun,
        },

        xAxis: {
            categories: [
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
            ],
        },
        yAxis: {
            title: {
                text: "Total Tagihan Pemakaian Air",
            },
        },

        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                },
                enableMouseTracking: false,
            },
        },
        series: totalTagihan,
    };

    return (
        <div className="w-full">
            <div className="py-4 px-2 rounded-md shadow-gray-500 shadow-sm my-3">
                <h3 className="text-center font-bold text-blue-500 my-6">
                    Statistik Jumlah Pengaduan
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="py-1 px-2 rounded-md shadow-gray-500 shadow-sm">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={barChart}
                        />
                    </div>
                    <div className="py-1 px-2 rounded-md shadow-gray-500 shadow-md">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={vBarChart}
                        />
                    </div>
                    <div className="py-1 px-2 rounded-md shadow-gray-500 shadow-md grid-cols-1 md:col-span-2">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={chart}
                        />
                    </div>
                </div>
            </div>
            <div className="py-4 px-2 rounded-md shadow-gray-500 shadow-sm my-3">
                <h3 className="text-center font-bold text-blue-500 my-6">
                    Statistik Total Tagihan
                </h3>
                <div className="py-1 px-2 rounded-md shadow-gray-500 shadow-sm">
                    <HighchartsReact highcharts={Highcharts} options={spline} />
                </div>
            </div>
        </div>
    );
}
