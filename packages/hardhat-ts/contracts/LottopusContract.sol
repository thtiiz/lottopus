//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract LottopusContract {
  uint256 private tZero;
  uint256 public constant roundLength = 500;
  uint256 public constant lottoPrice = 20;
  uint256 public constant maxLotto = 99;

  struct round {
    uint256 num;
    uint256 seedBlock;
    mapping(uint256 => mapping(address => uint256)) lottoToBuyerToStake;
    mapping(uint256 => address[]) lottoToBuyers;
    mapping(address => uint256[]) myRoundLottos;
    uint256 stakeCount;
    bool isSkipped;
    bool hasPaid;
  }

  uint256 private lastSeededRound;
  round[] private rounds;

  mapping(address => mapping(uint256 => mapping(uint256 => uint256))) private buyerToRoundToNumberToStake;

  constructor() {
    tZero = block.timestamp;
  }

  function roundStartTime(uint256 num) public view returns (uint256) {
    return (num * roundLength) + tZero;
  }

  function roundEndTime(uint256 num) public view returns (uint256) {
    return (num * roundLength) + tZero;
  }

  function currentRoundNumber() public view returns (uint256) {
    return (block.timestamp - tZero) / roundLength;
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
    _currentRound.myRoundLottos[msg.sender].push(number);
    buyerToRoundToNumberToStake[msg.sender][currentRoundNumber()][number] += 1;
  }

  function pay() public {
    for (uint256 i = 0; i < currentRoundNumber(); i++) {
      if (rounds[i].hasPaid || rounds[i].isSkipped) {
        continue;
      }
      address[] memory buyers = rounds[i].lottoToBuyers[winningNumber(i)];
      uint256 payPerStake = getRoundPool(i) / buyers.length;
      for (uint256 b = 0; b < buyers.length; b++) {
        payable(buyers[b]).transfer(payPerStake);
      }
      rounds[i].hasPaid = true;
    }
  }

  function seed() public {
    require(currentRoundNumber() > 0);
    round storage previousRound = rounds[currentRoundNumber() - 1];
    require(previousRound.seedBlock == 0);
    for (uint256 i = lastSeededRound; i < currentRoundNumber() - 1; i++) {
      rounds[i].isSkipped = true;
      previousRound.stakeCount += rounds[i].stakeCount;
    }
    previousRound.seedBlock = block.number;
    lastSeededRound = previousRound.num;
  }

  function getMyLottoNow() public view returns (uint256[] memory) {
    uint256[] memory ret = new uint256[](maxLotto + 1);
    for (uint256 i = 0; i <= maxLotto; i++) {
      ret[i] = buyerToRoundToNumberToStake[msg.sender][currentRoundNumber()][i];
    }
    return ret;
  }

  function getMyLottoByRound(uint256 r) public view returns (uint256[] memory) {
    return rounds[r].myRoundLottos[msg.sender];
  }

  function getRoundPool(uint256 r) public view returns (uint256) {
    return rounds[r].stakeCount * lottoPrice;
  }
}
