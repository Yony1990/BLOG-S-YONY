import { useEffect, useState } from 'react'

import './App.css'
import Blogs from './Components/Blogs'
import News from './Components/News'

function App() {
  
  const [showNews, setShowNews] = useState(true)
  const [showBlogs, setShowBlogs] = useState(false)
  const [blogs, setBlogs] = useState([])
  //edit 7:58:38
  const [selectedPost, setSelectedPost] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || []
    setBlogs(savedBlogs)
  }, [])

  const handleCreateBlog = (newBlog, isEditing) => {
    setBlogs((prevBlogs) => {

      //edit
      const updatedBlogs = isEditing ? prevBlogs.map((blog) => (
        blog === selectedPost ? newBlog : blog
      )) : [...prevBlogs, newBlog]
      

      // const updatedBlogs = [...prevBlogs, newBlog]
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs))
      return updatedBlogs
    })
    //edit
    setIsEditing(false)
    setSelectedPost(null)
  }

  const handleEditBlog = (blog) => {
    setSelectedPost(blog)
    setIsEditing(true)
    setShowNews(false)
    setShowBlogs(true)
  }

  const handleDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlogs) => {
      const updateBlogs = prevBlogs.filter((blog) => blog !== blogToDelete)
      localStorage.setItem('blogs', JSON.stringify(updateBlogs))
      return updateBlogs
    })
  }

  const handleShowBlogs = () => {
    setShowBlogs(true)
    setShowNews(false)
  }

  const handleBackToNews = () => {
    setShowBlogs(false)
    setShowNews(true)
    setIsEditing(false)
    setSelectedPost(null)
  }

  return (
    <div className='container'>
      <div className="news-blogs-app">
        {
          showNews && (
            <News 
              onShowBlogs={handleShowBlogs} 
              blogs={blogs} 
              onEditBlog={handleEditBlog}
              onDeleteBlog={handleDeleteBlog}
            />)
           
        }
        {
          showBlogs && (
            <Blogs 
              onBack={handleBackToNews} 
              onCrateBlog={handleCreateBlog}
              editPost={selectedPost}
              isEditing={isEditing}
            />)
        }
      </div>
    </div>
  )
}

export default App
