const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function getHashKey(data){
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function getValidKey(currentKey){
  let validKey = (currentKey) ? currentKey : getHashKey(TRIVIAL_PARTITION_KEY);

  if(typeof currentKey !== "string") {
    validKey = JSON.stringify(currentKey);
  }

  if (currentKey.length > MAX_PARTITION_KEY_LENGTH) {
     validKey = getHashKey(currentKey);
  }
  
  return validKey;
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