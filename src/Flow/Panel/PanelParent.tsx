import { Link } from "@tanstack/react-router";
import AddNodeMenu from "./AddNodeButton";
import ImportFileButton from "./ImportFileButton"
import { ArrowLeft } from "lucide-react";


function PanelParent() {
    return <div className="flex flex-col gap-4 h-screen justify-between">
        <Link to="/dashboard">
            <div className="bg-secondary rounded-lg p-3 hover:bg-neutral-600"> <ArrowLeft className="h-4 w-4 " /></div>
        </Link>

        <div className="flex flex-col justify-end mb-8 gap-4">
            <AddNodeMenu />
            <ImportFileButton />
        </div>

    </div>
}

export default PanelParent;