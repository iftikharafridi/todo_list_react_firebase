import React from "react";
import {Link} from "react-router-dom"

function NavMenu(){
    return(
        <>
            <Link to ="/">Home</Link>{' '}
            <Link to ="/All">All Tasks</Link>{' '}
            <Link to ="/InComplete">In-Completed Tasks</Link>{' '}
            <Link to ="/Completed">Completed Tasks</Link>{' '}
            <Link to ="/About">About</Link>{' '}
            <Link to ="/Contact">Contact</Link>{' '}
            <Link to ="/Faq">Faq</Link>{' '}
        </>
    );
}

export default NavMenu;