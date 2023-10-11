import { useMetaMask } from "~/hooks/useMetaMask";
import styles from "./Display.module.css";
import { ethers } from "ethers";
import { Button, Select, Space, notification } from "antd";
import { useEffect, useState } from "react";
import { getVotes, voteForFruit } from "~/apis/vote";
import { abi as abiMinimalForwarder } from "../../../contract/MinimalForwarder.json";
import { Spin } from "antd";
import { FRUIT_VOTING, MINIMAL_FORWARDER, SCAN_BASE_URL } from "~/constants";

const FRUIT = [
  { value: "apple", label: "Apple" },
  { value: "orange", label: "Orange" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

export const Display = () => {
  const { wallet } = useMetaMask();
  const [fruit, setFruit] = useState(FRUIT[0].value);
  const [votes, setVotes] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const [loadingVote, setLoadingVote] = useState(false);
  const [loadingGetVote, setLoadingGetVote] = useState(false);

  // get vote number on first render
  useEffect(() => {
    handleGetVotes();
  }, []);

  const handleVote = async () => {
    setLoadingVote(true);
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum as any);
    const signer = provider.getSigner();
    // create minimal contract instance for getting nonce
    const minimalForwarder = new ethers.Contract(
      MINIMAL_FORWARDER,
      abiMinimalForwarder,
      provider
    );
    // create data from function signature and its input
    let ABI = ["function voteForFruit(string)"];
    let iface = new ethers.utils.Interface(ABI);
    let data = iface.encodeFunctionData("voteForFruit", [fruit]);
    let userAddress = await signer.getAddress();

    const transactionMeta = {
      from: userAddress,
      to: FRUIT_VOTING,
      value: "0",
      gas: ethers.BigNumber.from("1000000000"),
      nonce: await minimalForwarder.getNonce(userAddress),
      data,
    };
    // encode transaction meta
    let message = ethers.utils.solidityKeccak256(
      ["address", "address", "uint256", "uint256", "uint256", "bytes"],
      [
        transactionMeta.from,
        transactionMeta.to,
        transactionMeta.value,
        transactionMeta.gas,
        transactionMeta.nonce,
        transactionMeta.data,
      ]
    );

    try {
      // arrayify the meta to sign
      const arrayifyMessage = ethers.utils.arrayify(message);
      const signature = await signer.signMessage(arrayifyMessage);

      let result = await voteForFruit(
        transactionMeta,
        userAddress,
        message,
        signature
      );
      openNotification(result);
      setLoadingVote(false);
    } catch (error: any) {
      openNotification({
        success: false,
        message: "User rejected"
      })
      setLoadingVote(false);
    }
  };

  const handleChange = (value: string) => {
    setFruit(value);
  };

  const handleGetVotes = async () => {
    setLoadingGetVote(true);
    let votes = await getVotes(fruit);
    setVotes(votes.voteNumber);
    setLoadingGetVote(false);
  };

  const openNotification = (data: { success: boolean; message: string }) => {
    if (data.success) {
      api.success({
        message: `Transaction completed`,
        description: `${SCAN_BASE_URL}${data.message}`,
      });
    } else {
      api.error({
        message: `Error`,
        description: data.message,
      });
    }
  };

  return (
    <div className={styles.display}>
      {contextHolder}
      {wallet.accounts.length > 0 ? (
        <div
          style={{ width: "310px", marginLeft: "auto", marginRight: "auto" }}
        >
          <Space wrap>
            <Select
              defaultValue={FRUIT[0].value}
              style={{ width: 120 }}
              onChange={handleChange}
              options={FRUIT}
            />
            <Button disabled={loadingVote} onClick={handleVote}>
              {loadingVote ? <Spin /> : "Vote"}
            </Button>
            <Button disabled={loadingGetVote} onClick={handleGetVotes}>
              Get votes: {loadingGetVote ? <Spin /> : votes}
            </Button>
          </Space>
        </div>
      ) : (
        <>
          <div>Please connect your wallet</div>
        </>
      )}
    </div>
  );
};
