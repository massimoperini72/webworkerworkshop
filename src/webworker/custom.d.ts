declare module "worker-loader!*" {
  /**
   *
   */
  class WebpackWorker extends Worker {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor();
  }

  export default WebpackWorker;
}
