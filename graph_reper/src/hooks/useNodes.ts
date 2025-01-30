import { useEffect, useState } from "react"
import nodeService, {Node} from "../services/node-service"
import { CanceledError } from "axios"


const useNodes = () => {
    const [nodes, setNodes] = useState<Node[]>([])
    const [error, setError] = useState("")
    const[loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        const {request, cancel} = nodeService.getAllNodes()
        request
        .then((res)=>{
            console.log(res.data)
            setNodes(res.data)
        })
        .catch((err)=>{
            if (err instanceof CanceledError) return
            setError(err)

        })
        .finally(()=>setLoading(false))

        return cancel
    }, [])
    return {nodes, error, loading}

}

export default useNodes;