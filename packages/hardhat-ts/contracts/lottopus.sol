//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Lottopus {
  uint256 private tZero;
  uint256 public constant roundLength = 500;
  uint256 public constant lottoPrice = 20;
  uint256 public constant maxLotto = 99;

  struct round {
    uint256 num;
    uint seedBlock;
    mapping(uint256 => mapping(address => uint256)) lottoToBuyerToStake;
    mapping(uint256 => address[]) lottoToBuyers;
    uint256 stakeCount;
    bool hasPaid;
  }

  round[] private rounds;

  mapping(address => mapping(uint256 => mapping(uint256 => mapping(uint256 => uint256)))) private buyerToRoundToNumberToStake;

  constructor() {
    tZero = now;
    currentRound = 0;
  }

  function roundStartTime(int num) public view returns (uint256) {
    return (num * roundLength) + tZero;
  }

  function roundEndTime(int num) public view returns (uint256) {
    return (num * roundLength) + tZero;
  }

  function currentRoundNumber() public view returns (uint256) {
    return (now - tZero) / roundLength;
  }

  function winningNumber(uint256 round) public view returns (uint256) {
    requires(rounds[round].seedBlock != 0);
    uint hash = uint(blockhash(rounds[round].seedBlock));
    requires(hash != 0);
    return hash % (maxLotto+1);
  }

  function buyLotto(string memory number) public payable {
    requires(msg.value == lottoPrice);
    requires(number <= maxLotto);
    round currentRound = rounds[currentRoundNumber()];
    currentRound.lottoToBuyerToStake[number][msg.sender]++;
    currentRound.lottoToBuyers[number].Push(msg.sender);
    currentRound.stakeCount++;
    buyerToRoundToNumberToStake[msg.sender][currentRoundNumber()][number]++;
  }

  function pay() public {
    for (uint i = 0; i < currentRoundNumber(); i++) {
      if (rounds[i].hasPaid) {
        continue;
      }
      address[] buyers = rounds[i].lottoToBuyers[winningNumber(i)];
      uint256 payPerStake = (rounds[i].stakeCount * lottoPrice) / buyers.length;
      for (uint b = 0; b < buyers.length; b++) {
        payable(buyers).send(payPerStake);
      }
      rounds[i].hasPaid = true;
    }
  }

  function seed() public {
    uint offset = 0;
    for (uint i = 0; i < currentRoundNumber(); i++) {
      if (rounds[i].seederBlock != 0) {
        continue;
      }
      rounds[i].seedBlock == block.number+offset;
      offset++;
    }
  }

  function getMyLottoNow() public view returns (mapping(uint256 => uint256) memory) {
    return buyerToRoundToNumberToStake[msg.sender][currentRoundNumber];
  }

  function getMyAllLotto() public view returns (mapping(uint256 => mapping(uint256 => uint256))[] memory) {
    return myLottos[msg.sender];
  }

  function getLottoNow() public view returns (systemLotto[] memory) {
    round currentRound = rounds[currentRoundNumber()];
    return currentRound.lottos;
  }

  function getAllLotto() public view returns (round[] memory) {
    return rounds;
  }
}
