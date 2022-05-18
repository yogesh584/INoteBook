import React from 'react'

export default function Alert(props) {
  function capitalize (word){
    const lower =  word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
    <div id='Alert' className={` translate-x-[120%] h-14 absolute right-4 top-4 pl-5 flex justify-between items-center bg-${props.alert.color} rounded-md before:absolute before:top-0 before:left-0 before:bg-${props.alert.color.split('-')[0] + '-' + (Number(props.alert.color.split('-')[1]) + 100)} before:w-[5px] before:h-full before:rounded-tl-md before:rounded-bl-md`}>
        <p className='mr-12'><strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}</p>
        <div className={`bg-${props.alert.color.split('-')[0] + '-' + (Number(props.alert.color.split('-')[1]) + 100)} h-full px-5 flex justify-center items-center rounded-tr-md rounded-br-md cursor-pointer`} onClick={props.hideAlert}>
          <span className={`text-xl text-${props.alert.color.split('-')[0] + '-' + (Number(props.alert.color.split('-')[1]) - 200)} font-bold`} >&times;</span>
        </div>
    </div>
  )
}