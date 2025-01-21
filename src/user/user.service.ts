import { logger } from "../utils/logger";

class UserService {
    constructor() {};

    /**
     * getAllUser
     */
    public async getAllUser() {
        logger.info(`${UserService.name}-getAllUser`);
        const users = [{id:1,fullname:"Fabian Avila",email: "fabianafalso@gmail.com"}];
        return users;
    };
    /**
     * getUserById
     */
    public async getUserById(id:string) {
        logger.info(`${UserService.name}-getUserById with id: ${id}`);
        const user = {
            id,
            fullname:"Pablo Marmol"
            ,email: "pmarmol@gmail.com"
        };
        return user;
    }
    /**
     * createUser
     */
    public async createUser(userBody:any) {
        const newUser = {...userBody, id:1000}
        logger.info(`${UserService.name}-CreateUser`);
        return newUser;
    }
    /**
     * UpdateUserById
     */
    public async UpdateUserById(id:string,UpdatUserBody:any) {
        console.log(`usuario actualizado ${UpdatUserBody}`);
        const updateUser = {...UpdatUserBody, id:1000}
        logger.info(`${UserService.name}-UpdateUserById with id: ${id}`);
        return updateUser;
    }
    /**
     * deleteUserById
     */
    public async deleteUserById(id:string) {
        logger.info(`${UserService.name}-DeleteUserById with id: ${id}`);
        const userDeleted = {
            id,
            fullname:"Carlos Perez",
            email:"cperez@gmail.com"
        };
        return userDeleted;
    }
};

export default UserService;