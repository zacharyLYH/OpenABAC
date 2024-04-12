import { ABACRequestResponse, Context } from "@/abac/interface";

export function validateContext(ctx: Context): ABACRequestResponse{
    if(!ctx.entity){
        return {
            success: false,
            message: `From ${ctx.contextName}, must provide an entity to operate context on.`,
        };
    }
    if(![`BETWEEN`, `IN`,`<`,`>`,`<=`,`>=`,`==`,`!=`].includes(ctx.operator)){
        return {
            success: false,
            message: `From ${ctx.contextName}, ${ctx.operator} is not a valid operator.`,
        };
    }
    if(ctx.operator === "BETWEEN"){
        if(ctx.timeValue1 === null || ctx.timeValue2 === null || ctx.textValue !== null){
            return {
                success: false,
                message: `From ${ctx.contextName}, BETWEEN operators must have timeValue1 and timeValue2 non null, while textValue null.`,
            };
        }
    }else if(ctx.operator === "IN"){
        if(ctx.timeValue1 !== null || ctx.timeValue2 !== null || ctx.textValue === null){
            return {
                success: false,
                message: `From ${ctx.contextName}, IN operators must have timeValue1 and timeValue2 null, while textValue non null.`,
            };
        }
    }else{
        if(ctx.timeValue2 !== null){
            return {
                success: false,
                message: `From ${ctx.contextName}, please use timeValue1 instead of timeValue2.`,
            };
        }
        if((ctx.timeValue1 === null && ctx.textValue === null) || (ctx.timeValue1 !== null && ctx.textValue !== null)){
            return {
                success: false,
                message: `From ${ctx.contextName}, either timeValue1 or textValue must be filled.`,
            };
        }
    }
    return {
        success: true,
    };
}