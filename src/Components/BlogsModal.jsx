import React from 'react'
import './blogsModal.css'
import demo from "../assets/images/no-img.png"

const BlogsModal = ({ show, blog, onClose }) => {
  if(!show) {
    return null
  }
  return (
    <div className='modal-overlay'>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
            <i className="bi bi-x"></i>
        </span>
        {
          blog.image && <img className='blogs-modal-image' src={blog.image} alt={blog.title} />
        }
        
        <h3 className='blogs-modal-title'>{blog.title}</h3>
        <p className="blog-post-content">
            {blog.content}
        </p>
      </div>
    </div>
  )
}

export default BlogsModal
