//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

//import "hardhat/console.sol";
import "./WakandaToken.sol";

contract Voting {
    uint256 candidatesSize;
    WakandaToken wknd;

    mapping(uint256 => Candidate) candidates;
    mapping(uint256 => CandidateScore) votingBoard;
    mapping(address => Voter) wakandaVote;
    CandidateScore[3] leaderboard;

    event NewChallenger(CandidateScore[3] indexed leaderboard);

    struct Candidate {
        string name;
        uint256 age;
        string cult;
    }

    struct CandidateScore {
        Candidate candidate;
        uint256 score;
    }

    struct Voter {
        Candidate voteFor;
        bool hasVoted;
    }

    constructor(WakandaToken _wknd, Candidate[] memory _allCandidates) {
        wknd = _wknd;
        candidatesSize = _allCandidates.length;
        for (uint256 i = 0; i < candidatesSize; i++) {
            candidates[i].name = _allCandidates[i].name;
            candidates[i].age = _allCandidates[i].age;
            candidates[i].cult = _allCandidates[i].cult;
        }
    }

    function winningCandidates() public returns (CandidateScore[3] memory) {
        for (uint256 i = 0; i < candidatesSize; i++) {
            if (votingBoard[i].score > 0) {
                if (votingBoard[i].score > leaderboard[0].score) {
                    leaderboard[2].score = leaderboard[1].score;
                    leaderboard[2].candidate.name = leaderboard[1]
                        .candidate
                        .name;
                    leaderboard[2].candidate.age = leaderboard[1].candidate.age;
                    leaderboard[2].candidate.cult = leaderboard[1]
                        .candidate
                        .cult;

                    leaderboard[1].score = leaderboard[0].score;
                    leaderboard[1].candidate.name = leaderboard[0]
                        .candidate
                        .name;
                    leaderboard[1].candidate.age = leaderboard[0].candidate.age;
                    leaderboard[1].candidate.cult = leaderboard[0]
                        .candidate
                        .cult;

                    leaderboard[0].score = votingBoard[i].score;
                    leaderboard[0].candidate.name = votingBoard[i]
                        .candidate
                        .name;
                    leaderboard[0].candidate.age = votingBoard[i].candidate.age;
                    leaderboard[0].candidate.cult = votingBoard[i]
                        .candidate
                        .cult;
                } else if (votingBoard[i].score > leaderboard[1].score) {
                    leaderboard[2].score = leaderboard[1].score;
                    leaderboard[2].candidate.name = leaderboard[1]
                        .candidate
                        .name;
                    leaderboard[2].candidate.age = leaderboard[1].candidate.age;
                    leaderboard[2].candidate.cult = leaderboard[1]
                        .candidate
                        .cult;

                    leaderboard[1].score = votingBoard[i].score;
                    leaderboard[1].candidate.name = votingBoard[i]
                        .candidate
                        .name;
                    leaderboard[1].candidate.age = votingBoard[i].candidate.age;
                    leaderboard[1].candidate.cult = votingBoard[i]
                        .candidate
                        .cult;
                } else if (votingBoard[i].score > leaderboard[2].score) {
                    leaderboard[2].score = votingBoard[i].score;
                    leaderboard[2].candidate.name = votingBoard[i]
                        .candidate
                        .name;
                    leaderboard[2].candidate.age = votingBoard[i].candidate.age;
                    leaderboard[2].candidate.cult = votingBoard[i]
                        .candidate
                        .cult;
                }
                emit NewChallenger(leaderboard);
            }
        }
        return leaderboard;
    }

    function vote(
        address _wakanda,
        uint256 _candidateId,
        Candidate memory _candidate,
        uint256 _amountOfVotes
    ) public returns (bool success) {
        uint256 wakandaTokenBalance = wknd.balanceOf(_wakanda);
        require(
            wakandaTokenBalance <= _amountOfVotes && wakandaTokenBalance > 0,
            "Wakanda doesn't have permission to vote!"
        );

        votingBoard[_candidateId].score += _amountOfVotes;
        votingBoard[_candidateId].candidate.name = _candidate.name;
        votingBoard[_candidateId].candidate.age = _candidate.age;
        votingBoard[_candidateId].candidate.cult = _candidate.cult;

        wakandaVote[_wakanda].voteFor = _candidate;
        if (wakandaTokenBalance == _amountOfVotes) {
            wakandaVote[_wakanda].hasVoted = true;
        }
        wknd.updateWakandaAddressState(_wakanda, _amountOfVotes);

        return true;
    }

    function isWakandaVote(address _wakanda)
        public
        view
        returns (bool success)
    {
        return wakandaVote[_wakanda].hasVoted;
    }

    function swap(CandidateScore memory cs1, CandidateScore memory cs2)
        private
        pure
    {
        cs1.score = cs2.score;
        cs1.candidate.name = cs2.candidate.name;
        cs1.candidate.age = cs2.candidate.age;
        cs1.candidate.cult = cs2.candidate.cult;
    }
}
