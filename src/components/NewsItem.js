import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {

        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

        return (
            <div>
               
                <div className="card" style={{ width: '100%' }}>
                <div>
                <span className=" badge rounded-pill bg-danger d-flex justify-content-end position-absolute end-0" >
                    {source}

                </span>
                </div>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h6 className="card-title">{title}...</h6>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "unKonwn" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
