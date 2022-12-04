
import { handlerPath } from '@libs/handler-resolver';
export const ChimeAppAdminLambda = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    timeout: 60,
    memorySize: 128,
    layers: [
        { "Ref": "AWSSDKChimeLayer" }
    ]
};



