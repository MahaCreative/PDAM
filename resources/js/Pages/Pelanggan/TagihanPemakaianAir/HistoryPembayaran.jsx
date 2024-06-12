import Input from "@/Components/Input";
import Select from "@/Components/Select";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { Print, Water } from "@mui/icons-material";
import { debounce } from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function HistoryPembayaran(props) {
    const tagihan = props.tagihan;
    const count = props.count;
    const { auth } = usePage().props;
    const [params, setParams] = useState({
        bulan: moment(new Date()).format("MMMM"),
        tahun: moment(new Date()).format("YYYY"),
        status: "",
        search: "",
    });
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Nomor Meter",
            selector: (row) => (
                <div>
                    <p>No Meter: {row.tagihan.meteran.no_meteran}</p>
                    <p>No Sambungan: {row.tagihan.meteran.no_sambungan}</p>
                </div>
            ),
            width: "190px",
        },

        {
            name: "Periode Tagihan",
            selector: (row) => row.tagihan.periode.periode_tagihan,
            width: "150px",
        },
        {
            name: "Tanggal Pembayaran",
            selector: (row) => moment(row.created_at).format("LL"),
            width: "170px",
        },
        {
            name: "Foto bukti Pembayaran",
            selector: (row) => (
                <a
                    href={"/storage/" + row.foto_bukti_pembayaran}
                    target="_blank"
                >
                    <img
                        src={"/storage/" + row.foto_bukti_pembayaran}
                        alt=""
                        className="w-[70px]"
                    />
                </a>
            ),
        },
        {
            name: "Data Bank PDAM",
            selector: (row) => (
                <div>
                    <p>Bank: {row.bank_pdam}</p>
                    <p>Nama: {row.nama_pdam}</p>
                    <p>Rek: {row.rek_pdam}</p>
                </div>
            ),
            width: "200px",
            wrap: true,
        },
        {
            name: "Data Pengirim",
            selector: (row) => (
                <div>
                    <p>Bank: {row.bank_pengirim}</p>
                    <p>Nama: {row.nama_pengirim}</p>
                    <p>Rek: {row.no_rek_pengirim}</p>
                </div>
            ),
            width: "200px",
            wrap: true,
        },
        {
            name: "Status Pembayaran",
            selector: (row) => <div>{row.status_pembayaran}</div>,
            wrap: true,
        },
        {
            name: "Nama Petugas Konfirmasi",
            selector: (row) => <div>{row.nama_petugas_konfirmasi}</div>,
        },
        auth.roles === "admin"
            ? {
                  name: "Aksi",
                  selector: (row) =>
                      row.status_pembayaran == "menunggu konfirmasi" ? (
                          <div className="flex flex-col gap-1">
                              <Link
                                  as="button"
                                  href={route(
                                      "admin.show-tagihan-bulanan-saya",
                                      row.tagihan_bulanan_id
                                  )}
                                  className="btn-primary"
                              >
                                  Lihat Pembayaran
                              </Link>

                              <button
                                  onClick={() =>
                                      konfirmasi("pembayaran di terima", row.id)
                                  }
                                  className="btn-success"
                              >
                                  Terima Pembayaran
                              </button>
                              <button
                                  onClick={() =>
                                      konfirmasi("pembayaran di tolak", row.id)
                                  }
                                  className="btn-danger"
                              >
                                  Tolak Pembayaran
                              </button>
                          </div>
                      ) : (
                          <Link
                              as="button"
                              href={route(
                                  "admin.show-tagihan-bulanan-saya",
                                  row.tagihan_bulanan_id
                              )}
                              className="btn-primary"
                          >
                              Lihat Pembayaran
                          </Link>
                      ),
              }
            : {
                  name: "Aksi",
                  selector: (row) => (
                      <Link
                          as="button"
                          href={route(
                              "pelanggan.show-tagihan-bulanan-saya",
                              row.tagihan_bulanan_id
                          )}
                          className="btn-primary"
                      >
                          Lihat Pembayaran
                      </Link>
                  ),
              },
    ];
    const konfirmasi = (status, id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title:
                    status == "pembayaran di tolak"
                        ? "Tolak Pembayaran"
                        : "Terima Pembayaran",
                text:
                    status == "pembayaran di tolak"
                        ? "Apakah anda yakin ingin menolak pembayaran ini?"
                        : "Apakah anda yakin ingin menerima pembayaran ini",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText:
                    status == "pembayaran di tolak"
                        ? "Tolak Pembayaran"
                        : "Terima Pembayaran",
                cancelButtonText: "Batalkan",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.post(
                        route("admin.konfirmasi-pembayaran-pelanggan", {
                            status: status,
                            id: id,
                        }),
                        {
                            preserveScroll: true,
                            onSuccess: () => {
                                Swal.fire({
                                    title: "Success",
                                    text: "Berhasil melakukan konfirmasi pembayaran pelanggan",
                                    icon: "success",
                                    showClass: {
                                        popup: `
                                animate__animated
                                animate__fadeInUp
                                animate__faster
                                `,
                                    },
                                    hideClass: {
                                        popup: `
                                    animate__animated
                                    animate__fadeOutDown
                                    animate__faster
                                    `,
                                    },
                                });
                            },
                            onError: () => {
                                Swal.fire({
                                    title: "Error",
                                    text: "Gagal melakukan konfirmasi pembayaran pelanggan",
                                    icon: "error",
                                    showClass: {
                                        popup: `
                                animate__animated
                                animate__fadeInUp
                                animate__faster
                                `,
                                    },
                                    hideClass: {
                                        popup: `
                                    animate__animated
                                    animate__fadeOutDown
                                    animate__faster
                                    `,
                                    },
                                });
                            },
                        }
                    );
                }
            });
    };
    const tahunSekarang = new Date().getFullYear();
    const tahunOptions = [];

    // Membuat opsi tahun dari 10 tahun sebelumnya
    for (let i = tahunSekarang; i > tahunSekarang - 10; i--) {
        tahunOptions.push(
            <option key={i} value={i}>
                {i}
            </option>
        );
    }
    const filterStatus = (status) => {
        setParams({ ...params, status: status });
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.history_pembayaran"), query, {
                preserveScroll: true,
                preserveState: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    const cetakHandler = () => {
        router.get(route("admin.cetak-history_pembayaran"), params);
    };

    return (
        <div className="py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3">
                <div
                    onClick={() => filterStatus("pembayaran di terima")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-xl md:text-3xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold">
                            {count.diterima}
                        </p>
                        <p className="text-xs md:text-sm lg:text-xl font-light capitalize">
                            Pembayaran Diterima
                        </p>
                        <p className="text-xs md:text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => filterStatus("pembayaran di ditolak")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-xl md:text-3xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold">
                            {count.ditolak}
                        </p>
                        <p className="text-xs md:text-sm lg:text-xl font-light capitalize">
                            Pembayaran Ditolak
                        </p>
                        <p className="text-xs md:text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => filterStatus("menunggu konfirmasi")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-xl md:text-3xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold">
                            {count.menunggu}
                        </p>
                        <p className="text-xs md:text-sm lg:text-xl font-light capitalize">
                            Menunggu Konfirmasi
                        </p>
                        <p className="text-xs md:text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => filterStatus("pembayaran di ditolak")}
                    className="flex hover:cursor-pointer lightBackground darkBackground text-white justify-between items-center gap-3 rounded-md py-2 px-3 border-none"
                >
                    <div className="font-bold text-xl md:text-3xl lg:text-7xl">
                        <Water color="inherit" fontSize="inherit" />
                    </div>
                    <div className="text-right leading-relaxed">
                        <p className="text-xl md:text-2xl lg:text-3xl font-bold">
                            {count.all}
                        </p>
                        <p className="text-xs md:text-sm lg:text-xl font-light capitalize">
                            History Pembayaran
                        </p>
                        <p className="text-xs md:text-sm font-light capitalize">
                            Lihat Detail
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center gap-3">
                <div className="flex gap-3">
                    <button onClick={cetakHandler} className="flex gap-3">
                        <p className="leading-none btn-success">
                            <Print color="inherit" />
                        </p>
                    </button>
                </div>
                <div className="w-2/3 flex gap-3">
                    <Input
                        placeholder="Cari"
                        onChange={(e) =>
                            setParams({ ...params, cari: e.target.value })
                        }
                    />
                    <Select
                        classname={"capitalize"}
                        onChange={(e) =>
                            setParams({ ...params, bulan: e.target.value })
                        }
                    >
                        <option value="">Pilih Bulan Periode</option>
                        <option value="Januari">Januari</option>
                        <option value="Februari">Februari</option>
                        <option value="Maret">Maret</option>
                        <option value="April">April</option>
                        <option value="Mei">Mei</option>
                        <option value="Juni">Juni</option>
                        <option value="Juli">Juli</option>
                        <option value="Agustus">Agustus</option>
                        <option value="September">September</option>
                        <option value="Oktober">Oktober</option>
                        <option value="November">November</option>
                        <option value="Desember">Desember</option>
                    </Select>
                    <Select
                        classname={"capitalize"}
                        onChange={(e) =>
                            setParams({ ...params, tahun: e.target.value })
                        }
                    >
                        <option value="">Pilih Tahun Periode</option>
                        {tahunOptions}
                    </Select>
                </div>
            </div>
            <div className="py-1 px-2 shadow-sm shadow-gray-500/50 rounded-md">
                <DataTable data={tagihan} columns={columns} />
            </div>
        </div>
    );
}

HistoryPembayaran.layout = (page) => (
    <AdminLayout children={page} title={"History Pembayaran Tagihan Bulanan"} />
);
