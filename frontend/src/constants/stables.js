// Use environment variable or determine based on dev/prod mode
const UPLOAD_FOLDER_BASE_URL = import.meta.env.VITE_UPLOAD_URL ||
    (import.meta.env.DEV
        ? "http://localhost:8000/uploads/"
        : "https://blog-81ec.onrender.com/uploads/");

const stables = {
    UPLOAD_FOLDER_BASE_URL
};

export default stables;