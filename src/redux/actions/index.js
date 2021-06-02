export default {
    move: (data) => ({
        type: 'MOVE',
        data
    }),
    open: data => ({
        type: 'OPEN',
        data
    }),
    close: data => ({
        type: 'CLOSE',
        data
    }),
    goDetail: data => ({
        type: 'GO',
        data
    }),
    leaveDetail: data => ({
        type: 'LEAVE',
        data
    }),

    saveUserInfo: data => ({
        type: 'SAVE',
        data
    }),
    delUserInfo: data => ({
        type: 'DEL',
        data
    }),


    savePlayList: data => ({
         type: 'SAVEPT',
         data
    }),
    delPlayList: data => ({
         type: 'DELPT',
         data
    }),
    currentMusic: data => ({
        type: 'SAVECT',
        data
    })
}