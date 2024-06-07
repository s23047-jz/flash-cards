import React from 'react';
import '../../styles/alert/voice_control_instruction.scss';

// @ts-ignore
const VoiceControlInstruction = ({onClose}) => {
  return (
      <div className="voice-control-instruction">
          <p>Voice control instructions.</p>
          <p>After clicking "Start Listening", the application starts listening.</p>
          <p>Voice commands to operate the deck:</p>
          <p>Show next flashcard - go to the next flashcard</p>
          <p>Show previous flashcard - go to the previous flashcard</p>
          <p>Rotate flashcard - rotate the flashcard</p>
          <p>Read the text - reading the content of the flashcard</p>
          <p>Stop control - turning off the content of the flashcard</p>
          <p>The user does not have to carefully pronounce these sentences for the actions to be performed,</p>
          <p> the application will match the spoken sentences to the above commands.</p>

    <button className="closeButtonVoiceControlInstruction" onClick={onClose}>Close</button>
      </div>
  );
};

export default VoiceControlInstruction;