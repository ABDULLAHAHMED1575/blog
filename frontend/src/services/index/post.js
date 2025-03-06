import axios from "axios";

export const getUserPosts = async () => {
  try {
    const { data } = await axios.get("/api/posts");
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const createPost = async ({ token, postData }) => {
  try {
    if (!token) {
      throw new Error("Not authorized, No token");
    }
    
    const { title, caption, photo } = postData;
    
    if (photo instanceof File) {
      
      const formData = new FormData();
      formData.append("title",title);
      formData.append("caption",caption);
      formData.append("photo",photo);
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      
      console.log("Form Data Entries:");
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

      const { data } = await axios.post("/api/posts", formData, config);
      return data;
    }
    else {
      console.log("Using JSON for post without file");
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      
      console.log("Sending JSON data");
      const { data } = await axios.post("/api/posts", {
        title:postData.title,
        caption:postData.caption,
        photo: photo || "",
      }, config);
      console.log(data)
      return data;
    }
  } catch (error) {
    console.error("API Error:", error);
    if (error.response && error.response.data) {
      console.error("Full error details:", error.response.data);
    }
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updatePost = async ({ token, slug, postData }) => {
  try {
    if (!token) {
      throw new Error("Not authorized, No token");
    }
    
    const { title, caption, body, tags, categories, postPicture } = postData;
    
    if (postPicture instanceof File) {
      const formData = new FormData();
      
      const document = JSON.stringify({
        title,
        caption,
        slug,
        body: body || { type: "doc", content: [] },
        tags: tags || [],
        categories: categories || []
      });
      
      formData.append("document", document);
      formData.append("postPicture", postPicture);
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.put(`/api/posts/${slug}`, formData, config);
      return data;
    }
    else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      
      const { data } = await axios.put(`/api/posts/${slug}`, {
        document: JSON.stringify({
          title,
          caption,
          slug,
          body: body || { type: "doc", content: [] },
          tags: tags || [],
          categories: categories || []
        })
      }, config);
      return data;
    }
  } catch (error) {
    console.error("Update error:", error);
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deletePost = async ({ token, slug }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`/api/posts/${slug}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getPost = async ({slug}) => {
  try {
    const { data } = await axios.get(`/api/posts/${slug}`);
    console.log("Fetched Post Data:", data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};