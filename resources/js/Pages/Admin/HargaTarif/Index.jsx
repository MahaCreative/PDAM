import AdminLayout from "@/Layouts/AdminLayout";

import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import DataTable from "react-data-table-component";
import {
    Add,
    Cancel,
    Check,
    Delete,
    Edit,
    MonetizationOn,
    Print,
    Water,
} from "@mui/icons-material";
import Modal from "@/Components/Modal";
import Form from "./Form";
import { router } from "@inertiajs/react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function Index(props) {
    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const golonganCount = props.golonganCount;
    const kelompokCount = props.kelompokCount;
    const hargaTarif = props.hargaTarif;
    const [modalTambah, setModalTambah] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [model, setModel] = useState(null);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "60px",
        },

        {
            name: "Golongan",
            selector: (row) => row.golongan.nama,
            sortable: true,
            width: "130px",
        },
        {
            name: "Kelompok",
            selector: (row) => row.kelompok.nama,
            sortable: true,
            width: "110px",
        },
        {
            name: "Tarif 0 - 10 m3",
            selector: (row) => row.tarif1,
            sortable: true,
            width: "170px",
        },
        {
            name: "Tarif 11 - 20 m3",
            selector: (row) => row.tarif2,
            sortable: true,
            width: "170px",
        },
        {
            name: "Tarif 21 - 30 m3",
            selector: (row) => row.tarif3,
            sortable: true,
            width: "170px",
        },
        {
            name: "Tarif > 30 m3",
            selector: (row) => row.tarif4,
            sortable: true,
            width: "150px",
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => editHandler(row)}
                        className="btn-warning flex gap-x-1 items-center"
                    >
                        <p>
                            <Edit color="inerit" fontSize="inherit" />
                        </p>
                        <p>Edit</p>
                    </button>
                    <button
                        onClick={() => deleteHandler(row)}
                        className="btn-danger flex gap-x-1 items-center"
                    >
                        <p>
                            <Delete color="inerit" fontSize="inherit" />
                        </p>
                        <p>Delete</p>
                    </button>
                </div>
            ),
            sortableing: true,
        },
    ];
    const editHandler = (value) => {
        setModel(value);
        setModalEdit(true);
    };
    const deleteHandler = (value) => {
        setModel(value);
        setModalDelete(true);
    };
    const onDeleteHandler = () => {
        router.delete(route("admin.harga-tarif-delete", { id: model.id }), {
            onSuccess: () => {
                setModel(null);
                setModalDelete(false);
            },
        });
    };
    const pieKelompokData = kelompokCount.map((item, key) => ({
        id: key,
        y: item.pemasangan_count,
        label: `${item.nama}  : ${item.pemasangan_count}`, // Menambahkan nilai di tengah "pie"
    }));
    const pieGolonganaData = golonganCount.map((item, key) => ({
        id: key,
        y: item.pemasangan_count,
        label: `${item.nama}  : ${item.pemasangan_count}`, // Menambahkan nilai di tengah "pie"
    }));

    const options = {
        // exportEnabled: true,
        animationEnabled: true,
        theme: "light", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Jumlah Golongan pelanggan",

            fontFamily: "fira",
            fontSize: 16,
            verticalAlign: "top",
            horizontalAlign: "center",
        },
        data: [
            {
                type: "pie",
                startAngle: 75,
                toolTipContent: "{label}: {y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 12,
                indexLabel: "{label} ",
                dataPoints: pieKelompokData,
            },
        ],
        legend: {
            fontFamily: "fira",
            fontWeight: "lighter",
            // fontStyle: "capitalize",
        },
    };
    const optionsGolongan = {
        // exportEnabled: true,
        animationEnabled: true,
        theme: "light", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Jumlah Golongan pelanggan",
            fontFamily: "fira",
            fontSize: 16,
            verticalAlign: "top",
            horizontalAlign: "center",
        },
        data: [
            {
                type: "pie",
                startAngle: 75,
                toolTipContent: "{label}: {y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 12,
                indexLabel: "{label} ",
                dataPoints: pieGolonganaData,
            },
        ],
        legend: {
            fontFamily: "fira",
            fontWeight: "lighter",
            // fontStyle: "capitalize",
        },
    };
    return (
        <div>
            {/* Modals */}
            <Modal
                open={modalTambah}
                setOpen={setModalTambah}
                title={"Penambahan Tarif"}
            >
                <Form setOpen={setModalTambah} />
            </Modal>
            <Modal open={modalEdit} setOpen={setModalEdit} title={"Edit Tarif"}>
                <Form
                    setOpen={setModalEdit}
                    model={model}
                    setModel={setModel}
                />
            </Modal>
            <Modal
                open={modalDelete}
                setOpen={setModalDelete}
                title={"Delete Tarif"}
            >
                <p>Apakah anda yakin ingin menghapus data ini ?</p>

                <div className="flex justify-end">
                    <div className="flex gap-x-3 items-center">
                        <button
                            onClick={onDeleteHandler}
                            className="btn-primary flex gap-x-1 items-center"
                        >
                            <p>
                                <Check color="inerit" fontSize="inherit" />
                            </p>
                            <p>Yakin</p>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setModel(null);
                                setModalDelete(false);
                            }}
                            className="btn-danger flex gap-x-1 items-center"
                        >
                            <p>
                                <Cancel color="inerit" fontSize="inherit" />
                            </p>
                            <p>Batalkan</p>
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="shadow-md shadow-gray-900/20 dark:shadow-white/10 antialiased py-3 m-3 px-3 rounded-md">
                <div
                    className={`grid grid-cols-2 md:grid-cols-3 gap-3 mb-3 mt-3`}
                >
                    <div className="flex lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                        <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                            <Water color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-right leading-relaxed">
                            <p className="text-xl md:text-3xl lg:text-3xl font-bold">
                                {kelompokCount.length}
                            </p>
                            <p className="text-sm md:text-lg lg:text-xl font-light capitalize">
                                Total Kelompok
                            </p>
                        </div>
                    </div>
                    <div className="flex lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                        <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                            <Water color="inherit" fontSize="inherit" />
                        </div>
                        <div className="text-right leading-relaxed">
                            <p className="text-xl md:text-3xl lg:text-3xl font-bold">
                                {golonganCount.length}
                            </p>
                            <p className="text-sm md:text-lg lg:text-xl font-light capitalize">
                                Total Golongan
                            </p>
                        </div>
                    </div>
                    <div className="flex col-span-2 md:col-span-1 lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none">
                        <div className="font-bold text-4xl md:text-6xl lg:text-7xl">
                            <MonetizationOn
                                color="inherit"
                                fontSize="inherit"
                            />
                        </div>
                        <div className="text-right leading-relaxed">
                            <p className="text-xl md:text-3xl lg:text-3xl font-bold">
                                {hargaTarif.length}
                            </p>
                            <p className="text-sm md:text-lg lg:text-xl font-light capitalize">
                                Total Harga Yang Tersedia
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-x-3">
                    <button
                        onClick={() => setModalTambah(true)}
                        className="btn-primary flex gap-x-1 items-center"
                    >
                        <p>
                            <Add color="inerit" fontSize="inherit" />
                        </p>
                        <p>Tambah</p>
                    </button>
                    <button className="btn-warning flex gap-x-1 items-center">
                        <p>
                            <Print color="inerit" fontSize="inherit" />
                        </p>
                        <p>Cetak</p>
                    </button>
                </div>
                <div className="my-2">
                    <DataTable data={hargaTarif} columns={columns} />
                </div>
                <div className="my-3 darkBackground lightBackground bg-blue-500 px-3 py-2 rounded-md text-white">
                    <h1>Grafik Total Pemasangan Kelompok dan Golongan</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                        <div className="rounded-md overflow-hidden shadow-gray-900/20 shadow-md">
                            <CanvasJSChart options={options} />
                        </div>
                        <div className="rounded-md overflow-hidden shadow-gray-900/20 shadow-md">
                            <CanvasJSChart options={optionsGolongan} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <AdminLayout children={page} title={"Harga Tarif"} />;
