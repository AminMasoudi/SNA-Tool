import apiClient from "./api-client";

export interface Edge{
    source: number;
    target: number;
}

class EdgeService{
    getAllEdges(){
        const controller = new AbortController();
        const request = apiClient.get("api/edges", {signal:controller.signal})
        return {request, cancel: ()=> controller.abort()}
    }
}


export default new EdgeService()