import React from 'react'
import './modal.css'
import './newsModal.css'

const NewsModal = ({ show, article, onClose }) => {
    if(!show) {return null}
  return (
    <div className='modal-overlay'>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="bi bi-x"></i>
        </span>
        {article && (
            <>
                <img src={article.image} alt={article.title} className='modal-image'/>
                <h3 className='modal-title'>{article.title}</h3>
                <p className='modal-source'>Fuente: {article.source.name}</p>
                <p className='modal-date'>{new Date(article.publishedAt).
                toLocaleString('es-ES', {
                    month: 'short',
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
                </p>
                <p className="modal-content-text">{article.content}</p>
                <a 
                    href={article.url} 
                    target='_blank' 
                    className="read-more-link"
                    rel='noopener noreferrer'
                >Read More</a> 
            </>
        )}
        
      </div>
    </div>
  )
}

export default NewsModal
