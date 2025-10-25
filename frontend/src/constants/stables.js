// Use environment variable or determine based on dev/prod mode
// In development: full URL with port
// In production (Docker): relative URL (nginx proxy handles it)
const UPLOAD_FOLDER_BASE_URL = import.meta.env.VITE_UPLOAD_URL ||
    (import.meta.env.DEV
        ? "http://localhost:8000/uploads/"
        : "/uploads/");

const stables = {
    UPLOAD_FOLDER_BASE_URL
};

export default stables;