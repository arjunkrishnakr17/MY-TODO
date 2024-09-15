const zod=require("zod");
const usernameSchema=zod.string();
const passwordShema=zod.string();

module.exports={usernameSchema,passwordShema};
