const diag = require('./diag')

test('test suite running', ()=> {
    expect(true).toBeTruthy();
})

test ('simplest use of diag', ()=> {
    const spy = jest.spyOn(console, 'log').mockImplementationOnce(() => true)

    diag("simplest case")

    const lines = console.log.mock.calls[0][0].split("\n")
    expect(lines[0]).toEqual('')

    expect(lines[7]).toEqual('')
    spy.mockClear()
})

test('should not log anything if local is false', ()=> {
    const spy = jest.spyOn(console, 'log')

    diag("should not log b/c local", false)

    expect(console.log.mock.calls).toEqual([])
    spy.mockClear()
})

test('should not log anything if global is false', ()=> {
    const spy = jest.spyOn(console, 'log')

    diag("should not log b/c global", true, false)

    expect(console.log.mock.calls).toEqual([])
    spy.mockClear()
})