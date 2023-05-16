const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function getHashKey(data){
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function getValidKey(currentKey){
  if(!currentKey) return getHashKey(TRIVIAL_PARTITION_KEY);

  let key = currentKey;

  if(typeof currentKey !== "string") {
    key = JSON.stringify(currentKey);
  }

  if (currentKey.length > MAX_PARTITION_KEY_LENGTH) {
     key = getHashKey(currentKey);
  }
  return key;
}

function deterministicPartitionKey(event) {

  if(typeof event === "string"){
    return getValidKey(event);
  }

  if(event && event.partitionKey) {
    return getValidKey(event.partitionKey);
  }
  
  return TRIVIAL_PARTITION_KEY;
};

module.exports = {
  TRIVIAL_PARTITION_KEY,
  MAX_PARTITION_KEY_LENGTH,
  deterministicPartitionKey
}