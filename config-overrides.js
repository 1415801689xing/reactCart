const {injectBabelPlugin} = require('react-app-rewired')

module.exports = function override(config, env){
  // antd的按需加载
  config = injectBabelPlugin([
    'import', {libraryName: 'antd', libraryDirectory: 'es', style: 'css'}
  ],config)

  // 添加装饰器的能力
  config = injectBabelPlugin(
    ['@babel/plugin-proposal-decorators', {'legacy': true}],
    config,
  )

  return config;
}



