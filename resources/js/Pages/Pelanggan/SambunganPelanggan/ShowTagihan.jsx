import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function ShowTagihan({ id }) {
    const [model, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `api/get-tagihan-by-meteran/${id}`
                );
                const result = await response.json();
                setData(result); // Bungkus data dalam array
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: (
                <div>
                    <p>Periode Tagihan</p>
                </div>
            ),
            selector: (row) => <div>{row.periode_tagihan}</div>,
        },
        {
            name: (
                <div className="">
                    <p>Total Pemakaian</p>
                </div>
            ),
            selector: (row) => (
                <div className="">
                    <p>{row.total_pemakaian + "m3"}</p>
                </div>
            ),
        },
        {
            name: (
                <div className="">
                    <p>Status Tunggakan</p>
                </div>
            ),
            selector: (row) => (
                <div className="">
                    <p>{row.status_tunggakan}</p>
                </div>
            ),
        },
        {
            name: (
                <div className="">
                    <p>Status Pembayaran</p>
                </div>
            ),
            selector: (row) => (
                <div className="">
                    <p>{row.status_pembayaran}</p>
                </div>
            ),
        },
        {
            name: "Aksi",
            selector: (row) =>
                row.status_pembayaran !== "di terima" && (
                    <Link
                        as="button"
                        href={route("pelanggan.show-tagihan", row.id)}
                        className="btn-primary  "
                    >
                        Lihat Tagihan
                    </Link>
                ),
            width: "180px",
        },
    ];

    if (!model) {
        // Tampilkan pesan atau loading spinner jika data belum tersedia
        return <p>Loading...</p>;
    }

    return (
        <div>
            <DataTable
                pagination
                data={model}
                columns={columns}
                title="Rincian Penggunaan Air"
            />
        </div>
    );
}
