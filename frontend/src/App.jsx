import "./App.css"

import { Route,Routes } from "react-router-dom"
import { Homepage } from "@/pages/home/Homepage"
import { ArticleDetail } from "@/pages/articleDetail/ArticleDetail"
import { RegisterPage } from "@/pages/register/RegisterPage"
import { Toaster } from "react-hot-toast"
import { LoginPage } from "./pages/login/LoginPage"
import { Profile } from "./pages/profile/Profile"
import { Post } from "./pages/post/Post"

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<Homepage/>}/>
        <Route path="/blog/:slug" element={<ArticleDetail/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/post" element={<Post/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
