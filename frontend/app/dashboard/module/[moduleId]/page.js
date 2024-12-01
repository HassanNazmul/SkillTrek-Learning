"use client";

import React from "react";
import { use } from "react";
import TopicList from "@/components/Admin/ModuleCRUD/ModuleList/TopicList";

// Access `params` as a Promise and unwrap it using `use()`
const TopicPage = ({ params }) => {
    const { moduleId } = use(params); // Unwrap `params` using `use()` to get `moduleId`

    return <TopicList moduleId={moduleId} />;
};

export default TopicPage;
