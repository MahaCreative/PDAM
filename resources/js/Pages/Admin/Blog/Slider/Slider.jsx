import Modal from "@/Components/Modal";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm } from "@inertiajs/react";
import { Camera, Cancel, Check } from "@mui/icons-material";
import React, { useRef, useState } from "react";

export default function Slider(props) {
    const divStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        margin: "0 10px",
        height: "50vh",
    };
    const slider = props.slider;
    const { data, setData, post, reset, errors } = useForm({ foto: "" });
    const [model, setModel] = useState(null);
    const [modalDelete, setModalDelete] = useState(null);
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const handleOpenFileInput = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
            setData({ ...data, foto: selectedFile });
        }
    };
    const submitHandler = () => {
        post(route("admin.create-slider"), { onSuccess: setImage(null) });
    };
    const onDeleteHandler = () => {
        router.post(
            route("admin.delete-slider"),
            { id: model.id },
            {
                onSuccess: () => {
                    setModalDelete(false);
                    setModel(null);
                },
            }
        );
    };
    const deleteHandler = (value) => {
        setModel(value);
        setModalDelete(true);
    };
    return (
        <div className="py-6 px-8">
            <Modal
                open={modalDelete}
                setOpen={setModalDelete}
                title={"Warning"}
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
                                setModalDelete(false);
                                setModel(null);
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
            <div className="flex flex-col md:flex-row">
                <div className="wfull w-[70%]">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {slider.map((item, key) => (
                            <div
                                key={key}
                                className=" w-full h-full group hover:scale-110 transition-all duration-300 ease-in-out mx-3 shadow-md shadow-gray-500/50 rounded-md"
                            >
                                <div
                                    className="relative rounded-lg overflow-hidden h-full"
                                    style={{
                                        ...divStyle,
                                        backgroundImage: `url(/storage/${item.foto})`,
                                    }}
                                >
                                    <button
                                        onClick={() => deleteHandler(item)}
                                        className="btn-danger absolute top-3 right-3"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-[30%] border-l border-blue-600 px-4">
                    <div className="w-full rounded-md overflow-hidden ">
                        <p className="text-xs">
                            Untuk tampilan website yang lebih bagus gunakan
                            gambar berukuran 600 x 500 pixel
                        </p>
                        <div className="w-full h-full relative">
                            <img
                                src={
                                    model
                                        ? "/storage/" + model.foto
                                        : image
                                        ? image
                                        : "/storage/Image/preview_image.jpg"
                                }
                                alt=""
                                className="object-cover w-full "
                            />
                            <div
                                onClick={handleOpenFileInput}
                                className="absolute bottom-2 w-full flex items-center justify-center"
                            >
                                <div className="flex gap-3 bg-blue-600/80 backdrop-blur-sm py-1 px-4 rounded-md font-medium hover:bg-blue-600/80 active:bg-blue-600/80 text-white cursor-pointer">
                                    <p>
                                        <Camera
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    </p>
                                    <p>Tambah Slider</p>
                                </div>
                            </div>
                            {/* Hidden file input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="my-3 flex gap-3">
                            <button
                                onClick={submitHandler}
                                className="btn-primary"
                            >
                                Submit Slider
                            </button>
                            {image && (
                                <button
                                    className="btn-danger"
                                    onClick={() => setImage(null)}
                                >
                                    Cancell
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Slider.layout = (page) => (
    <AdminLayout children={page} title={"Kelola Slider"} />
);
