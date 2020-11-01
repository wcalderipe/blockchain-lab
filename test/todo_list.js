const TodoList = artifacts.require('TodoList')

contract('TodoList', (accounts) => {
  it('adds a new task', async () => {
    const todo = await TodoList.deployed()
    await todo.add('do some foo')
    const task = await todo.get(0)

    assert.equal(task.description, 'do some foo')
    assert.equal(task.isDone, false)
  })

  it('toggles task isDone field', async () => {
    const todo = await TodoList.deployed()
    await todo.add('foo')

    const taskOne = await todo.get(0)

    await todo.toggle(0)

    const taskTwo = await todo.get(0)

    assert.equal(taskOne.isDone, false)
    assert.equal(taskTwo.isDone, true)
  })

  it('stores tasks as an array per account', async () => {
    // NOTE: The state isn't reset in between tests. Calling `.new` in the
    // contract class will for a new deploy, thus the state for account 1 and 2
    // will be fresh in the new address. This allows us to get the task in index
    // zero from account 1 without receiving a value from past tests.
    const todo = await TodoList.new()

    const accountOne = accounts[0]
    const accountTwo = accounts[1]

    await todo.add('I belong to accountOne', { from: accountOne })
    await todo.add('I belong to accountTwo', { from: accountTwo })

    const taskOne = await todo.get(0, { from: accountOne })
    const taskTwo = await todo.get(0, { from: accountTwo })

    assert.equal(taskOne.description, 'I belong to accountOne')
    assert.equal(taskTwo.description, 'I belong to accountTwo')
  })
})
