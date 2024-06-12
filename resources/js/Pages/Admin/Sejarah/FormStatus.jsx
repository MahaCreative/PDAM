import { useForm } from "@inertiajs/react";
import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function FormStatus({ model, setModel, setOpen }) {
    const { data, setData, post, reset, errors } = useForm({ status: "" });

    const upload = () => {
        console.log("ssss");
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
        setData({ ...data, status: content });
        console.log(data);
    };

    useEffect(() => {
        setData({ ...data, status: model ? model.text : "" });
    }, [model]);
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-status"), {
            onSuccess: () => {
                reset();
                setModel(null);
                setOpen(false);
            },
        });
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="flex gap-3 my-3">
                    <button className="btn-primary">
                        {model ? "Update" : "Tambah"}{" "}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setModel(null);
                            setOpen(false);
                        }}
                        className="btn-danger"
                    >
                        Cancell
                    </button>
                </div>
                <ReactQuill
                    className="h-[100vh] w-[80vw]"
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={data.status}
                    onChange={handleChangeQuill}
                />
            </form>
        </div>
    );
}
