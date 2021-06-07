import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import MessageActionType from '../../utils/MessageActionType';
import { useDispatch, useSelector } from 'react-redux';
import {
    messageSelector,
    messageList,
    readMessage,
    deleteMessage,
    updateMessage,
} from '../../state/reducer/message.reducer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const MessageList = () => {
    const dispatch = useDispatch();

    const msgList = useSelector(messageSelector).messageList;

    const [update, setUpdate] = useState({});

    useEffect(() => {
        dispatch(messageList());

        console.log(msgList);

        console.log(update);
        dispatch(updateMessage(update));
    }, [update]);

    const handleClick = (e) => {
        e.preventDefault();

        // const message = msgList.find((msg) => msg.messageId);

        const message = msgList.find((msg) => msg);
        console.log(message);

        dispatch(readMessage(message.messageId));

        console.log(message.messageId);

        setUpdate(message.messageId);
    };

    return (
        <>
            {msgList.map((msg) => {
                return (
                    <>
                        <div
                            key={msg.messageId}
                            className="border-bottom overflow-hidden"
                        >
                            <div
                                className="mb-0 border-bottom-0"
                                id="heading2-4"
                            >
                                <span className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-6 pt-7 accordion-trigger w-100 border-left-0 border-right-0 focus-reset mt-n2">
                                    {msg.readMessage ? (
                                        <a style={{ color: '#bab9bb' }}>
                                            {
                                                MessageActionType[
                                                    msg.messageActionType
                                                ]
                                            }
                                        </a>
                                    ) : (
                                        <a
                                            className="message-read"
                                            style={{ color: '#000' }}
                                            onClick={handleClick}
                                        >
                                            {
                                                MessageActionType[
                                                    msg.messageActionType
                                                ]
                                            }
                                        </a>
                                    )}
                                    <HighlightOffIcon
                                        className="message-delete-icon"
                                        fontSize="small"
                                        onClick={() => {
                                            dispatch(
                                                deleteMessage(msg.messageId)
                                            );
                                            navigate('/message-box');
                                        }}
                                    />
                                </span>
                            </div>
                        </div>
                    </>
                );
            })}
        </>
    );
};

export default MessageList;
