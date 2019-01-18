export class EvtEmitter {

  // Event实例
  private static _instance: EvtEmitter;

  // 被监听的事件
  private observers: Map<any, any[]> = new Map();

  private constructor() { }

  // 得到Event实例（单例）
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  /**
   * 注册监听
   * @param id
   * @param callBack
   */
  public subscribe(key: any, callBack: any) {
    if (!this.observers.get(key)) {
      this.observers.set(key, [callBack]);
    } else {
      this.observers.get(key)!.push(callBack);
    }
  }

  /**
   * 卸载监听（没有callback参数则卸载整个监听）
   * @param key
   * @param callBack
   */
  public unSubscribe(key: any, callBack?: any) {
    // 没有callback参数则卸载整个监听
    if (!callBack) {
      this.observers.delete(key);
    } else {
      const callBacks = this.observers.get(key);
      if (callBacks) {
        const idx = callBacks.indexOf(callBack);
        // tslint:disable-next-line:no-unused-expression
        idx >= 0 && callBacks.splice(idx, 1);
      }
      if (callBacks && callBacks.length === 0) {
        this.observers.delete(key);
      }
    }
  }

  /**
   * 触发监听的事件
   * @param key
   * @param p
   */
  public emit(key: any, ...p: any[]) {
    const callBacks = this.observers.get(key);
    if (callBacks) {
      callBacks.forEach((callback) => {
        callback(...p);
      });
    }
  }
}
