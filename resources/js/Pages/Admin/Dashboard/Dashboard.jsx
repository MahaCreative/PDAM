import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";

export default function Dashboard() {
    return <div>Dasboard Admin</div>;
}
Dashboard.layout = (page) => (
    <AdminLayout children={page} title={"Dashboard"} />
);
