import Input from "@/Components/Input";
import Select from "@/Components/Select";
import { router, useForm } from "@inertiajs/react";
import { Camera } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function Form({ model, setModel, setOpen }) {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(false);

    const [image, setImage] = useState(null);
    const { data, setData, post, reset, errors } = useForm({
        judul: "",
        foto: "",
        text: "",
    });
    const handleOpenFileInput = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        // Handle the selected file as needed, e.g., upload it, display it, etc.
        setPreview(true);
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
            setData({ ...data, foto: selectedFile });
        }
    };

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ["link", "clean"],
            ],
        },
    };
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    const handleChangeQuill = (content, delta, soure, editor) => {
        setData({ ...data, text: content });
    };

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            judul: model ? model.judul : "",
            foto: model ? model.foto : "",
        });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        if (model) {
            post(route("admin.update-info-pdam"));
        } else {
            post(route("admin.create-info-pdam"));
        }
    };
    return (
        <form className="w-full" onSubmit={submitHandler}>
            <div className="flex gap-3">
                <button className="btn-primary">
                    {model ? "Update" : "Tambah"}
                </button>
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="btn-danger"
                >
                    Cancell
                </button>
            </div>
            <div className="div flex flex-col md:flex-row gap-3 my-3">
                <div className="w-full md:w-[20%]">
                    <div className="flex flex-col gap-4">
                        <Input
                            name="judul"
                            title={"judul"}
                            value={data.judul}
                            errors={errors.judul}
                            onChange={(e) =>
                                setData({ ...data, judul: e.target.value })
                            }
                        />
                    </div>
                    <div className="w-full my-3 flex flex-col items-center justify-center relative">
                        {image ? (
                            <img src={image} className="w-[300px]" />
                        ) : (
                            <img
                                src={`/storage/${
                                    model
                                        ? data.foto
                                        : "Image/preview_image.jpg"
                                }`}
                                alt=""
                            />
                        )}
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
                                <p>Ganti Foto</p>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[70%]">
                    {model && (
                        <button
                            className="btn-primary"
                            type="button"
                            onClick={() => setData("text", model.text)}
                        >
                            Load Text
                        </button>
                    )}
                    <ReactQuill
                        className="h-[100vh] w-[80vw] my-3"
                        theme="snow"
                        name="text"
                        modules={modules}
                        formats={formats}
                        value={data.text}
                        onChange={handleChangeQuill}
                    ></ReactQuill>
                </div>
            </div>
        </form>
    );
}
