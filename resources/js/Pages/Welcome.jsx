import AdminLayout from "@/Layouts/AdminLayout";
import { Link, Head, usePage } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion, props }) {
    return <></>;
}

Welcome.layout = (page) => <AdminLayout children={page} />;
