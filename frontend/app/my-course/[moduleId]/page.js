"use client";

import React from "react";
import { use } from "react";
import ModuleTopic from "@/components/Student/ModuleTopic";

// Access `params` as a Promise and unwrap it using `use()`
const ModulePage = ({ params }) => {
    const { moduleId } = use(params); // Unwrap `params` using `use()` to get `moduleId`

    return <ModuleTopic moduleId={moduleId} />;
};

export default ModulePage;
