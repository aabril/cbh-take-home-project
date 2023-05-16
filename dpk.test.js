const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("return a valid key when given an empty event", () => {
    const event = {};
    const trivialKey = deterministicPartitionKey(event);
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey.length).toBeGreaterThan(0);
  });

  it("generates a deterministic partition key when an event with a partition key is provided", () => {
    const event = { partitionKey: "abc123" };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("abc123");
  });

  it("generates a deterministic partition key when an event without a partition key is provided", () => {
    const event = { name: "Peter Gabriel", age: 25 };
    const trivialKey = deterministicPartitionKey(event);
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey.length).toBeGreaterThan(0);
  });

  it("converts the partition key to a JSON string when it is not a string", () => {
    const event = { partitionKey: 123 };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("123");
  });

  it("generates a deterministic partition key when the length exceeds the limit", () => {
    const longKey = "a".repeat(300);
    const trivialKey = deterministicPartitionKey(longKey);
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey.length).toBeGreaterThan(0);
  });

  it("generates a deterministic partition key when a nested object is provided", () => {
    const event = { data: { name: "Susana", age: 30 } };
    const trivialKey = deterministicPartitionKey(event);
    expect(typeof trivialKey).toBe("string");
    expect(trivialKey.length).toBeGreaterThan(0);
  });
});