import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country : "in",
        pageSize: "12",
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af813863c97b48a788a6ff6db2ba7dce&pageSize=${this.props.pageSize}`;

    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handleNextPage = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalresults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af813863c97b48a788a6ff6db2ba7dce&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;

      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      });
    }
  };

  handlePreviousPage = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af813863c97b48a788a6ff6db2ba7dce&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;

    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin : "40px"}}>DailyNews - Top Headlines !</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageurl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/60D1/production/_126658742_gettyimages-1419472454.jpg"
                  }
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div className="contianer d-flex justify-content-between my-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handlePreviousPage}
            disabled={this.state.page <= 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextPage}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalresults / this.props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
