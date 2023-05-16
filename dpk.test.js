const { 
  deterministicPartitionKey,
  MAX_PARTITION_KEY_LENGTH,
  TRIVIAL_PARTITION_KEY
} = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("return a valid key when given an empty event", () => {
    const event = {};
    const result = deterministicPartitionKey(event);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("generates a deterministic partition key when an event with a partition key is provided", () => {
    const event = { partitionKey: "abc123" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("abc123");
  });

  it("generates a deterministic partition key when an event without a partition key is provided", () => {
    const event = { name: "Peter Gabriel", age: 25 };
    const result = deterministicPartitionKey(event);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("converts the partition key to a JSON string when it is not a string", () => {
    const event = { partitionKey: 123 };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("123");
  });

  it("generates a deterministic partition key when the length exceeds the limit", () => {
    const event = { partitionKey:  "a".repeat(300) };
    const result = deterministicPartitionKey(event);
    expect(typeof result).toBe("string");
    expect(result.length).toBeLessThanOrEqual(MAX_PARTITION_KEY_LENGTH);
    expect(result.length).toBeGreaterThan(0);
  });

  it("generates a deterministic partition key when a nested object is provided", () => {
    const event = { data: { name: "Susana", age: 30 } };
    const result = deterministicPartitionKey(event);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});