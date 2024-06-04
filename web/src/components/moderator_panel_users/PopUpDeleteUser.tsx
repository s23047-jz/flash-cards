import React from 'react';
// @ts-ignore
import "../../styles/moderator_panel_users/delete_user_pop_up_box.scss"

// @ts-ignore
const DeleteUserPopUpBox = ({text, onClickAccept, onClickCancel}) => {
    return (
        <div className="popup-background-delete-user">
            <div className="popup-delete-user">
                <p>{text}</p>
                <div className="button-container-delete-user">
                    <button className="confirm-button-delete-user" onClick={onClickAccept}>Accept</button>
                    <button className="cancel-button-delete-user" onClick={onClickCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteUserPopUpBox;