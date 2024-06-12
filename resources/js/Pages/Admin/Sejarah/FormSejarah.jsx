import Input from "@/Components/Input";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function FormSejarah({ model, setModel, setOpen }) {
    const { data, setData, post, reset, errors } = useForm({
        tahun: "",
        text: "",
    });
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

    useEffect(() => {
        setData({
            ...data,
            id: model ? model.id : "",
            tahun: model ? model.tahun : "",
            text: model ? model.text : "",
        });
    }, [model]);

    const handleChangeQuill = (content, delta, soure, editor) => {
        setData({ ...data, text: content });
        console.log(data);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        if (model) {
            post(route("admin.update-sejarah"), {});
        } else {
            post(route("admin.create-sejarah"), {});
        }
    };
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="flex gap-3">
                    <Input
                        title={"Tahun"}
                        type="number"
                        value={data.tahun}
                        name="tahun"
                        errors={errors.tahun}
                        onChange={(e) =>
                            setData({ ...data, tahun: e.target.value })
                        }
                    />
                    <div className="flex gap-3 items-center">
                        <button className="btn-primary">
                            {model ? "Update" : "Tambah"}
                        </button>
                        <button className="btn-danger">Canell</button>
                    </div>
                </div>
                <ReactQuill
                    className="h-[100vh] w-[80vw] my-3"
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={data.text}
                    onChange={handleChangeQuill}
                />
            </form>
        </div>
    );
}
