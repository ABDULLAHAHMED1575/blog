import api from "../api/axios";


export const signup = async({name,email,password}) =>{
    try {
        const {data} = await api.post("/users/register",{
            name,
            email,
            password,
        });
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const login = async({email,password}) =>{
    try {
        const {data} = await api.post("/users/login",{
            email,
            password,
        });
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const getUserProfile = async({token}) => {
    try {
        const config = {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }
        const {data} = await api.get("/users/profile",config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}


export const updateUserProfile = async({token, userData }) => {
    try {
        const config = {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }
        const {data} = await api.put("/users/updateProfile ",userData,config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const updateProfilePicture = async({token, formData }) => {
    try {
        const config = {
            headers:{
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${token}`,
            }
        }
        const {data} = await api.put("/users/updateProfilePic",formData,config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}