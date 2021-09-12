import React from 'react'
import { TabBar } from 'antd-mobile'
import { Route } from 'react-router-dom'
import './index.scss'
import HouseList from '../HouseList'
import Index from '../Index'
import News from '../News'
import Profile from '../Profile'
class Home extends React.Component {
  state = {
    selectedTab: this.props.location.pathname,
    tabbar: [
      {
        title: '首页',
        path: '/home',
        icon: 'icon-ind'
      },
      {
        title: '找房',
        path: '/home/list',
        icon: 'icon-findHouse'
      },
      {
        title: '咨询',
        path: '/home/news',
        icon: 'icon-infom'
      },
      {
        title: '我的',
        path: '/home/profile',
        icon: 'icon-my'
      },
    ]
  };
  componentDidUpdate(prevProps){
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab:this.props.location.pathname
      })
    }
  }
  tabberRender = () => {
    const { tabbar } = this.state
    return (
      tabbar.map(item => 
        <TabBar.Item
          icon={
            <i className={`iconfont ${item.icon}`} />
          }
          selectedIcon={
            <i className={`iconfont ${item.icon}`} />
          }
          title={item.title}
          key={item.title}
          selected={this.state.selectedTab === item.path}
          onPress={() => {
            this.setState({
              selectedTab: item.path,
            });
            this.props.history.push(item.path)
          }}
        >
        </TabBar.Item>
      )
    )
  }
  render() {
    return (
      <div className="home">
        {/* tabbar */}
        <TabBar
          tintColor="#21b97a"
          barTintColor="white"
          noRenderContent={true}
        >
          {this.tabberRender()}
        </TabBar>
        {/* 配置路由 */}
        <Route path="/home/list" component={HouseList}></Route>
        <Route exact path="/home" component={Index}></Route>
        <Route path="/home/news" component={News}></Route>
        <Route path="/home/profile" component={Profile}></Route>
      </div>
    )
  }
}

export default Home