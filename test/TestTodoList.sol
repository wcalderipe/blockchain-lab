pragma solidity >=0.4.25 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TodoList.sol";

contract TestTodoList {

  function testAddTask() public {
    TodoList todoList = new TodoList();

    todoList.add("do some foo");

    uint given = 100;
    uint expected = 100;

    Assert.equal(, expected, "foo");
  }

}
