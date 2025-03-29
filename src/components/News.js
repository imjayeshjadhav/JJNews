import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:8,
    category: 'General',
  }

  static propTypes ={
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalize = (string) => {
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props)
  {
    super(props);
    this.state={
      articles: [],
      loading:true,
      page:1,
      totalResults:0
    }
    document.title=`${this.capitalize(this.props.category)} - NewsMonkey`
  }

  async componentDidMount()  // a lifecycle component in react, asynchronous method using 'async' to handle asynchronous operations inside
  {
    this.updatePage()
  }

  async updatePage()
  {
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba866326b7f24af2adcfb2ac80652cd8&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url) 
    let parsedData = await data.json() 

    this.setState({
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
  }

  handlePrevClick =async ()=>{
    this.setState({page: this.state.page-1})
    this.updatePage();
  }

  handleNextClick=async ()=>{
    this.setState({page:this.state.page+1})
    this.updatePage();
  }

  fetchMoreData = async () => {
      this.setState({
        page:this.state.page+1,
      });
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba866326b7f24af2adcfb2ac80652cd8&page=${this.state.page}&pageSize=${this.props.pageSize}`
      let data = await fetch(url) 
      let parsedData = await data.json() 
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults:parsedData.totalResults,
      })

  };

  render() {
    return (
      <div className='container my-3'>     
        <h1 className='text-center my-4'>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
        {this.state.articles?.map((element)=>(
          <div className="col-md-4" key={element.url}>
          <Newsitem  title={element.title ? element.title: ""} description={element.description ? element.description: ""} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
          </div>
        ))}
        </div>
        </div>
        </InfiniteScroll>

      </div>
    )
  }
}

export default News
