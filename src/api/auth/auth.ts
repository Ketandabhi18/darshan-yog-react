import axios from "axios";
import Service from "../../lib/service";

const AuthService = {
  postLoginDetail: async (headers: any) => {
    try {
      return await Service.get(`user`, headers);
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
