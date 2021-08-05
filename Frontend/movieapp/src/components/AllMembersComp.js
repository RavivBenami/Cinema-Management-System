import React from 'react';
import {useSelector} from 'react-redux'
import MemberComp from './MemberComp'

function AllMembersComp(props) {

    let members = useSelector(state=>state.members)

    let obj = members.map((item,key)=>{
        return <MemberComp member={item} key={key}/>
    })

    return (
        <center>
        <div style={{width:"450px" , marginBottom:"10px"}}>
            {obj}
        </div>
        </center>
    );
}

export default AllMembersComp;