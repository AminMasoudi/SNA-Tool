import apiClient from "./api-client";

export interface Node{
    id: number;
    name: string;
    color ?: string;
}

class NodeService{
    getAllNodes(){
        const controller = new AbortController();
        const request = apiClient.get<Node[]>("api/nodes", {signal:controller.signal})
        return {request, cancel: ()=> controller.abort()}
    }
}


export default new NodeService()