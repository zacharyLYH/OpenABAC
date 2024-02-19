import { Context } from '@/abac/interface';

export const updateContextById = async (data: Context) => {
    if (process.env.IS_PRODUCTION === 'false') {
        return data;
    }
};
