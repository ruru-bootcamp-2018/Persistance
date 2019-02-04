const diag = require('./diag')

test('test suite running', ()=> {
    expect(true).toBeTruthy();
})

test ('simplest use of diag', ()=> {
    const spy = jest.spyOn(console, 'log').mockImplementationOnce(() => true)
    const testString = "simplest case"
    diag(testString)

    const isValidDate = (date) => (Boolean(+date) && date.getDate())


    const lines = console.log.mock.calls[0][0].split("\n")
    expect(lines[0]).toEqual('')
    expect(lines[1]).toEqual('        -----------')
    expect(lines[2]).toEqual(`        File:   ${__filename.slice(__filename.indexOf("\\"))}`)
    expect(lines[3]).toEqual(`        Line:   10:5`)
    expect(lines[4].slice(0,16)).toEqual("        Time:   ")
    expect(isValidDate(new Date(lines[4].slice(16)))).toBeTruthy()
    expect(lines[5]).toEqual(`        Msg:    ${testString}`)
    expect(lines[6]).toEqual('        -----------')
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