import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { useForm } from "@inertiajs/react";
import { Camera } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

export default function FormMisi({ model, setModel }) {
    const { data, setData, post, reset, errors } = useForm({
        misi: "",
        icon: "",
    });
    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            misi: model ? model.misi : "",
            icon: model ? model.icon : "",
        });
    }, [model]);
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleOpenFileInput = () => {
        fileInputRef.current.click();
    };
    console.log(data);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            let reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
            console.log(image);
        }

        // Handle the selected file as needed, e.g., upload it, display it, etc.
        setData({ ...data, icon: selectedFile });
    };
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-misi"), {
            onSuccess: () => {
                reset("misi", "icon");
                setModel(null);
            },
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.create-misi"), {
            onSuccess: () => {
                reset("misi", "icon");
                setModel(null);
            },
        });
    };
    return (
        <form
            onSubmit={model ? updateHandler : submitHandler}
            className="w-full"
        >
            <TextArea
                title={"misi"}
                onChange={(e) => setData({ ...data, misi: e.target.value })}
                errors={errors.misi}
                value={data.misi}
            />
            <div className="w-full h-full relative my-8">
                <img
                    src={image ? image : "/storage/" + data.icon}
                    alt=""
                    className="object-cover w-full previewImage"
                />
                <div
                    onClick={handleOpenFileInput}
                    className={`absolute ${
                        data.icon == "" || image == null ? "top-2" : "bottom-2"
                    } w-full flex items-center justify-center`}
                >
                    <div className="flex gap-3 bg-blue-600/80 backdrop-blur-sm py-1 px-4 rounded-md font-medium hover:bg-blue-600/80 active:bg-blue-600/80 text-white cursor-pointer">
                        <p>
                            <Camera color="inherit" fontSize="inherit" />
                        </p>
                        <p>Ganti Icon</p>
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
            <div className="flex gap-3 mt-16">
                <button className="btn-primary">
                    {model ? "Update Visi" : "Tambah Visi"}
                </button>
                {data.misi !== "" || data.icon !== "" ? (
                    <button
                        type="button"
                        onClick={() => {
                            setModel(null);
                            reset();
                            setImage(null);
                        }}
                        className="btn-danger"
                    >
                        Clear
                    </button>
                ) : (
                    ""
                )}
            </div>
        </form>
    );
}
