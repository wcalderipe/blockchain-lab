pragma solidity >=0.4.25 <0.7.0;

contract TodoList {
  struct Task {
    string description;
    bool isDone;
  }

  mapping(address => Task[]) tasks;

  function add(string memory _description) public {
    tasks[msg.sender].push(Task(_description, false));
  }

  function get(uint _index) public view returns(string memory description,
                                                bool isDone) {
    Task[] memory _tasks = tasks[msg.sender];
    description = _tasks[_index].description;
    isDone = _tasks[_index].isDone;
  }

  function toggle(uint _index) public {
    Task[] storage _tasks = tasks[msg.sender];
    Task memory _task = _tasks[_index];
    _task.isDone = !_task.isDone;
    _tasks[_index] = _task;
  }
}
