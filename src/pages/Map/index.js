import React from 'react'
import './index.scss'
export default class Map extends React.Component {
  componentDidMount() {
    // 1.创建地图实例
    const map = new window.BMapGL.Map('container');
    map.centerAndZoom(new window.BMapGL.Point(116.280190, 40.049191), 19);
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.setHeading(64.5);
    map.setTilt(73);
    // 2. 创建MapVGL图层管理器
    // const view = new mapvgl.View({
    //   map: bmapgl
    // });

    // // 3. 创建可视化图层，并添加到图层管理器中
    // const layer = new mapvgl.PointLayer({
    //   color: 'rgba(50, 50, 200, 1)',
    //   blend: 'lighter',
    //   size: 2
    // });
    // view.addLayer(layer);

    // // 4. 准备好规范化坐标数据
    // const data = [{
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [116.403748, 39.915055]
    //   }
    // }];

    // // 5. 关联图层与数据，享受震撼的可视化效果
    // layer.setData(data);
  }
  render() {
    return (
      <div className="map">
        <div id="container"></div>
      </div>
    )
  }
}