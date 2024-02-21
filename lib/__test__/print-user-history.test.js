const user = require('../../models/user')
const {printUserHistory} = require('../print-user-history')
const chalk = require('chalk')

jest.mock('chalk', () => {
    const unity = s => s;
    return {
        blue: unity,
        green: unity,
        red: unity
    };
});
test('print user information', ()=> {
    const user = {
        name: "Hilal",
        email: "hhilalkocak@gmail.com",
        phone: "248768"
    }

    const consoleSpy = jest.spyOn(console, 'log')
    printUserHistory(user)
    expect(consoleSpy).toHaveBeenCalledWith(`User name ${user.name} phone ${user.phone}`)

    consoleSpy.mockRestore()
})


