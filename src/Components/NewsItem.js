import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, imageurl, newsurl, author, date} = this.props;
    return (
      <div>
        <div className="card">
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <p class="card-text"><small class="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
              Read More ...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
