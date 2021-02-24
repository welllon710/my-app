import React , {useEffect, useMemo, useState} from 'react'
import {useSelector} from 'react-redux';
import './index.scss'
export default function Swiper() {
    const [state, setstate] = useState([
        {
            id:1,
            img:'/assets/0.jpg'
        },
        {
            id:2,
            img:'/assets/1.jpg'
        },
        {
            id:3,
            img:'/assets/2.jpg'
        },
        {
            id:4,
            img:'/assets/3.jpg'
        },
        {
            id:5,
            img:'/assets/4.jpg'
        },
        {
            id:6,
            img:'/assets/5.jpg'
        },
        {
            id:7,
            img:'/assets/6.jpg'
        },
        {
            id:8,
            img:'/assets/7.jpg'
        },
    ])
    const width = useSelector(state =>{
        return state.width
    })
    const [styleList,setStyleList] = useState([])
    let a = 540
    useEffect(()=>{
        console.log('did');
        setStyleList(styleList=>{
            state.map((item,index)=>{
                const i = index*1 + 1
                if(i <= 3){
                    styleList = [...styleList,{
                        transform: `translateX(${test(i) + 'px'})${i==2? '':'scale(0.85)'}`,
                        transition:'0.5s',
                        
                        zIndex:`${i==2? '2':'1'}`,
                    }]
                }else{
                    a += 240
                    styleList = [...styleList,{
                        transform: `translateX(${a + 'px'}) scale(0.85)`,
                        transition:'0.5s',
                    }]
                }
               // styleList = [...styleList,'list'+ i]
            })
            return styleList
        })
        
    },[state])
    const test = num =>{
        switch (num) {
            case 1:
                return 0
            case 2:
                console.log(width * 0.1);
                return 300   // 2倍关系 最高300->600   最低130->260
            case 3:
                return 600
        }
    }
    // useEffect(() => {
    //     const timeOut = setInterval(() => {
    //         setStyleList(styleList=>{
    //             const _len = styleList.length
    //             styleList = [styleList[_len - 1],...styleList]
    //             styleList.pop()
    //             return styleList
    //         })
    //     }, 2000);
    //     return () => {
    //         clearInterval(timeOut)
    //     }
    // })
    const sw = (j)=>{
        let a = j*2*0.85 + 540
        return a + 'px'
    }
    
    return (
        <div className="my-swiper" >
            <ul style={{width:width === 1200?'760px':sw(300)}}>
                {state.map((item,index)=>{
                    return (<li key={item.id} style={styleList[index]}>
                        <img src={item.img} />
                    </li>)
                })}
            </ul>
        </div>
    )
}
