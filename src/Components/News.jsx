import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import Calendar from './Calendar'
import './news.css'
import axios from "axios"
import NewsModal from './NewsModal'
import Bookmarks from './Bookmarks'
import BlogsModal from './BlogsModal'

import yo from "../assets/images/yo.jpg"
import noImg from "../assets/images/no-img.png"
import blogImg1 from "../assets/images/blog1.jpg"
import blogImg2 from "../assets/images/blog2.jpg"
import blogImg3 from "../assets/images/blog3.jpg"
import blogImg4 from "../assets/images/blog4.jpg"




const categories = [
  "general", 
  "world", 
  "business",
  "technology", 
  "entertainment", 
  "sports",
  "science", 
  "health", 
  "nation",
]



const News = ({ onShowBlogs, blogs, onEditBlog, onDeleteBlog }) => {
  const [headLine, setHeadLine] = useState(null)
  const [news, setNews] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('technology')
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [showbookmarks, setShowBookmarks] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [showBlogModal, setshowBlogModal] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=es&apikey=11dff7ef87dd0d416fee611b51af557f`
      
      

      if(searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&apikey=11dff7ef87dd0d416fee611b51af557f`
        
      }

      const response = await axios.get(url)
      const fetchedNews = response.data.articles

      fetchedNews.forEach(article => {
        if (!article.image) {
          article.image = noImg
        }
      })

      setHeadLine(fetchedNews[0])
      setNews(fetchedNews.slice(1, 7))

      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
      setBookmarks(savedBookmarks)
      
    }

    fetchNews()
  }, [selectedCategory, searchQuery])

  const handleCategoryClick = (e, category) => {
    e.preventDefault()
    setSelectedCategory(category)
    
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(searchInput)
    setSearchInput('')
    console.log("sss")
  }

  const handleArticleClick = (article) => {
    setSelectedArticle(article)
    setShowModal(true)
  }

  const handleBookmarksClick = (article) => {
    setBookmarks((prevBookmarks) => {
      const updateBookmarks = prevBookmarks.find((bookmarks) => bookmarks.title === article.title) ? prevBookmarks.filter((bookmarks) => bookmarks.title !== article.title) : [...prevBookmarks, article]
      localStorage.setItem("bookmarks", JSON.stringify(updateBookmarks))
      return updateBookmarks
    })
  }
  
  const handleBlogClick = (blog) => {
    setSelectedPost(blog)
    setshowBlogModal(true)
  }

  const closeBlogModal = () => {
    setshowBlogModal(false)
    setSelectedPost(null)
  }
  return (
    <div className='news'>
      <header className='news-header'>
        <h1 className='logo'>Yony Blog & News</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search News..." 
              value={searchInput} 
              onChange={(e) => setSearchInput(e.target.value)} 

            />
          </form>
          <button type="submit" onClick={handleSearch}>
          <i className="bi bi-search"></i>
          </button>
        </div>
      </header>

      <div className="news-content">
        <div className="navbar">
            <div className="user" onClick={onShowBlogs}>
              <img src={yo} alt="img" />
              <p>Yony's Blog</p>
            </div>
            <div className="categories">
              <h2 className='nav-heading'>Categories</h2>
              <div className="nav-links">
                {
                  categories.map((category) => (
                    <a href="#" key={category} className='nav-link' onClick={(e) => handleCategoryClick(e, category)}>
                      {category}
                    </a>
                  ))
                }
                
               
                <a href="#" className='nav-link' onClick={() => setShowBookmarks(true)}>
                  Bookmarks <i className="bi bi-bookmarks-fill"></i>
                  {/* <i class="bi bi-bookmarks-fill"></i> */}
                </a>
              </div>
            </div>
        </div>
        <div className="news-section">
            {headLine && (
              <div 
                className="headline"
                onClick={() => handleArticleClick(headLine)}
              >
                <img src={headLine.image || noImg} alt={headLine.title} />
                <h3 className='headlinei-title'>
                  {headLine.title}
                  <i 
                    className={`${
                      bookmarks.some((bookmark) => 
                      bookmark.title === headLine.title)
                       ? 'bi-bookmarks-fill'
                        : 'bi-bookmarks'
                    } bi-bookmarks-fill`} 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarksClick(headLine)
                    }}>

                  </i>
                </h3>
              </div>
            )}
            
            
            <div className="news-grid">

              {
                news.map((article, index) => (
                  <div 
                    key={index} 
                    className="news-grid-itm"
                    onClick={() => handleArticleClick(article)}
                  >
                    <img src={article.image || noImg} alt={article.title}/>
                    <h4>{article.title}
                    <i 
                    className={`${
                      bookmarks.some((bookmark) => 
                      bookmark.title === article.title)
                       ? 'bi-bookmarks-fill'
                        : 'bi-bookmarks'
                    } bi-bookmarks-fill`} 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarksClick(article)
                    }}>

                  </i>
                    </h4>
                  </div>
                ))
              }

            </div>
        </div>
        <NewsModal 
          show={showModal} 
          article={selectedArticle}
          onClose={() => setShowModal(false)}
        />
        <Bookmarks 
          show={showbookmarks} 
          bookmarks={bookmarks} 
          onClose={() => setShowBookmarks(false)} 
          onSelecArticle={handleArticleClick} 
          onDeleteBookmarks={handleBookmarksClick}
        />
        <div className="my-blogs">
            <h3 className='my-blogs-heading'>My Blogs</h3>
            <div className="blog-posts">
              {
                blogs.map((blog, index) => (
                  <div key={index} className="blog-post" onClick={() => handleBlogClick(blog)}>
                    <img src={blog.image || noImg} alt={blog.title} />
                    <h4>{blog.title}</h4>
                    
                    <div className="post-buttons">
                      <button className="edit-post" onClick={() => onEditBlog(blog)}>
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button className="delete-post" onClick={(e) => {
                        e.stopPropagation();
                        onDeleteBlog(blog)
                      }}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))
              }
              
            </div>
            {
              selectedPost && showBlogModal && (
                <BlogsModal show={showBlogModal} blog={selectedPost} onClose={closeBlogModal}/>
              )
            }
            
        </div>
        <div className="weather-calendar">
            <Weather/>
            <Calendar/>
        </div>
        
        
      </div>

      <footer className='news-footer'>
        <p>
          <span>News & Blogs YONY App</span>
        </p>
        
      </footer>
      


    </div>
  )
}

export default News
