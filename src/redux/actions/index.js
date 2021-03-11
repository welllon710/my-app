export default {
    move: (data) => ({ type: 'MOVE', data }),
    open: data => ({ type: 'OPEN', data }),
    close: data => ({ type: 'CLOSE', data }),
    goDetail: data => ({ type: 'GO', data }),
    leaveDetail: data => ({type:'LEAVE',data}),
}