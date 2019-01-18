export class EvtEmitter {

  // Event实例
  private static _instance: EvtEmitter;

  // 被监听的事件
  private observers: Map<symbol | string, any[]> = new Map();

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
  public subscribe(id: symbol | string, callBack: any) {
    if (!this.observers.get(id)) {
      this.observers.set(id, [callBack]);
    } else {
      this.observers.get(id)!.push(callBack);
    }
  }

  /**
   * 卸载监听（没有callback参数则卸载整个监听）
   * @param id
   * @param callBack
   */
  public unSubscribe(id: symbol | string, callBack?: any) {
    // 没有callback参数则卸载整个监听
    if (!callBack) {
      this.observers.delete(id);
    } else {
      const callBacks = this.observers.get(id);
      if (callBacks) {
        const idx = callBacks.indexOf(callBack);
        // tslint:disable-next-line:no-unused-expression
        idx >= 0 && callBacks.splice(idx, 1);
      }
    }
  }

  /**
   * 触发监听的事件
   * @param id
   * @param p
   */
  public emit(id: symbol, ...p: any[]) {
    const callBacks = this.observers.get(id);
    if (callBacks) {
      callBacks.forEach((callback) => {
        callback(...p);
      });
    }
  }
}
