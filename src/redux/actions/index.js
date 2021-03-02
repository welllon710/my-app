export default {
    move: (data) => ({ type: 'MOVE', data }),
    open: data => ({ type: 'OPEN', data }),
    close:data => ({ type: 'CLOSE', data })
}