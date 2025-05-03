/**
 * 全局配置文件
 */

export const config = {
  /**
   * API地址，可通过环境变量NEXT_PUBLIC_API_URL覆盖
   */
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  
  /**
   * 数据刷新间隔（毫秒）
   */
  refreshInterval: 1000,
  
  /**
   * 网站标题
   */
  siteTitle: '猫猫监控',
  
  /**
   * 网站描述
   */
  siteDescription: '实时监控服务器CPU、内存、硬盘和流量使用情况',
}; 