import React from 'react'
import './bookmarks.css'
import './modal.css'
import demo from "../assets/images/demo.jpg"
import noImg from "../assets/images/no-img.png"

const Bookmarks = ({ show, bookmarks, onClose, onSelecArticle, onDeleteBookmarks }) => {

    if(!show) {
        return null
    }


  return (
    <div className='modal-overlay'>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
            <i className="bi bi-x"></i>
        </span>
        <h3 className='bookmarks-heading'>Bookmarks News</h3>
        <div className="bookmarks-list">
            {
                bookmarks.map((article, index) => (
                    <div className="bookmarks-item" key={index} onClick={() => onSelecArticle(article)}>
                        <img src={article.image} alt={article.title} />
                        <h4>{article.title || noImg}</h4>
                        <span className='delete-button' onClick={(e) => {
                            e.stopPropagation()
                            onDeleteBookmarks(article)
                        }}>
                            <i className="bi bi-x-circle"></i>
                        </span>
                    </div>
                ))
            }
            

        </div>
      </div>
    </div>
  )
}

export default Bookmarks
