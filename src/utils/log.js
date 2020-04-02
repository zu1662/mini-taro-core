/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2020-01-08 10:54:35
 * @LastEditTime: 2020-04-01 11:40:35
 * @Description: 自定义控制台输出
 */
'use strict'
class Log {
  constructor (normal = '#35495E', primary = '#3488ff', success = '#43B883', warning = '#e6a23c', danger = '#f56c6c') {
    this.normal = normal
    this.primary = primary
    this.success = success
    this.warning = warning
    this.danger = danger
  }

  /**
   * @description 返回这个样式的颜色值
   * @param {String} type 样式名称 [ primary | success | warning | danger | text ]
   */
  typeColor (type = 'default') {
    let color = ''
    switch (type) {
      case 'default': color = this.normal; break
      case 'primary': color = this.primary; break
      case 'success': color = this.success; break
      case 'warning': color = this.warning; break
      case 'danger': color = this.danger; break
      default: break
    }
    return color
  }

  /**
   * @description 打印一个 [ title | text ] 样式的信息
   * @param {String} title title text
   * @param {String} info info text
   * @param {String} type style
   */
  capsule (title, info, type = 'primary') {
    // eslint-disable-next-line no-console
    console.log(
      `%c ${title} %c ${info} %c`,
      'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
      `background:${this.typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
      'background:transparent'
    )
  }

  /**
   * @description 打印彩色文字
   */
  colorful (textArr) {
    // eslint-disable-next-line no-console
    console.log(
      `%c${textArr.map(t => t.text || '').join('%c')}`,
      ...textArr.map(t => `color: ${this.typeColor(t.type)};`)
    )
  }

  // _ is a hack. it will be wrong without _.
  /**
   * @description 打印 default 样式的文字
   */
  _default (text) {
    this.colorful([{ text }])
  }

  /**
   * @description 打印 primary 样式的文字
   */
  _primary (text) {
    this.colorful([{ text, type: 'primary' }])
  }

  /**
   * @description 打印 success 样式的文字
   */
  _success (text) {
    this.colorful([{ text, type: 'success' }])
  }

  /**
   * @description 打印 warning 样式的文字
   */
  _warning (text) {
    this.colorful([{ text, type: 'warning' }])
  }

  /**
   * @description 打印 danger 样式的文字
   */
  _danger (text) {
    this.colorful([{ text, type: 'danger' }])
  }
}

export default new Log()
