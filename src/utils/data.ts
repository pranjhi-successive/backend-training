import Joi from 'joi';

type Data2 = Record<string, any>;

const data2: Data2 = {
    '/user': {
        username: Joi.string().alphanum().min(3).max(30)
            .required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(/^[a-zA-Z0-9]{3,30}$/)
            .required(),
    },

    '/post': {
        title: Joi.string().min(3).max(100).required(),
        content: Joi.string().min(10).required(),
    },
};

export default data2;
