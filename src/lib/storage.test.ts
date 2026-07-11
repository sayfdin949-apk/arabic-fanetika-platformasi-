import { describe, it, expect, beforeEach } from "vitest";
import { LocalStorageAdapter } from "./storage";

describe("LocalStorageAdapter", () => {
  beforeEach(() => localStorage.clear());

  it("returns null for a missing key", async () => {
    const store = new LocalStorageAdapter();
    expect(await store.get("nope")).toBeNull();
  });

  it("round-trips get/set", async () => {
    const store = new LocalStorageAdapter();
    await store.set("k", { a: 1 });
    expect(await store.get("k")).toEqual({ a: 1 });
  });

  it("removes a key with del", async () => {
    const store = new LocalStorageAdapter();
    await store.set("k", 1);
    await store.del("k");
    expect(await store.get("k")).toBeNull();
  });

  it("update() applies the updater against the current value and persists the result", async () => {
    const store = new LocalStorageAdapter();
    await store.set("list", [1, 2]);
    const next = await store.update<number[]>("list", (cur) => [...(cur ?? []), 3]);
    expect(next).toEqual([1, 2, 3]);
    expect(await store.get("list")).toEqual([1, 2, 3]);
  });

  it("update() treats a missing key as null", async () => {
    const store = new LocalStorageAdapter();
    const next = await store.update<number[]>("missing", (cur) => [...(cur ?? []), 1]);
    expect(next).toEqual([1]);
  });
});
