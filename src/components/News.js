import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Newsitem from './Newsitem'
import Spinner from './Spinner';

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
      loading:false,
      page:1
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
  render() {
    return (
      <div className='container my-3'>     
        <h1 className='text-center my-4'>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles?.map((element)=>(
          <div className="col-md-4" key={element.url}>
          <Newsitem  title={element.title ? element.title: ""} description={element.description ? element.description: ""} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
          </div>
        ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr;Previous</button>
          <button disabled={this.state.page+1 >  Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
