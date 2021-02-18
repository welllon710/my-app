import React , {useEffect, useMemo, useState} from 'react'
import './index.scss'
export default function Swiper() {
    const [state, setstate] = useState([
        {
            id:1,
            img:'assets/IMG_4966.jpg'
        },
        {
            id:2,
            img:'assets/IMG_4976.jpg'
        },
        {
            id:3,
            img:'assets/IMG_5402.jpg'
        },
        {
            id:4,
            img:'assets/IMG_5411.jpg'
        },
        {
            id:5,
            img:'assets/IMG_5376.jpg'
        },
        {
            id:6,
            img:'assets/IMG_5407.jpg'
        },
        {
            id:7,
            img:'assets/IMG_5407.jpg'
        },
        {
            id:8,
            img:'assets/IMG_5093.jpg'
        },
    ])
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
                    a += 111
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
                return 111
            case 3:
                return 540    
        }
    }
    useEffect(() => {
        const timeOut = setInterval(() => {
            setStyleList(styleList=>{
                const _len = styleList.length
                styleList = [styleList[_len - 1],...styleList]
                styleList.pop()
                return styleList
            })
        }, 2000);
        return () => {
            clearInterval(timeOut)
        }
    })
    useMemo(()=>{
        console.log('memo');

    },[styleList])
    return (
        <div className="my-swiper">
            <ul>
                {state.map((item,index)=>{
                    return (<li key={item.id} style={styleList[index]}>
                        <img src={item.img} />
                    </li>)
                })}
            </ul>
        </div>
    )
}
