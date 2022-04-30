//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Lottopus {
  uint256 private tZero;
  uint256 public constant roundLength = 500;
  uint256 public constant lottoPrice = 20;
  uint256 public constant maxLotto = 99;

  struct round {
    uint256 num;
    uint256 seedBlock;
    mapping(uint256 => mapping(address => uint256)) lottoToBuyerToStake;
    mapping(uint256 => address[]) lottoToBuyers;
    uint256 stakeCount;
    bool hasPaid;
  }

  round[] private rounds;

  uint256 private currentRound;

  mapping(address => mapping(uint256 => mapping(uint256 => uint256))) private buyerToRoundToNumberToStake;

  constructor() {
    tZero = now;
    currentRound = 0;
  }

  function roundStartTime(uint256 num) public view returns (uint256) {
    return (num * roundLength) + tZero;
  }

  function roundEndTime(uint256 num) public view returns (uint256) {
    return (num * roundLength) + tZero;
  }

  function currentRoundNumber() public view returns (uint256) {
    return (now - tZero) / roundLength;
  }

  function winningNumber(uint256 _round) public view returns (uint256) {
    require(rounds[_round].seedBlock != 0);
    uint256 hash = uint256(blockhash(rounds[_round].seedBlock));
    require(hash != 0);
    return hash % (maxLotto + 1);
  }

  function buyLotto(uint256 number) public payable {
    require(msg.value == lottoPrice);
    require(number <= maxLotto);
    round storage _currentRound = rounds[currentRoundNumber()];
    _currentRound.lottoToBuyerToStake[number][msg.sender]++;
    _currentRound.lottoToBuyers[number].push(msg.sender);
    _currentRound.stakeCount++;
    buyerToRoundToNumberToStake[msg.sender][currentRoundNumber()][number] += 1;
  }

  function pay() public {
    for (uint256 i = 0; i < currentRoundNumber(); i++) {
      if (rounds[i].hasPaid) {
        continue;
      }
      address[] memory buyers = rounds[i].lottoToBuyers[winningNumber(i)];
      uint256 payPerStake = (rounds[i].stakeCount * lottoPrice) / buyers.length;
      for (uint256 b = 0; b < buyers.length; b++) {
        payable(buyers[b]).send(payPerStake);
      }
      rounds[i].hasPaid = true;
    }
  }

  function seed() public {
    uint256 offset = 0;
    for (uint256 i = 0; i < currentRoundNumber(); i++) {
      if (rounds[i].seedBlock != 0) {
        continue;
      }
      rounds[i].seedBlock == block.number + offset;
      offset++;
    }
  }

  function getMyLottoNow() public view returns (mapping(uint256 => uint256) memory) {
    return buyerToRoundToNumberToStake[msg.sender][currentRoundNumber];
  }

  function getAllLotto() public view returns (round[] memory) {
    return rounds;
  }
}
