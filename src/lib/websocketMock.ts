import { Token } from "./types";

type PriceUpdateHandler = (payload: { id: string; price: number }) => void;

class PriceFeed {
  private intervalId: NodeJS.Timeout | null = null;
  private handlers = new Set<PriceUpdateHandler>();
  private prices = new Map<string, number>();

  start(initialTokens: Token[]) {
    if (this.intervalId) return;
    initialTokens.forEach((t) => this.prices.set(t.id, t.price));
    this.intervalId = setInterval(() => {
      this.emitRandomUpdates();
    }, 2_000);
  }

  subscribe(handler: PriceUpdateHandler) {
    this.handlers.add(handler);
    return () => {
      this.handlers.delete(handler);
    };
  }

  private emitRandomUpdates() {
    if (this.prices.size === 0) return;
    const ids = Array.from(this.prices.keys());
    const updatesCount = Math.max(1, Math.floor(ids.length * 0.2)); // 20% rows

    for (let i = 0; i < updatesCount; i++) {
      const id = ids[Math.floor(Math.random() * ids.length)];
      const current = this.prices.get(id) ?? 0;
      const delta = current * (Math.random() * 0.04 - 0.02); // ±2%
      const nextPrice = Math.max(0.0000001, current + delta);
      this.prices.set(id, nextPrice);

      for (const handler of this.handlers) {
        handler({ id, price: nextPrice });
      }
    }
  }

  stop() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = null;
  }
}

export const globalPriceFeed = new PriceFeed();
