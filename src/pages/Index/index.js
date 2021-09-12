import React from 'react'
// import { Route } from 'react-router-dom'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
import axios from 'axios'
import './index.scss'
navigator.geolocation.getCurrentPosition(position => {
  console.log('当前位置',position);
})
class Index extends React.Component {
  state = {
    swipers: [],
    isSwipersLoad: false,
    navList: [
      {
        id: 1,
        img: Nav1,
        title: '整租',
        path: '/home/list'
      },
      {
        id: 2,
        img: Nav2,
        title: '合租',
        path: '/home/list'
      },
      {
        id: 3,
        img: Nav3,
        title: '地图找房',
        path: '/home/list'
      },
      {
        id: 4,
        img: Nav4,
        title: '去出租',
        path: '/home/rent'
      },
    ],
    groups: [],
    news: []
  }
  componentDidMount() {
    this.getSwipers()
    this.getGroups()
    this.getNews()
  }
  async getGroups() {
    const { data } = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    this.setState({
      groups: data.body
    })
  }
  async getSwipers() {
    const { data } = await axios.get('http://localhost:8080/home/swiper')
    this.setState({
      swipers: data.body,
      isSwipersLoad: true
    })
  }
  async getNews() {
    const { data } = await axios.get("http://localhost:8080/home/news")
    console.log(data);
    this.setState({
      news: data.body
    })
  }
  renderCarousel = () => {
    const { swipers } = this.state
    return (
      swipers.map(val => (
        <a
          key={val.id}
          href="http://www.aiyying.com"
          style={{ display: 'inline-block', width: '100%', height: 212 }}
        >
          <img
            src={`http://localhost:8080${val.imgSrc}`}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
          />
        </a>
      ))
    )
  }
  renderNav = () => {
    const { navList } = this.state
    return (
      navList.map(item =>
        <Flex.Item key={item.id} onClick={() => this.props.history.push(item.path)}>
          <img src={item.img} alt='' />
          <h2>{item.title}</h2>
        </Flex.Item>
      )
    )
  }
  // 咨询
  renderNews = () => {
    return this.state.news.map(item =>
      <div className="news-item" key={item.id}>
        <div className="news-img">
          <img src={`http://localhost:8080${item.imgSrc}`} alt=''></img>
        </div>
        <Flex className="news-label" direction='column' align="center" justify='between'>
          <div className="news-title">{item.title}</div>
          <Flex className="news-from" justify='between'>
            <div>{item.from}</div>
            <div>{item.date}</div>
          </Flex>
        </Flex>
      </div>
    )
  }

  render() {
    return (
      <div className="index">
        <div className='swiper'>
          {
            this.state.isSwipersLoad ? <Carousel
              autoplay
              infinite
            >
              {this.renderCarousel()}
            </Carousel> : ''
          }

          <Flex className="search-box">
            <Flex className="search-left">
              <div className="search-site" onClick={() => this.props.history.push('/citylist')}>
                上海 ⬇️
              </div>
              <div className="search-input" onClick={() => this.props.history.push('/search')}>
                <i className="iconfont icon-seach"></i>
                <input placeholder='请输入小区或地址'></input>
              </div>
            </Flex>
            <div>
              <i className="iconfont icon-map" onClick={() => this.props.history.push('/map')} />
            </div>
          </Flex>
        </div>

        <Flex className="nav">
          {this.renderNav()}
        </Flex>

        <div className="groups">
          <div className="title">
            租房小组<span className="more">更多</span>
          </div>
          <Grid data={this.state.groups} columnNum={2} hasLine={false} square={false} renderItem={(item) =>
            <Flex key={item.id} className="group-item" justify="around">
              <div className="desc">
                <p className="title">{item.title}</p>
                <span className="info">{item.desc}</span>
              </div>
              <img src={`http://localhost:8080${item.imgSrc}`} alt='' />
            </Flex>
          } />
        </div>

        {/* 最新资讯 */}
        <div className="news">
          <div className="title">
            最新资讯
          </div>
          <WingBlank>
            {this.renderNews()}
          </WingBlank>
        </div>
      </div>
    )
  }
}

export default Index