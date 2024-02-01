import React, { Component } from 'react'
import NewsItem from './NewsItem';
 import Spinner from './Spinner';

export default class News extends Component {
static defaultProps ={
  country:'in',
  pageSize:8,
  category:'general'
}










  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }

  }

  async componentDidMount() {
 
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=38eb676b25f944e3926c7c9ee8da6b6e&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({ articles: parsedData.articles ,
      totalResults:parsedData.totalResults,
    loading:false
});
  }





  handlePreviousData = async () => {
    console.log("previous clicked !!!!")
    let url = `https://newsapi.org/v2/top-headlines?${this.props.country}&apiKey=38eb676b25f944e3926c7c9ee8da6b6e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    });
   
 
  }

  handleNextData = async () => {
    console.log("next Clicked !!!")
    if(!this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=38eb676b25f944e3926c7c9ee8da6b6e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
     this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading:false
      });
    }
  }


  render() {
  
    return (
      <div className='container my-2'>
        <div className='row'>
          <h3 className='text-center mt-2'>Top-Headlines</h3>
        {this.setState.loading &&  <Spinner />}


          {this.state.articles.map((element) => {
            return (
              <div className='col-md-4 my-3' key={element.url} >
                <NewsItem title={element.title ? element.title.slice(0, 42) : ""} description={element.description ? element.description.slice(0, 50) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.moneycontrol.com/static-mcnews/2022/01/IndusInd1-770x428.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
            )
          })}



        </div>

        <div className="container d-flex justify-content-between">
          <button className='btn btn-primary' disabled={this.state.page < 1} onClick={this.handlePreviousData}>&larr;previous</button>
          <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/20)}className='btn btn-primary' onClick={this.handleNextData}>Next &rarr;</button>

        </div>
      </div>
      

    )
  }
}
