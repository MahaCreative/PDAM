import Input from "@/Components/Input";
import Select from "@/Components/Select";
import TextArea from "@/Components/TextArea";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function Form({ setOpen, jenisPengaduan }) {
    const { data, setData, post, reset, errors } = useForm({
        jenis_id: "",
        judul_pengaduan: "",
        text: "",
        foto: "",
        nomor_hp: "",
        alamat: "",
    });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("pelanggan.store-pengaduan-pelanggan"), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    return (
        <div>
            <form onSubmit={submitHandler}>
                <Select
                    onChange={changeHandler}
                    name="jenis_id"
                    errors={errors.jenis_id}
                >
                    <option value="">Pilih Jenis Pengaduan</option>
                    {jenisPengaduan.map((item, key) => (
                        <option value={item.id}>{item.jenis_pengaduan}</option>
                    ))}
                </Select>
                <Input
                    onChange={changeHandler}
                    title={"Judul Pengaduan"}
                    value={data.judul_pengaduan}
                    name="judul_pengaduan"
                    errors={errors.judul_pengaduan}
                />
                <Input
                    onChange={changeHandler}
                    title={"Nomor Handphone Yang dapat di hubungi"}
                    value={data.nomor_hp}
                    name="nomor_hp"
                    errors={errors.nomor_hp}
                />
                <TextArea
                    onChange={changeHandler}
                    title={"Pengaduan"}
                    value={data.text}
                    name="text"
                    errors={errors.text}
                ></TextArea>
                <TextArea
                    onChange={changeHandler}
                    title={"alamat"}
                    value={data.alamat}
                    name="alamat"
                    errors={errors.alamat}
                ></TextArea>
                <Input
                    type="file"
                    onChange={(e) => setData("foto", e.target.files[0])}
                    title={"Foto"}
                    name="foto"
                    errors={errors.foto}
                />
                <div className="flex gap-x-3 my-3">
                    <button className="btn-primary">Tambah Pengaduan</button>
                    <button
                        onClick={() => setOpen(false)}
                        type="button"
                        className="btn-danger"
                    >
                        Cancell
                    </button>
                </div>
            </form>
        </div>
    );
}
