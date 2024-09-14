import AddNodeMenu from "./AddNodeButton";
import ImportFileButton from "./ImportFileButton"

function PanelParent() {
    return <div className="flex flex-col gap-4">
        <AddNodeMenu/>
        <ImportFileButton/>
    </div>
}

export default PanelParent;