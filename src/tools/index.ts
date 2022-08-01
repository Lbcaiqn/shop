export function formatDatetime(datetime: Number | string,fmt: string): string{
  /*使用说明
  参数： datetime(数值或字符串类型，时间戳)，fmt(字符串类型，正则)
  示例：
  yyyy-MM-dd               2022-8-10
  dd/MM yyyy               10/8 2022
  yyyy年0M月0d日 0h:0m:0s  2022年08月01日 15:25:49
  
  */
  /*
  
  */
  
  let date = new Date(String(datetime).length == 10 ? Number(datetime)*1000 : Number(datetime))

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  if(/(y+)/.test(fmt))  fmt = fmt.replace(RegExp.$1,(date.getFullYear() + ''))
  for(let i in o){
    let str = o[i] + ''
    if(new RegExp(`(0${i})`).test(fmt) && str.length >= 2) fmt = fmt.replace(RegExp.$1,str)
    else if(new RegExp(`(${i})`).test(fmt)) fmt = fmt.replace(RegExp.$1,str)
  }
  return fmt
}