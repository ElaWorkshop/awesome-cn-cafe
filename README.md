# Awesome CN Café
[![Build Status](https://travis-ci.org/ElaWorkshop/awesome-cn-cafe.svg?branch=master)](https://travis-ci.org/ElaWorkshop/awesome-cn-cafe)

那些网速快咖啡好的咖啡馆。不同颜色的标记代表不同的下载速度。

<table>
<tr><th>标记</th><th>下载速度</th><th>色值</th></tr>
<tr><td><img src="resources/markers/slow.png" width="50" alt="Slow marker"></td><td>0 ~ 5 Mbps</td><td>#C24740</td></tr>
<tr><td><img src="resources/markers/moderate.png" width="50" alt="Moderate marker"></td><td>5 ~ 10 Mbps</td><td>#F3AE1A</td></tr>
<tr><td><img src="resources/markers/fast.png" width="50" alt="Fast marker"></td><td>10+ Mbps</td><td>#50C240</td></tr>
</table>


## 城市列表

* [北京 (7)](beijing.geojson)
* [上海 (34)](shanghai.geojson)
* [南京 (3)](nanjing.geojson)
* [武汉 (2)](wuhan.geojson)
* [杭州 (9)](hangzhou.geojson)
* [广州 (1)](guangzhou.geojson)
* [深圳 (4)](shenzhen.geojson)

## 贡献

欢迎发 pull request 添加你去过的咖啡馆。请通过浏览器或手机 app 等方式获取网络速度和经纬度，然后添加到相应的 [geoJSON](http://geojson.org/geojson-spec.html) 中。如果没有你所在的城市，请新建一个 geoJSON 文件。格式请参见 [shanghai.geojson](shanghai.geojson)。

### 通过浏览器

请用 [Speedtest](http://speedtest.net) 或其他工具测试网络速度、Mapbox 的[显示经纬度](https://www.mapbox.com/mapbox.js/example/v1.0.0/select-center-form/)来获取经纬度。在 Google Maps 上通过 What’s here 取得的经纬度有些许偏差。如果你正在咖啡馆并且可以翻墙，可以使用 [whereami](https://xavierchow.github.io/whereami/) 来获得当前经纬度。

### 通过手机 App

推荐使用 [Speedtest](http://www.speedtest.net/mobile/) ([iOS](https://itunes.apple.com/app/speedtest-net-mobile-speed/id300704847?mt=8)/[Android](https://play.google.com/store/apps/details?id=org.zwanoo.android.speedtest))，既可以测试网络速度也可以获取当前经纬度。

## 授权
[CC-BY](http://creativecommons.org/licenses/by/4.0/)
