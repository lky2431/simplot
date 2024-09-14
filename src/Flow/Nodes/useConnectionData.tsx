import { useHandleConnections,useNodesData } from "@xyflow/react"
import { useEffect, useState } from "react"


export const useConnectionData = (connection: {
    id: string,
    type: string
}
) => {
    const Connection = useHandleConnections(connection)
    const [node, setNode] = useState<string[]>([])


    useEffect(() => {
        setNode(Connection.map((c) => c.source))
    }, [Connection])

    return useNodesData(node)

}