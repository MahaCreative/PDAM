import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import { Add } from "@mui/icons-material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Form from "./Form";
import { Link } from "@inertiajs/react";

export default function SambunganPelanggan(props) {
    const pemasanganBaru = props.pemasanganBaru;
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },

        {
            name: "Kode Pemasangan",
            selector: (row) => row.kode_pemasangan_baru,
            width: "170px",
        },
        {
            name: "Nomor Sambungan",
            selector: (row) => row.no_sambungan,
            width: "170px",
            wrap: true,
        },
        {
            name: "Alamat",
            selector: (row) => row.alamat_pemasangan,
            width: "170px",
            wrap: true,
        },
        {
            name: "Golongan / Kelompok",
            selector: (row) => row.nama_golongan + " / " + row.nama_kelompok,
            width: "170px",
            wrap: true,
        },
        {
            name: "Tanggal Pemasangan",
            selector: (row) => row.tgl_pemasangan,
            width: "170px",
            wrap: true,
        },
        {
            name: "Pipa Diameter",
            selector: (row) => row.pipa_diameter + "Inch",
            width: "170px",
            wrap: true,
        },

        {
            name: "Status Pemasangan",
            selector: (row) => row.status_pemasangan,
            width: "170px",
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-3 items-center">
                    <button className="btn-primary">Lihat Tagihan</button>
                    <Link
                        href={route(
                            "pelanggan.remove-sambungan-pelanggan",
                            row.id
                        )}
                        className="btn-danger"
                    >
                        Hapus Sambungan
                    </Link>
                </div>
            ),
        },
    ];
    const [modalTambah, setModalTambah] = useState(false);

    return (
        <div className="py-6">
            <Modal
                open={modalTambah}
                setOpen={setModalTambah}
                title={"Penambahan Meteran Saya"}
            >
                <Form />
            </Modal>

            <div className="flex justify-between">
                <p>Sambungan Meteran Saya</p>
                <button
                    onClick={() => setModalTambah(true)}
                    className="btn-primary flex gap-x-1 items-center"
                >
                    <p>
                        <Add color="inerit" fontSize="inherit" />
                    </p>
                    <p>Tambah</p>
                </button>
            </div>
            <div>
                <DataTable
                    highlightOnHover
                    striped
                    dense
                    data={pemasanganBaru}
                    columns={columns}
                />
            </div>
        </div>
    );
}
SambunganPelanggan.layout = (page) => (
    <AdminLayout children={page} title={"Sambungan pelanggan"} />
);
