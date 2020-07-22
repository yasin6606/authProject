const initialState = {

};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "hideModalDelBtn":
            return {
                hide: 'close',
            };
        case "logicalDeletingStatus":
            return {
                status: action.status,
            };
        case "successFirstSelfReg":
            return {
                loginId: action.loginId,
            };
        case "someoneLoggedIn":
            return {
                userInfo: true,
            };
        default:
            return false;
    };
};

module.exports = Reducer;