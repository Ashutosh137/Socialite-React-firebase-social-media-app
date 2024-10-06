import React from 'react'
import { Popupitem } from '../../ui/popup';
import Profileviewbox from '../profile/profileviewbox';

function LikePost({ setactive, post }) {
    return (
        <>
            {
                <Popupitem
                    closefunction={() => {
                        setactive("");
                    }}
                >
                    <div className="flex flex-col justify-center align-middle space-y-3">
                        <h2 className="text-center text-xl sm:text-2xl capitalize my-3 ">
                            likes
                        </h2>
                        <div className="m-auto">
                            {post?.likes.map((profile, index) => {
                                return (
                                    <Profileviewbox bio={false} key={index} profileusername={profile} />
                                );
                            })}
                        </div>
                    </div>
                </Popupitem>
            }
        </>
    )
}

export default LikePost