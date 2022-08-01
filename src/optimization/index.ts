export class Debunce {
  private timer: Number | null = null
  private immediate: boolean = false
  public debunce(func: Function,delay: number, immediate: boolean = false){
    let that = this
    return function(){
      if(!that.immediate && immediate){
        that.immediate = true
        func()
      }
      else {
        if(that.timer != null) clearTimeout(Number(that.timer))
        that.timer = setTimeout(() => {
          that.immediate = false
          func()
        },delay)
      }
    }
  }
}

export class Throttle {
  private flag: boolean = true
  private immediate: boolean = false
  public throttle(func: Function, delay: number, immediate: boolean = false){
    let that = this
    return function(){
      if(!that.immediate && immediate){
        func()
        that.immediate = true
      }
      else if(that.flag){
        setTimeout(() => {
          func()
          that.flag = true
          that.immediate = true
        },delay)
        that.flag = false
      }
    }
  }
}

