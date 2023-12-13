import { createClient } from "@node-rpc/client";
import { jsonFormDataSerializer } from "@node-rpc/client/dist/serializers/jsonFormDataSerializer";
import { axiosXHR } from "@node-rpc/client/dist/xhr/axios";

interface IApi {
    GetIMT: (args: IGetIMT) => { imt: number };
}

interface IGetIMT {
    weight: number;
    height: number;
}

const api = createClient<IApi>({
    endpoint: "http://localhost:8000/",
    serializer: jsonFormDataSerializer,
    xhr: axiosXHR,
});

export const GetIMT = async (args: IGetIMT) => {
    const response = await api.GetIMT(args).call();

    if (response.type === 'success') {
        return response.data.imt;
    }

    if (response.type === 'fail') {
        console.log("error", response.code, response.error);
    }

    throw new Error('unsuccessful request');
}

