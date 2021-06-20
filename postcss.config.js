module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿宽度
      viewportHeight: 667,//视窗的高度，对应的是我们设计稿高度（也可以不配置）
      unitPrecision: 5, // px转换后的小数保留位数，有时候不能整除
      viewportUnit: "vw",   // 指定转换的单位
      selectorBlaskList: [".ignore-","tab-bar"],    // 指定不需要转换的类
      minPixelValue: 1 ,// 小于或等于`1px`时不转换为视窗单位
      mediaQuery: false,   // 允许在媒体查询中转换，默认为false
      exclude: [/TabBar/],//存放的元素必须是正则表达式，按照排除的文件写对应的正则
      propList: ["*"],   // 转化为vw的属性列表
      fontViewportUnit: "vw",   // 字体使用的单位
    }
  }
}
//1.^abc:表示匹配的内容，必须以什么内容开头（以abc开头）
//2.abc$ :表示匹配的内容，必须以什么内容结尾（以abc结尾）
