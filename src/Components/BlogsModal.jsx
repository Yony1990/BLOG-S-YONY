import React from 'react'
import './blogsModal.css'



const BlogsModal = ({ show, onClose, conter }) => {
  if(!show) {
    return null
  }
  

  return (
    
    <div className='modal-overlay'>

     
          <div className="modal-content">
            <span className="close-button" onClick={onClose}>
                <i className="bi bi-x"></i>
            </span>
            <img className='blogs-modal-image' src={conter.image} alt={conter.title} />
            
            
            <h3 className='blogs-modal-title'>{conter.title}</h3>
            <p className="blog-post-content">
                {conter.parrafo}
            </p>
          </div>
        
      
    </div>
  )
}

export default BlogsModal
