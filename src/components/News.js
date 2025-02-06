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

  constructor()
  {
    super();
    this.state={
      articles: [],
      loading:false,
      page:1
    }
  }

  async componentDidMount()  // a lifecycle component in react, asynchronous method using 'async' to handle asynchronous operations inside
  {
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba866326b7f24af2adcfb2ac80652cd8&page=1&pageSize=${this.props.pageSize}`
    // let data = await fetch(url) // The 'await' keyword ensures that the function pauses until the request completes.
    // let parsedData = await data.json() // Parse the response from 'fetch' as JSON and store the parsed result in 'parsedData'. // The 'await' ensures the code waits until the JSON is successfully parsed.
    // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
    this.updatePage()
  }

  async updatePage()
  {
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba866326b7f24af2adcfb2ac80652cd8&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url) // The 'await' keyword ensures that the function pauses until the request completes.
    let parsedData = await data.json() // Parse the response from 'fetch' as JSON and store the parsed result in 'parsedData'. // The 'await' ensures the code waits until the JSON is successfully parsed.

    this.setState({
      articles: parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
    })
  }

  handlePrevClick =async ()=>{

    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba866326b7f24af2adcfb2ac80652cd8&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    // let data = await fetch(url) // The 'await' keyword ensures that the function pauses until the request completes.
    // let parsedData = await data.json() // Parse the response from 'fetch' as JSON and store the parsed result in 'parsedData'. // The 'await' ensures the code waits until the JSON is successfully parsed.

    // this.setState({
    //   page:this.state.page-1,
    //   articles: parsedData.articles,
    //   loading:false
    // })
    this.setState({page: this.state.page-1})
    this.updatePage();
  }

  handleNextClick=async ()=>{
  //   if (!(this.state.page+1 >  Math.ceil(this.state.totalResults/this.props.pageSize)))
  //   {  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba866326b7f24af2adcfb2ac80652cd8&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
  //     this.setState({loading:true})
  //     let data = await fetch(url) // The 'await' keyword ensures that the function pauses until the request completes.
  //     let parsedData = await data.json() // Parse the response from 'fetch' as JSON and store the parsed result in 'parsedData'. // The 'await' ensures the code waits until the JSON is successfully parsed.
  //   this.setState({
  //     page:this.state.page+1,
  //     articles: parsedData.articles,
  //           loading:false
  //   })
  // }
    this.setState({page:this.state.page+1})
    this.updatePage();
  }
  render() {
    return (
      <div className='container my-3'>     
        <h1 className='text-center my-4'>NewsMonkey - Top Headlines</h1>
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
