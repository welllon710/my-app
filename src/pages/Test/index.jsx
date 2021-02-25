import React,{useState} from 'react'

export default function Test() {
    const [state, setstate] = useState([
        {
            name:'jack',
            age:18
        },
        {
            name:'rose',
            age:25
        }
])
    const edit = ()=>{
   
        setstate(state=>{
           state.map(item=>{
               item.name = 'gg'
               item.age = 55
            })
           
           return JSON.parse(JSON.stringify(state))
        })

       
    }
    return (
        <div>
            {
                state.map(item=>{
                    return (
                        <div>
                            {item.name} - {item.age}
                        </div>
                    )
                })
            }
            <button onClick={edit}>更改</button>
        </div>
    )
}
