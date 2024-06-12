import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function FormVisi({ model, setModel }) {
    const { data, setData, post, reset, errors } = useForm({ visi: "" });
    useEffect(() => {
        setData({ ...data, visi: model ? model.visi : "" });
    }, [model]);
    const updateHandler = (e) => {
        e.preventDefault();
        post(route("admin.update-visi"), {
            onSuccess: () => {
                reset("visi");
                setModel(null);
            },
        });
    };
    return (
        <form onSubmit={updateHandler}>
            <TextArea
                title={"Visi"}
                onChange={(e) => setData({ ...data, visi: e.target.value })}
                errors={errors.visi}
                value={data.visi}
            />
            <div className="flex gap-3">
                <button className="btn-primary">
                    {model ? "Update" : "Tambah"}
                </button>
                {model && (
                    <button
                        type="button"
                        onClick={() => {
                            setModel(null);
                            reset("visi");
                        }}
                        className="btn-danger"
                    >
                        Clear
                    </button>
                )}
            </div>
        </form>
    );
}
