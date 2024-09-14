import { UserButton } from "@clerk/clerk-react"
import { Label } from "./components/ui/label"
import { Button } from "./components/ui/button"
import { Separator } from "./components/ui/separator"
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Plus } from "lucide-react"
import { useEffect, useState } from "react";
import { Skeleton } from "./components/ui/skeleton";
import NewProject from "./components/NewProject";
import { EllipsisVertical } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate } from '@tanstack/react-router'




export const Dashboard = () => {


    const user_project = useQuery(api.project.user_project)
    const remove_project = useMutation(api.project.remove_project)
    const navigate = useNavigate({ from: '/dashboard' })

    const buildMainContent = () => {
        if (user_project == undefined) {
            return [...Array(10).keys()].map((ele, index) => {
                return <Skeleton key={index} className="w-60 h-48 rounded-2xl" />
            })
        }
        if (user_project.length == 0) {
            return <Label>no project is found</Label>
        }

        return [...user_project].map((ele) => {
            return <div className="relative w-60 h-48 rounded-2xl bg-neutral-800 border-2 border-neutral-600 hover:shadow-md hover:shadow-current hover:bg-neutral-700" onClick={() => {
                navigate({
                    to: `/editor/${ele._id}`
                })
            }}>
                <div className="absolute m-auto inset-y-0 w-max h-max text-center inset-x-0">{ele.name}</div>

                <Popover >
                    <PopoverTrigger className="absolute right-4 top-4 rounded-full hover:bg-neutral-600 p-1"><EllipsisVertical className=" w-4 h-4" /></PopoverTrigger>
                    <PopoverContent className=" w-auto p-0 bg-red-700"><div className=" hover:bg-red-600 p-4 rounded-lg" onClick={() => {
                        remove_project({
                            id: ele._id
                        })
                    }}>Delete</div></PopoverContent>
                </Popover>

            </div>
        })
    }

    return <div className="flex flex-col w-screen items-center">
        <div className="flex justify-between items-center px-4 py-2 w-full">
            <Label className="text-md font-bold">Projects</Label>
            <UserButton />
        </div>
        <Separator />
        <div className="flex justify-start w-full items-center m-2 px-8 py-4">
            <NewProject />
        </div>
        <div className="flex gap-4 flex-wrap items-center">
            {
                buildMainContent()
            }
        </div>
    </div>

}