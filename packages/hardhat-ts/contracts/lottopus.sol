//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Lottopus {
  uint256 private tZero;
  uint256 public constant roundLength = 500;
  uint256 public constant lottoPrice = 20;

  struct round {
    uint256 num;
    uint seederBlock;
    systemLotto[] lottos;
  }

  struct systemLotto {
    string lottoNumber;
    uint256 buytime;
    address buyer;
  }

  uint256 private rewardNow;
  uint256 private lottoPrice;

  systemLotto[] private lottoNows;

  string private winnerNumber;

  round[] private rounds;

  mapping(address => mapping(uint256 => systemLotto[]) private myLottoNows;
  mapping(address => systemLotto[]) private myLottos;
  mapping(string => address[]) private lottoNumberOwners;

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

  function getMyLottoNow(address my) public view returns (Lotto[] memory) {
    return myLottoNows[my];
  }

  function getMyAllLotto(address my) public view returns (Lotto[] memory) {
    return myLottos[my];
  }

  function buyLotto(address buyer, string memory number) public {
    round currentRound = round[currentRoundNumber()];
    currentRound.lottos.push(systemLotto(number, now, buyer));
    myLottos[buyer].push(Lotto(number, now));
    myLottoNows[buyer].push(Lotto(number, now));
  }

  function getAllLotto() public view returns (systemLotto[] memory) {
    return lottoNows;
  }

  function closeRound(address closer) public {
    winnerNumber = "123";
  }

  function getWinner(string memory number) private returns (address[] memory) {
    return lottoNumberOwners[number];
  }

  function getRewardNow() public view returns (uint256) {
    return rewardNow;
  }

  function getRewardNumber() private returns (string memory) {
    return "123";
  }
}
