import { ReactNode } from "react";
import { Label } from '@/components/ui/label'
import { cn } from "@/lib/utils";

export default function NodeFrame({ children, label, className }: { children: ReactNode, label: string, className?: string }) {
    return (
        <div className={cn('p-3 border rounded-md flex flex-col gap-1 bg-neutral-800  items-center w-full h-full font-sans hover:bg-neutral-700', className ?? 'border-gray-500')} >
            <Label className='text-xs font-bold text-white'>{label}</Label>
            {children}
        </div>
    );
}