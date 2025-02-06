import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Newsitem extends Component {
  
  render() {
    let { title, description, imageURL, newsURL, author,date } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
         <img className="card-img-top" src={!imageURL?"https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM=":imageURL} alt="Card image cap"/>  {/* If Image in null then go with the link else it will remain as it is */}
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"unknown":author} at {new Date(date).toUTCString()} </small></p>
            <a href={newsURL} target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

Newsitem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Newsitem;
