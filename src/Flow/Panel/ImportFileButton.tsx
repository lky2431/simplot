import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ImportFilePage from "./ImportFilePage";

function ImportFileButton() {
    return (

        <Dialog>
            <DialogTrigger asChild><Button variant="default" size="icon" className="border-2 border-primary">
                <FilePlus className="h-4 w-4" />
            </Button></DialogTrigger>
            <DialogContent className="max-w-screen h-screen">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Import File</DialogTitle>
                    <ImportFilePage/>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ImportFileButton