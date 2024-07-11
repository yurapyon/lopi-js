export interface Ticker {
  accumulator: number;
  frameTime: number;
}

export namespace Ticker {
  export function reset(ticker: Ticker) {
    ticker.accumulator = 0;
  }

  export function accumulateTime(
    ticker: Ticker,
    time: number,
    onTick: () => void
  ) {
    ticker.accumulator += time;
    while (ticker.accumulator > ticker.frameTime) {
      onTick();
      ticker.accumulator -= ticker.frameTime;
    }
  }
}
