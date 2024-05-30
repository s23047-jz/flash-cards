import React from 'react';
// @ts-ignore
import "../../styles/moderator_panel_users/delete_user_pop_up_box.scss"

// @ts-ignore
const DeleteUserPopUpBox = ({text, onClickAccept, onClickCancel}) => {
    return (
        <div className="popup-background">
            <div className="popup">
                <p>{text}</p>
                <div className="button-container">
                    <button className="confirm-button" onClick={onClickAccept}>Accept</button>
                    <button className="cancel-button" onClick={onClickCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteUserPopUpBox;