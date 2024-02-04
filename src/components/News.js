import React, { Component } from 'react'
import NewsItem from './NewsItem';
 import Spinner from './Spinner';
 import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
static defaultProps ={
  country:'in',
  pageSize:8,
  category:'general'
}


 capitalize=(s)=>
{
    return s && s[0].toUpperCase() + s.slice(1);
}







  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
document.title=`${this.capitalize(this.props.category)}-NewsApp`
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=38eb676b25f944e3926c7c9ee8da6b6e&pageSize=${this.props.pageSize}&category=${this.props.category}&page=${this.state.page}`;
    this.setState({loading:true})
    let data = await fetch(url);

    let parsedData = await data.json();

    this.setState({ articles: parsedData.articles ,
      totalResults:parsedData.totalResults,
    loading:false
});
  }

  async componentDidMount() {
    this.updateNews();
 
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=38eb676b25f944e3926c7c9ee8da6b6e&pageSize=${this.props.pageSize}&category=${this.props.category}`;
//     this.setState({loading:true})
//     let data = await fetch(url);
//     let parsedData = await data.json();

//     this.setState({ articles: parsedData.articles ,
//       totalResults:parsedData.totalResults,
//     loading:false
// });
  }





//   handlePreviousData = async () => {
// this.setState({page:this.state.page-1})
// this.updateNews();
   
 
//   }

  // handleNextData = async () => {
  //  this.setState({page:this.state.page+1})
  //  this.updateNews();
  // }

  fetchMoreData= async ()=> {
 this.setState({page:this.state.page+1})

 const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=38eb676b25f944e3926c7c9ee8da6b6e&pageSize=${this.props.pageSize}&category=${this.props.category}&page=${this.state.page}`;

 let data = await fetch(url);
 let parsedData = await data.json();

 this.setState({ articles: this.state.articles.concat(parsedData.articles ),
   totalResults:parsedData.totalResults

});


  }


  render() {
  
    return (





      
<>


     
      
          <h3 className='text-center mt-3'>{this.capitalize(this.props.category)} -Top HeadLines</h3>
    

{this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!=this.state.totalResults}
          loader={<Spinner/>}
        >



<div className='container ' style={{overflow:'hidden'}}>

<div className='row'>

          {this.state.articles.map((element) => {
            return (
              <div className='col-md-4 my-3' key={element.url} >
                <NewsItem title={element.title ? element.title.slice(0, 42) : ""} description={element.description ? element.description.slice(0, 50) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.moneycontrol.com/static-mcnews/2022/01/IndusInd1-770x428.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
            )
          })}



        </div>

      </div>
      </InfiniteScroll>
</>
    )
  }
}
