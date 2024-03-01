import Filter from "@/Components/Filter";
import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Form from "./Form";

export default function PengaduanPelanggan(props) {
    const pengaduan = props.pengaduan;
    const jenisPengaduan = props.jenisPengaduan;
    const [modalTambah, setModalTambah] = useState(false);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Judul",
            selector: (row) => row.judul_pengaduan,
            width: "150px",
            wrap: true,
        },
        {
            name: "Text",
            selector: (row) => row.text,
            width: "120px",
            wrap: true,
        },
        {
            name: "Nomor Handphone",
            selector: (row) => row.nomor_hp,
            width: "140px",
            wrap: true,
        },
        {
            name: "Alamat Pengaduan",
            selector: (row) => row.alamat,
            width: "140px",
            wrap: true,
        },
        {
            name: "Foto Pengaduan",
            selector: (row) =>
                row.foto ? (
                    <a href={"../storage/" + row.foto} target="blank">
                        <img
                            src={"/storage/" + row.foto}
                            className="w-[100px]"
                        />
                    </a>
                ) : (
                    <p>Tidak ada foto</p>
                ),
            width: "140px",
            wrap: true,
        },
        {
            name: "Status Dilihat",
            selector: (row) => row.status_dilihat,
            width: "140px",
            wrap: true,
        },
        {
            name: "Status pengaduan",
            selector: (row) => (
                <p
                    className={`${
                        row.status_pengaduan == "menunggu konfirmasi"
                            ? "bg-orange-500"
                            : row.status_pengaduan == "sedang di proses"
                            ? "bg-blue-500"
                            : row.status_pengaduan == "selesai" && "bg-blue-500"
                    } py-1 px-2 rounded-md text-xs text-white`}
                >
                    {row.status_pengaduan}
                </p>
            ),
            width: "150px",
            wrap: true,
        },
    ];
    return (
        <div className="py-3">
            <Modal
                open={modalTambah}
                setOpen={setModalTambah}
                title={"Tambah Pengaduan"}
            >
                <Form
                    setOpen={setModalTambah}
                    jenisPengaduan={jenisPengaduan}
                />
            </Modal>
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setModalTambah(true)}
                    className="btn-primary"
                >
                    Tambah Pengaduan
                </button>
                <Filter links={route("pelanggan.pengaduan-pelanggan")} />
            </div>
            <DataTable
                dense
                pagination
                highlightOnHover
                data={pengaduan}
                columns={columns}
            />
        </div>
    );
}
PengaduanPelanggan.layout = (page) => (
    <AdminLayout children={page} title={"Pengaduan"} />
);
