// const { Harmony } = require("@harmony-js/core");
// const { Messenger, HttpProvider, WSProvider } = require("@harmony-js/network");
import { ApiHarmonyProvider } from "harmony-ethers-sdk";
import { RequestManager, HTTPTransport, Client } from "@open-rpc/client-js";
// import bls from "@chainsafe/bls";
import encoder from "isomorphic-textencoder";
import bls from "bls-wasm";

// import { getImplementation } from "@chainsafe/bls/getImplementation";

// import blsSignatures from "bls-signatures";
// import { PublicKey } from "@chainsafe/bls";
// import bls from "@chainsafe/bls";

// const blsSignatures = require("bls-signatures")();

// import bls from "@chainsafe/bls/herumi";
// import bls, { init } from "@chainsafe/bls/switchable";

// const {
//   ChainID,
//   ChainType,
//   hexToNumber,
//   numberToHex,
//   fromWei,
//   Units,
//   Unit,
// } = require("@harmony-js/utils");

var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, "");
  var result = fnStr
    .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
    .match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
}

(async () => {
  const harmonyNode = "https://api.s0.b.hmny.io";
  //   const hmy = new Harmony(harmonyNode, {
  //     chainType: ChainType.Harmony,
  //     chainId: ChainID.HmyTestnet,
  //   });

  //   hmy.blockchain
  //     .getBalance({ address: "one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7" })
  //     .then((response: any) => {
  //       console.log(
  //         "balance in ONEs: " + fromWei(hexToNumber(response.result), Units.one)
  //       );
  //     });

  //   hmy.blockchain.getBlockNumber().then((response: any) => {
  //     console.log("current block number: " + hexToNumber(response.result));
  //   });

  //****************************** */
  const provider = new ApiHarmonyProvider(harmonyNode);
  let epoch = await provider.getEpoch();

  const transport = new HTTPTransport(harmonyNode);
  const client = new Client(new RequestManager([transport]));
  let getHeader = async (blockNumber) => {
    return await client.request({
      method: "hmyv2_getHeaderByNumber",
      params: [blockNumber],
    });
  };
  // let blockNumber3 = await provider.getEpochLastBlock(3);
  // let blockNumber2 = await provider.getEpochLastBlock(2);
  // let blockNumber1 = await provider.getEpochLastBlock(100);
  // let blockNumber1 = await provider.getEpochLastBlock(100);

  // console.log(blockNumber1, blockNumber2, blockNumber3);
  // console.log(blockNumber3 - blockNumber2, blockNumber2 - blockNumber1);
  let blockNumber1 = 20;
  let previousBlockNumber = blockNumber1 - 1;
  let block = await provider.getBlock(blockNumber1);
  let previousBlock = await provider.getBlock(previousBlockNumber);
  // let signer = await provider.getSigner(blockNumber1);
  // console.log(signer);

  const signers = await client.request({
    method: "hmyv2_getBlockSignerKeys",
    params: [previousBlockNumber],
  });
  console.log("signers", signers);

  const header = await getHeader(blockNumber1);
  const previousHeader = await getHeader(previousBlockNumber);
  console.log("lastCommitSig", header["lastCommitSig"]);
  console.log("block hash", header["blockHash"]);
  console.log("viewId", previousHeader);
  // console.log(previousBlock["hash"]);
  // console.log("viewId", block["parentHash"]);
  // console.log("header", header["lastCommitSig"]);
  //************************ */
  // bls.init(bls.BLS12_381);

  // let bls = await blsSignatures();

  //************************ */
  // let uint8PubKeys = signers.map((x) => encoder.encode(x));
  // // const privateKey = PrivateKey.fromSeed(Uint8Array.from([1, 2, 3]));
  // console.log(signers[0].length);
  // console.log(uint8PubKeys[0].length);
  // console.log(signers[0]);
  // console.log(uint8PubKeys[0]);
  // // console.log(PublicKey.PUBLIC_KEY_SIZE);

  // const { PrivateKey, PublicKey } = BLS;
  // console.log(PrivateKey, PublicKey);

  //************************ */
  // const bls = await getImplementation("herumi");

  // await bls.init(bls.BLS12_381, bls.MCLBN_COMPILED_TIME_VAR);
  // console.log(bls.BLS12_381);
  // let s = bls.PublicKey.SetHexString(signers[0]);
  // // console.log(bls.ETH_MODE);
  // let a = bls.setETHmode(0);
  // bls.setETHserialiation(false);
  // // bls.setMapToMode(0);
  // // console.log(a);
  // let sig = new bls.Signature();
  // // console.log(bls.deserializeHexStrToSignature(signature));
  // console.log("curveOrder", bls.getCurveOrder());
  // bls
  //   .deserializeHexStrToSignature(signature)
  //   .then((x) => {
  //     console.log(x);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // let a = getParamNames(bls.blsVerify);
  // console.log(a);
  // const sec = new bls.SecretKey();

  // sec.setByCSPRNG();
  // sec.dump("secretKey ");

  // const pub = sec.getPublicKey();
  // pub.dump("publicKey ");

  // const msg = "doremifa";
  // console.log("msg " + msg);
  // const sig = sec.sign(msg);
  // sig.dump("signature ");

  // assert(pub.verify(sig, msg));
  // console.log(bls);
  // bls.SetEthMode(0);
  // bls.setETHmode(2);
  // const toBytes = (string) => {
  //   const buffer = Buffer.from(string, "utf8");
  //   const result = Array(buffer.length);
  //   for (var i = 0; i < buffer.length; i++) {
  //     result[i] = buffer[i];
  //   }
  //   return result;
  // };
  // const a = toBytes(signers[0]);
  // console.log(a.length);
  // await bls.init("herumi");
  // await PublicKey.fromBytes(uint8PubKeys[0]);
  // PublicKey.fromBytes(signers[0]).catch((e) => {
  //   console.log(e);
  // });
  // let uint8PubKeysFlat = uint8PubKeys.flat();
  // console.log(uint8PubKeysFlat);
  // await init("herumi");
  // let a = bls.SecretKey.fromKeygen();
  // let b = bls.PublicKey.fromHex(signers[0]);
  // let y = bls.Signature.fromHex(header["lastCommitSig"]);

  // let x = bls.aggregatePublicKeys(uint8PubKeys);
  // bls.
  // const validators = await client.request({
  //   method: "hmyv2_getAllValidatorInformationByBlockNumber",
  //   params: [1, blockNumber1],
  // });
  // console.log(validators);
  // const sumWithInitial = signers.reduce(
  //   (previousValue: boolean, currentValue: string) =>
  //     previousValue && validators.includes(currentValue),
  //   true
  // );
  // // console.log(sumWithInitial);
  // const blocks = await client.request({
  //   method: "hmyv2_getBlocks",
  //   params: [10, 10, { withSingers: true, fullTx: false, inclStaking: false }],
  // });

  // console.log("blocks", blocks);
})();
